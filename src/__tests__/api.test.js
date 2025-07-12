import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import {connectDB} from "../config/db.js";

beforeAll(async () => {
  await connectDB();
}, 15000);

afterAll(async () => {
  await mongoose.connection.close(); // Proper cleanup
});
describe("API Route Tests", () => {
  test("GET /api/health should return 200 and message", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "API is healthy");
  },
        10000 // test-level timeout
  );
});
