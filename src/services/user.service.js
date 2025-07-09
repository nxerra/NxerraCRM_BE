import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Create or update user profile
// export const updateProfile = async (userId, profileData) => {
//   const allowedFields = [
//     "name", "phone", "address", "password", "designation", "department", "profilePicture"
//   ];

//   const update = {};
//   for (const key of allowedFields) {
//     if (profileData[key] !== undefined) {
//       update[key] = profileData[key];
//     }
//   }

//   const user = await User.findByIdAndUpdate(userId, update, { new: true });
//   if (!user) throw new Error("User not found");

//   return {
//     id: user._id,
//     email: user.email,
//     password: user.password,
//     name: user.name,
//     phone: user.phone,
//     address: user.address,
//     designation: user.designation,
//     department: user.department,
//     profilePicture: user.profilePicture,
//     role: user.role,
//     canAccess: user.canAccess,
//   };
// };

export const updateProfile = async (userId, profileData) => {
  const allowedFields = [
    "name", "phone", "address", "password", "designation", "department", "profilePicture"
  ];

  const update = {};
  for (const key of allowedFields) {
    if (profileData[key] !== undefined) {
      update[key] = profileData[key];
    }
  }

  // Manually hash password if it's present
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 12);
  }

  const user = await User.findByIdAndUpdate(userId, update, { new: true });
  if (!user) throw new Error("User not found");

  return {
    id: user._id,
    email: user.email,
    password: user.password,
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
