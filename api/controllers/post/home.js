module.exports = async function (req, res) {
  const posts = await Post.find();

  res.view("pages/home", { posts });
};
