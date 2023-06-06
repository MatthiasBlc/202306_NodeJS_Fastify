import { fastify } from "fastify";
import { fastifyView } from "@fastify/view";
import ejs from "ejs";
import { fastifyStatic } from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

app.get("/", (req, res) => {
  const posts = [
    {
      title: "new title",
      content: "new content",
    },
    {
      title: "new title 2",
      content: "new content 2",
    },
  ];

  res.view("templates/index.ejs", {
    posts,
  });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
