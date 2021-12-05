const { Post } = require('../models');

const postData = [{
        title: 'Code Academy is Awesome!',
        post_url: 'https://www.codeacademy.com',
        post_id: 1

    },
    {
        title: 'Does anybody know Rust Programming Language?',
        post_url: 'https://www.rust-lang.org',
        post_id: 2
    },
    {
        title: 'Node is Fun!',
        post_url: 'https://www.nodejs.org',
        post_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;