const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.use('/', authRouter);
app.use('/todos', todosRouter);

module.exports = app;
