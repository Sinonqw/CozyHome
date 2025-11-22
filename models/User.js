import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

// Запобігання помилці перезапису моделі (Mongoose Singleton)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
