const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');

const app = express();
app.use(cors());  // middleware to allow cross-origin requests from frontend, PLACE IT FIRST BEFORE OTHER ROUTES, OTHERWISE IT WON'T WORK
app.use(express.json());  // --> used for data in raw format

const upload = multer({storage: multer.memoryStorage()}) // we have data in form-data, using another middleware

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