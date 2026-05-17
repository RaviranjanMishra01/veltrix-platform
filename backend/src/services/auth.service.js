import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    ...data,
    password: hashed,
  });

  return user;
};

export const loginUser = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};