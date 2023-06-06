import { fastify } from "fastify";
import { fastifyView } from "@fastify/view";
import ejs from "ejs";

const app = fastify();

app.register(fastifyView, {
  engine: {
    ejs,
  },
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
