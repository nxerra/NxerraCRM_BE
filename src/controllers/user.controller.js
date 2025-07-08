import * as UserService from "../services/user.service.js";

// Create/Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you set req.user via auth middleware
    const result = await UserService.updateProfile(userId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Profile update failed" });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await UserService.getProfile(userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to fetch profile" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await UserService.deleteUser(userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "User deletion failed" });
  }
};
