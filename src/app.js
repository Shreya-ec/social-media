const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');

const app = express();

// --> used for data in raw format
app.use(express.json());

// we have data in form-data, using another middleware
const upload = multer({storage: multer.memoryStorage()})

// upload.single('<key-name>')
app.post('/create-post', upload.single('image'), async (req, res)=> {
    console.log(req.body) 
    console.log(req.file) // --> actual file data in buffer: <Buffer ... more bytes>

    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })
    res.status(201).json({
        message: 'post created successfully',
        post
    })
})

app.get('/get-posts', async (req, res)=> {
    const posts = await postModel.find()
    res.status(200).json({
        message: 'posts fetched successfully',
        posts
    })
})


module.exports = app;