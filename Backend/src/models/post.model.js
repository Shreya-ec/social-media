const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
})

// collection ka naam -> post
// visible under the db name 'project-1' here
const postModel = mongoose.model('post', postSchema)

module.exports = postModel