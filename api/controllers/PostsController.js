const NotFoundError = { error: 404, message: "Not found" };

module.exports = {
  posts: async function (req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      return res.serverError(err.toString());
    }
  },

  create: async function (req, res) {
    const { title, body } = req.body;

    try {
      const newPost = await Post.create({ title, body }).fetch();
      res.send(newPost);
    } catch (err) {
      return res.serverError(err.toString());
    }
  },

  findById: async function (req, res) {
    const postId = req.param("postId");

    try {
      const foundPost = await Post.findOne({ id: postId });
      if (foundPost) {
        res.send(foundPost);
      } else {
        res.send(NotFoundError);
      }
    } catch (err) {
      return res.serverError(err.toString());
    }
  },

  update: async function (req, res) {
    const postId = req.param("postId");
    const { title, body } = req.body;

    try {
      const updatedPost = await Post.updateOne({ id: postId }).set({
        title,
        body,
      });

      if (updatedPost) {
        res.send(`Updated post with id: ${updatedPost.id}`);
      } else {
        res.send(NotFoundError);
      }
    } catch (err) {
      res.serverError(err.toString());
    }
  },

  delete: async function (req, res) {
    const postId = req.param("postId");

    try {
      const deletedPost = await Post.destroyOne({ id: postId });

      if (deletedPost) {
        res.send(`Deleted post with id: ${deletedPost.id}`);
      } else {
        res.send(NotFoundError);
      }
    } catch (err) {
      res.serverError(err.toString());
    }
  },
};
