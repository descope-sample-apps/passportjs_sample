const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

// pass the session to the connect sqlite3 module
// allowing it to inherit from session.Store
var SQLiteStore = require('connect-sqlite3')(session);

const app = express();

const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

app.use('/', authRouter);
app.use('/todos', todosRouter);

module.exports = app;
