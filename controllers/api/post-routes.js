const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET All Post
router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at'
    ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // GET Single Post
  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
      Post.create({
          title: req.body.title,
          post_url: req.body.post_url,
          user_id: req.body.user_id
      })
      .then(dbData => res.json(dbData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });

  router.put('/:id', (req, res) => {
    Post.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;