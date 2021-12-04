const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User Model and run .findAll() method
    User.findAll()
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
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
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {});

module.exports = router;