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
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    ssl: {
      rejectUnauthorized: false, // Disable certificate verification (for development only)
    },
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Function to check database connection
const checkDbConnection = async () => {
  try {
    await db.raw('SELECT 1'); // Executes a simple query to check the connection
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

// Check DB connection on app startup
checkDbConnection();

const createTablesIfNotExist = async (db) => {
  try {
    // db.schema
    //   .dropTableIfExists('login')
    //   .then(() => console.log('Table "login" has been removed.'))
    //   .catch((err) => console.error('Error removing table:', err));
    // Check and create login table if it doesn't exist
    const hasLoginTable = await db.schema.hasTable('login');
    if (!hasLoginTable) {
      await db.schema.createTable('login', (table) => {
        table.string('email').primary();
        table.text('hash').notNullable();
      });
      console.log('Created login table');
    }

    // Check and create users table if it doesn't exist
    // db.schema
    //   .dropTableIfExists('users')
    //   .then(() => console.log('Table "users" has been removed.'))
    //   .catch((err) => console.error('Error removing table:', err));

    const hasUsersTable = await db.schema.hasTable('users');
    if (!hasUsersTable) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.integer('entries').defaultTo(0).notNullable();
        table.timestamp('joined').defaultTo(db.fn.now());
      });
      console.log('Created users table');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

createTablesIfNotExist(db);

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
