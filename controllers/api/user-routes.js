const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User Model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
          },
          // include the Comment model here:
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          }
        ]
      })
    .then(dbData => {
        if(!dbData) {
            res.status(404).json({ message: 'No user found with this ID'});
            return;
        }
        res.json(dbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // Expects {username: Lernantino, password: password}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbData => {
      req.session.save(() => {
        req.session.user_id = dbData.id;
        req.session.username = dbData.username;
        req.session.loggedIn = true;
    
        res.json(dbData);
      });
    })
    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }

    const validPassword = dbData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.loggedIn = true;

      res.json({ user: dbData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});
  

// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if(!dbData) {
            res.status(404).json({ message: 'No user exist with this ID'});
            return;
        }
        res.json(dbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbData => {
        if(!dbData) {
            res.status(404).json({ message: 'No user exist with this ID'});
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