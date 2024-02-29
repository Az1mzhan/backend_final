import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
};
