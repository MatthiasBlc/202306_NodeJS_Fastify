import { db } from "../database.js";

export const listPosts = (req, res) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.view("templates/index.ejs", {
    posts,
  });
};

export const showPost = (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  return post;
};
