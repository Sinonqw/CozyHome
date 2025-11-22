import bcrypt from "bcryptjs";
import User from "@/models/User"; // Используем алиас, если настроен, иначе скорректируйте путь
import connectDB from "./mongoose"; // Предполагаем, что connectDB находится рядом

// --- Настройки для создания пользователя ---
// В реальном проекте эти данные должны быть в .env
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "12345678"; 
const ADMIN_NAME = "Главный Администратор";
const ADMIN_ROLE = "Admin";
// ------------------------------------------

/**
 * Проверяет, существует ли администратор, и создает его, если он отсутствует.
 * Выполняется только один раз при старте сервера.
 */
export async function seedAdminIfMissing() {
  await connectDB();
  
  try {
    const existingUser = await User.findOne({ email: ADMIN_EMAIL }).lean();

    if (existingUser) {
      console.log(`[SEEDING] ⚠️ Пользователь ${ADMIN_EMAIL} уже существует. Пропускаем.`);
      return true; // Возвращаем true, чтобы подтвердить, что сид не нужен
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);
    
    // Создание нового пользователя
    const newAdmin = new User({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: ADMIN_NAME,
      role: ADMIN_ROLE,
    });

    await newAdmin.save();
    console.log(`[SEEDING] ✨ УСПЕХ: Admin создан: ${ADMIN_EMAIL}. Пароль: ${ADMIN_PASSWORD}`);
    return true;

  } catch (error) {
    console.error("[SEEDING] ❌ Ошибка при создании пользователя Admin:", error.message);
    return false;
  }
}