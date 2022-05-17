const HttpController = require('../services/http')
const PostsController = require('../controllers/posts')

const routes = async (req, res) => {
  const { url, method } = req;
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  })
  if (url === '/posts' && method === 'GET') {
    PostsController.getPosts({req, res});
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', () => PostsController.createPosts({body, req, res}))
  } else if (method === 'OPTIONS') {
    HttpController.cors(req, res)
  } else {
    HttpController.notFound(req, res)
  }
}

module.exports = routes;