const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const players = require('./routes/player')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connecting the database
const db = require('./config/keys').mongoURI;
mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log('connected to the database'))
      .catch(err => console.log(err));

// server setup
app.get('/', (req, res) => res.send('hello word'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is up on ${port}`));

// routes 

app.use('/api/players', players);
