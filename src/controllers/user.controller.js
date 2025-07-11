import * as UserService from "../services/user.service.js";

// Create/Update profile
export const updateProfile = async (req, res) => {
  try {
      console.log("BODY RECEIVED:", req.body); // ← Add this for debugging
    const userId = req.user.id; // assuming you set req.user via auth middleware
    const result = await UserService.updateProfile(userId, req.body);
    res.json(result);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: err.message || "Profile update failed" });
  }
};

// aws implementation 
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const profileData = req.body;

//     if (req.file && req.file.location) {
//       profileData.profilePicture = req.file.location; // AWS S3 public URL
//     }

//     const updatedUser = await UserService.updateProfile(userId, profileData);
//     res.json(updatedUser);
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: err.message || "Profile update failed" });
//   }
// };


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
// export const deleteUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const result = await UserService.deleteUser(userId);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ error: err.message || "User deletion failed" });
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email: confirmationEmail } = req.body;

    const user = await UserService.getProfile(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email !== confirmationEmail) {
      return res.status(400).json({ error: "Email does not match registered email" });
    }

    const result = await UserService.deleteUser(userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "User deletion failed" });
  }
};

