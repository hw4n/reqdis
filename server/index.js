require('dotenv').config();

const express = require('express');
const Message = require('./models/Message');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/msg', (req, res) => {
    Message.find().then((messages) => {
        res.status(200).send(messages);
    });
});

app.post('/msg', (req, res) => {
    if (!req.body.message || !req.body.author) {
        res.status(400).send('Missing message or author');
        return;
    }
    
    Message.create({
        message: req.body.message,
        author: req.body.author
    }).then(() => {
        res.status(200).send('Message created');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
