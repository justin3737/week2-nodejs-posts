const handleSuccess = require('../services/handleSuccess');
const handleError = require('../services/handleError');

const Post = require('../model/posts');

const posts = {
  async getPosts({req, res}) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createPosts({body, req, res}) {
    try {
      const data = JSON.parse(body);
      if (data.content) {
        const newPost = await Post.create({
          name: data.name,
          content: data.content,
          tags: data.tags,
          type: data.type
        })
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err){
      handleError(res, err);
    }
  }
}

module.exports = posts;