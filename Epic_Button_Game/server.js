// Assignment: Epic Button Game
// Your app should serve only a single view, index.ejs.  
// Any time the epic button is pushed, the count should update on every user who is connected via sockets.  
// This should happen in real time.  If a user clicks the reset button, the count should reset to 0 for every user as well!

// load views/index
// when button is pushed, count updates by 1, emit to server
// server listens and emits the new count
// when reset is pressed, emit to server
// server listens, makes count 0 and emits to client

const express = require('express');
const path = require('path');
const app = express();
const server = app.listen(7505);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

let count = 0;

app.get('/', function(req, res){
    res.render('index', {num_count: count});
})

io.on('connection', function (socket){
    socket.on('update_count', function(data){
        console.log(data.msg);
        count += 1;
        socket.emit('send_count', { count: count });
        socket.broadcast.emit('broadcast_count', { count: count });
    })

    socket.on('reset_count', function(data){
        console.log(data.msg);
        count = 0;
        socket.emit('send_count', { count: count });
        socket.broadcast.emit('broadcast_count', { count: count });
    })
})

