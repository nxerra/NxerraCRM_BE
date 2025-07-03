import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";
  try {
    if (uri == "") {
      console.log(`MongoDB URI not provided`);
      return;
    }
    await mongoose.connect(uri).then((res) => {
      console.log("MongoDB connected successfully:", res.connection.host);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
