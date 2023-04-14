var express = require('express');
var passport = require('passport');
var db = require('../db');


var router = express.Router();

router.get('/', passport.authenticate('descope', { session: false }), (req, res, next) => {
  db.all('SELECT * FROM todos WHERE owner_id = ?', [
    req.user.id
  ], function(err, rows) {
    if (err) { return next(err); }
    var todos = rows.map(function(row) {
      return {
        id: row.id,
        title: row.title,
        completed: row.completed == 1 ? true : false,
        url: '/todos/' + row.id
      }
    });
    return res.json(todos);
  });
});

router.post('/', passport.authenticate('descope', { session: false }), (req, res, next) => {
  db.run('INSERT INTO todos (owner_id, title, completed) VALUES (?, ?, ?)', [
    req.user.id,
    req.body.title,
    req.body.completed == true ? 1 : null
  ], function(err) {
    if (err) { return next(err); }
    var todo = {
      id: this.lastID,
      title: req.body.title,
      completed: req.body.completed == true ? true : false,
      url: '/todos/' + this.lastID
    };
    return res.json(todo);
  });
});

router.patch('/:id', passport.authenticate('descope', { session: false }), (req, res, next) => {
  var assigns = [];
  var values = [];
  if ('title' in req.body) {
    assigns.push('title = ?');
    values.push(req.body.title);
  }
  if ('completed' in req.body) {
    assigns.push('completed = ?');
    values.push(req.body.completed === true ? 1 : null);
  }
  
  db.all('UPDATE todos SET ' + assigns.join(', ') + ' WHERE id = ? AND owner_id = ? RETURNING *', values.concat([
    req.params.id,
    req.user.id
  ]), function(err, rows) {
    if (err) { return next(err); }
    var row = rows[0];
    var todo = {
      id: row.id,
      title: row.title,
      completed: row.completed == 1 ? true : false,
      url: '/todos/' + row.id
    }
    return res.json(todo);
  });
});

router.delete('/:id', passport.authenticate('descope', { session: false }), (req, res, next) => {
  db.run('DELETE FROM todos WHERE id = ? AND owner_id = ?', [
    req.params.id,
    req.user.id
  ], function(err) {
    if (err) { return next(err); }
    return res.end();
  });
});

module.exports = router;
