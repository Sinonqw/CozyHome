import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { checkAdminAuthorization } from "@/lib/auth";

export async function GET() {
  const authResponse = await checkAdminAuthorization();

  if (authResponse) {
    return authResponse;
  }

  try {
    await connectDB();
    const usersWithOrderCount = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "userOrders",
        },
      },
      {
        $addFields: {
          totalOrders: { $size: "$userOrders" },
        },
      },
      {
        $project: {
          password: 0,
          userOrders: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    // Aggregation возвращает объекты, которые теперь содержат поле totalOrders
    return NextResponse.json(usersWithOrderCount, { status: 200 });
  } catch (e) {
    console.error("Ошибка при получении списка пользователей:", e);
    return NextResponse.json(
      { error: "Не удалось загрузить список пользователей" },
      { status: 500 }
    );
  }
}
