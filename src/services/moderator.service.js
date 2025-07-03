import { User } from "../models/user.model.js";

export const modifyModeratorAccessService = async (moderatorId, canAccess) => {
  // Validate canAccess array
  if (!Array.isArray(canAccess) || canAccess.length === 0) {
    throw new Error("Invalid canAccess array");
  }

  // Find the moderator by ID
  const moderator = await User.findById(moderatorId);

  if (!moderator || moderator.role !== "moderator") {
    throw new Error("Moderator not found or user is not a moderator");
  }

  // Update the canAccess array
  moderator.canAccess = canAccess;
  await moderator.save();

  return moderator; // Return the updated moderator
};

export const getAllMod = async () => {
  const allMod = await User.find({ role: "moderator" });
  return allMod;
};
