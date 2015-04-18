var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres

app.use(function(req, res, next){
    if (typeof(todolist) == 'undefined') {
        todolist = [];
    }
    next();
});

app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: todolist});
});

io.sockets.on('connection', function (socket) {
    console.log('Connexion d\'un nouvel utilisateur');
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('ajouter', function(task) {
        if(task != ''){
            todolist.push(req.body.task);
            socket.broadcast.emit('ajouter', task);
        }
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});
/*
app.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});*/

app.use(function(req, res, next){
    res.redirect('/todo');
});

server.listen(8080);