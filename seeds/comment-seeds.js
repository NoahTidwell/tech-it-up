const { Comment } = require('../models');

const commentData = [{
        comment_text: "test",
        user_id: 1,
    },
    {
        comment_text: "test",
        user_id: 2,
    },
    {
        comment_text: "test",
        user_id: 3,
    }
];

const seedComments = () => Comment.bulkCreate(commentData);