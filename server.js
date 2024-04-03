const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('success connection');
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

/**
 * / --> res = this is working
 * /signin --> POST res = success/fail
 * /register --> POST res = newUser
 * /profile/:userId --> GET res = user
 * /image --> PUT res = updatedUser
 */
