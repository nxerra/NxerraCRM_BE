import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { sendResetEmail } from "../utils/password.email.js";

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


// 1. Request password reset
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 1000 * 60 * 15; // 15 mins expiry

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();

  // Send email
  await sendResetEmail(user.email, token);

  return { message: "Password reset email sent" };
};

// 2. Reset password
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired reset token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: "Password has been reset successfully" };
};
