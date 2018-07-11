const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const passport = require('passport');
require('./passport');

const user = require('./routes/user.routes');
const auth = require('./routes/auth.routes');

const bodyParser = require('body-parser');

const server = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(passport.initialize());

server.use('/auth', auth);
server.use('/user', passport.authenticate('jwt', { session: false }), user);

server.listen(3000, () => {
    console.log('server started - 3000');
});