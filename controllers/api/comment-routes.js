const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
              model: Post,
              attributes: ['id', 'title', 'post_url']
          }
        ]
      })
        .then(dbData => res.json(dbData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
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