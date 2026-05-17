import { registerUser , loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    console.log("User Registered:", user);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body); 
    console.log("User Logged In:", user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  } 
};

export const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPassword(req.body.email);
    console.log("Forgot Password Result:", result);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};
