import { fastify } from "fastify";
import { fastifyView } from "@fastify/view";
import ejs from "ejs";
import { fastifyStatic } from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { listPosts, showPost } from "./actions/posts.js";

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

app.register(fastifyStatic, {
  root: join(rootDir, "public"),
});

app.get("/", listPosts);
app.get("/article/:id", showPost);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
