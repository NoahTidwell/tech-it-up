const { User } = require('../models');

const userData = [{
        username: 'noah',
        password: 'test'

    },
    {
        username: 'eric',
        password: 'test'
    },
    {
        username: 'vinay',
        password: 'test'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;