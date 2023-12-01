const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// gets all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
//grabs specific post for editing
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({ where: { id: req.params.id } });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

module.exports = router;
