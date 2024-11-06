import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/register", createUser);
}