import * as AuthService from "../services/auth.service.js";

// ------------- For admin registration ---------------
// ....................................................
export const registerAdmin = async (req, res) => {
  try {
    const userData = { ...req.body, role: "admin" };
    const result = await AuthService.registerUser(userData);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Something went wrong" });
  }
};

// ------------- For user registration ---------------
// ....................................................
export const registerModerator = async (req, res) => {
  try {
    const userData = { ...req.body, role: "moderator" };

    if (!userData.canAccess || userData.canAccess.length === 0) {
      return res
        .status(400)
        .json({ error: "Moderator must have canAccess defined" });
    }

    if (userData.canAccess.includes("all")) {
      throw new Error("Moderators cannot have access to 'all' modules.");
    }

    const result = await AuthService.registerUser(userData);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Something went wrong" });
  }
};

// ------------- For both login ---------------
// ....................................................
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await AuthService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Something went wrong" });
  }
};

// ------------- Request reset link ---------------
// ....................................................
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await AuthService.requestPasswordReset(email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Failed to send reset email" });
  }
};

// ------------- Perform reset through email ---------------
// ....................................................
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await AuthService.resetPassword(token, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "Password reset failed" });
  }
};
