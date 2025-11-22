import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/mongoose";

export async function GET() {
  try {
    // 1. Встановлення з'єднання (Mongoose автоматично керує кешуванням)
    await connectDB();

    // 2. Використання Mongoose для запиту
    const products = await Product.find({});

    // 3. Повернення відповіді
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
    return NextResponse.json(
      { error: "Виникла помилка при отриманні продуктів" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, priceUSD, imageUrl, count } = body;

    if (!name || !description || !priceUSD) {
      return NextResponse.json(
        {
          error:
            "Отсутствуют обязательные поля: name, description или priceUSD",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const newProduct = await Product.create({
      name,
      description,
      priceUSD,
      imageUrl,
      count,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Помилка при створенні продукту:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Виникла помилка на сервері при створенні продукту" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { error: "ID продукта обязателен для удаления." },
        { status: 400 }
      );
    }
    await connectDB();

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Продукт с указанным ID не найден." },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse(
      { error: "Виникла помилка на сервері при видаленнi продукту" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();

    const { id, name, description, priceUSD, imageUrl, count, isDraft } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID продукта обязателен для редактирования." },
        { status: 400 }
      );
    }
    await connectDB();
    const updates = { name, description, priceUSD, imageUrl, count, isDraft };

    const updatedProducts = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidates: true }
    );

    if (!updatedProducts) {
      return NextResponse.json(
        { error: "Продукт с указанным ID не найден." },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProducts, { status: 200 });
  } catch (e) {
    console.error(e);
    if (e.name === "ValidationError") {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Виникла ошибка на сервере при редактировании продукта" },
      { status: 500 }
    );
  }
}
