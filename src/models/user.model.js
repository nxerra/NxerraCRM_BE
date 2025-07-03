import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "moderator"],
      required: true,
    },
    canAccess: [
      {
        type: String,
        enum: [
          "dashboard",
          "clients",
          "leads",
          "invoice",
          "appointment",
          "tasks",
          "report",
          "settings",
          "all",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before save and set default access for admin
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  if (
    user.role === "admin" &&
    (!user.canAccess || user.canAccess.length === 0)
  ) {
    user.canAccess = ["all"];
  }

  next();
});

// Compare passwords
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model("User", UserSchema);
