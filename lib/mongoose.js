import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Будь ласка, визначте змінну оточення MONGODB_URI у файлі .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    // 1. Якщо з'єднання вже кешоване, повертаємо його
    return cached.conn;
  }

  if (!cached.promise) {
    // 2. Якщо обіцянка підключення не існує, створюємо її
    const opts = {
      bufferCommands: false, // Запобігає буферизації команд, якщо немає з'єднання
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // 3. Чекаємо виконання обіцянки
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
