import { User } from "../models/user.model.js";

// Create or update user profile
export const updateProfile = async (userId, profileData) => {
  const allowedFields = [
    "name", "phone", "address", "designation", "department", "profilePicture"
  ];

  const update = {};
  for (const key of allowedFields) {
    if (profileData[key] !== undefined) {
      update[key] = profileData[key];
    }
  }

  const user = await User.findByIdAndUpdate(userId, update, { new: true });
  if (!user) throw new Error("User not found");

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
    designation: user.designation,
    department: user.department,
    profilePicture: user.profilePicture,
    role: user.role,
    canAccess: user.canAccess,
  };
};

// Get user profile
export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

// Delete user
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found or already deleted");
  return { message: "User account deleted successfully" };
};
