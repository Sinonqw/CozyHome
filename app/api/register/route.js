import { NextResponse } from "next/server";
import User from "../../../models/User";
import connectDB from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Будь ласка, заповніть усі поля." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });

    return NextResponse.json(
      {
        message: "Користувача успішно створено",
        user: { id: newUser._id, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Помилка реєстрації:", e);
    return NextResponse.json(
      { error: "Не вдалося виконати реєстрацію" },
      { status: 500 }
    );a 
  }
}
