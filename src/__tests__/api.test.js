import request from "supertest";
import app from "../../app";
import connectDB from "../config/db";

beforeAll(async () => {
  await connectDB(); // 🟢 Wait for DB to connect
});
describe("API Route Tests", () => {
  test("GET /api/health should return 200 and message", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "API is healthy");
  });
});
