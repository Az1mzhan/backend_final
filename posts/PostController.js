import Post from "../models/Post.js";

class PostController {
  createPost = async (req, res) => {
    try {
      const { author, title, body } = req.body;

      const isCreated = await Post.findOne({ author, title });

      if (isCreated) return res.status(400).send("The post already exists.");

      const post = new Post({ author: author, title: title, body: body });
      await post.save();

      res.status(200).send("The post has been created successfully.");
    } catch (err) {
      console.error(err);

      res.status(400).send({ err });
    }
  };

  async getPosts(req, res) {
    try {
      const posts = await Post.find({});

      res.render("pages/posts", { posts: posts });
    } catch (err) {
      console.error(err);

      res.status(500).send("The post has been created successfully.");
    }
  }

  getPost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).send("Post not found.");

      res.render("pages/post", { post: post });
    } catch (err) {
      console.error(err);

      res.status(400).send(err);
    }
  };

  updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;

      const updateObject = {};
      if (title) updateObject.title = title;
      if (body) updateObject.body = body;

      if (Object.keys(updateObject).length > 0)
        await Post.findByIdAndUpdate(id, updateObject);

      res.status(200).send("The post has been updated successfully.");
    } catch (err) {
      console.error(err);

      res.status(400).send(err);
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;

      await Post.findByIdAndDelete(id);

      res.status(200).send("The post has been deleted successfully.");
    } catch (err) {
      console.error(err);

      res.status(400).send(err);
    }
  };
}

export default new PostController();
