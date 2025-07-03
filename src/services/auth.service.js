import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";

export const registerUser = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error("User already exists");

  // Admins should automatically have 'all' access
  if (userData.role === "admin") {
    userData.canAccess = ["all"];
  }

  const user = new User(userData);
  await user.save();

  const token = signToken({ id: user._id, email: user.email });
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      canAccess: user.canAccess,
    },
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user._id, email: user.email });
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      canAccess: user.canAccess,
    },
  };
};
