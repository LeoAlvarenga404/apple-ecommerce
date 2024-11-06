import fastify from "fastify";
import { authRoutes } from "./routes/authRoutes"; // Certifique-se de que o caminho está correto

import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = fastify();
const port = 3000;

app.register(authRoutes);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port }).then(() => {
  console.log(`Servidor rodando na porta ${port}`);
});
