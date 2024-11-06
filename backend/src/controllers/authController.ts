import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
});

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = userSchema.parse(req.body);

  if (!name || !email || !password) {
    return reply.status(400).send({ error: "Invalid data" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return reply.status(400).send({ error: "Email already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword,
    },
  });

  const { password: _, ...user } = newUser;

  return reply.send(user);
}
