require('dotenv').config();

const express = require('express');
const Message = require('./models/Message');
const cors = require('cors');
const screener =  require('./helper/screener');

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
        message: screener.censorMessage(req.body.message),
        author: screener.censorMessage(req.body.author)
    }).then(() => {
        res.status(200).send('Message created');
    });
});

app.get('/free-flag', (req, res) => {
    if (!req.query.reason) {
        res.status(400).send('Missing parameter - reason');
        return;
    } else {
        res.status(200).send({
            flag: "flag{reasonable_free_flag_here!@}",
            reason: req.query.reason
        });
    }
});

app.listen(4343, () => {
    console.log('Server is running on port 4343');
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
