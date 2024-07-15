require('dotenv').config();

const express = require('express');
const Message = require('./models/Message');
const cors = require('cors');
const screener =  require('./helper/screener');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.get('/rsp', (req, res) => {
    res.status(400).send('send a POST request to start the game!');
});

app.post('/rsp', (req, res) => {
    if (!req.body.choice) {
        res.status(400).send({ msg: 'Missing choice - rock or paper or scissors' });
        return;
    }

    const choices = ['rock', 'paper', 'scissors'];
    const choice = req.body.choice.toLowerCase();
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    if (choices.indexOf(choice) === -1) {
        res.status(400).send({ msg: 'Invalid choice - must be rock, paper or scissors' });
        return;
    }

    if (choice === botChoice) {
        res.status(200).send({ msg: `It's a tie! You chose ${choice} and bot chose ${botChoice}` });
        return;
    }

    if (choice === 'rock' && botChoice === 'scissors') {
        res.status(200).send({
            message: `You win! You chose ${choice} and bot chose ${botChoice}`,
            flag: "flag{ez_win_@_rock_paper_scissors}"
        });
        return;
    }

    if (choice === 'paper' && botChoice === 'rock') {
        res.status(200).send({
            message: `You win! You chose ${choice} and bot chose ${botChoice}`,
            flag: "flag{ez_win_@_rock_paper_scissors}"
        });
        return;
    }

    if (choice === 'scissors' && botChoice === 'paper') {
        res.status(200).send({
            message: `You win! You chose ${choice} and bot chose ${botChoice}`,
            flag: "flag{ez_win_@_rock_paper_scissors}"
        });
        return;
    }

    res.status(200).send({ msg: `You lose! You chose ${choice} and bot chose ${botChoice}` });
});

app.listen(4343, () => {
    console.log('Server is running on port 4343');
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
