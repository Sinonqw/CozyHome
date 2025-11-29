import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import { checkAdminAuthorization, checkAuthentication } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const authResponse = await checkAdminAuthorization();

  if (authResponse) {
    return authResponse;
  }

  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (e) {
    console.error("Ошибка при получении заказов:", e);
    return NextResponse.json(
      { error: "Не удалось загрузить список заказов" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const authResponse = await checkAuthentication();
  if (authResponse) {
    return authResponse;
  }

  const body = await request.json();
  const session = await getServerSession(authOptions);

  if (body.userId !== session?.user.id) {
    return NextResponse.json(
      {
        error:
          "Недостаточно прав. Вы можете создать заказ только от своего имени.",
      },
      { status: 403 }
    );
  }

  try {
    await connectDB();

    const newOrder = new Order({
      userId: body.userId,
      clientName: body.clientName,
      products: body.products,
      totalAmount: body.totalAmount,
      status: "pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Заказ успешно создан", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    return NextResponse.json(
      { error: "Не удалось создать заказ" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const authResponse = await checkAdminAuthorization();
  if (authResponse) {
    return authResponse;
  }
  try {
    const body = await request.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Не хватает ID или нового статуса." },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "processing", "completed", "canceled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Недопустимый статус: ${status}` },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Заказ не найден." }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении заказа:", error);
    return NextResponse.json(
      { error: "Произошла ошибка сервера при обновлении заказа" },
      { status: 500 }
    );
  }
}
