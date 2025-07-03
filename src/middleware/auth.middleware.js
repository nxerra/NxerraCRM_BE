import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Middleware to authenticate token and attach user to request
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.sendStatus(403);

    req.user = user; // Attach full user
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

// Middleware for module-based authorization
export const authorizeModuleAccess = (moduleName) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) return res.sendStatus(401);

    if (user.role === "admin") return next();

    if (user.role === "moderator" && user.canAccess?.includes(moduleName)) {
      return next();
    }

    return res
      .status(403)
      .json({ error: "Access denied: Insufficient permission" });
  };
};

// Check if the user is admin or not
export const authorizeAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);

  if (user.role === "admin") {
    return next();
  }

  return res.status(403).json({ error: "Access denied: Admins only" });
};
