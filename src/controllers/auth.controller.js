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
