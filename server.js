var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* On utilise les sessions */

app.use(session({secret: 'todotopsecret'}));

/* S'il n'y a pas de todolist dans la session,

on en crée une vide sous forme d'array avant la suite */

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
});

app.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

app.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.use(function(req, res, next){
    res.redirect('/todo');
});

app.listen(8080);