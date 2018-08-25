// Assignment: Survey Form Revisited

// Have the server render views/index.ejs that has the form for the user to fill out

// The user fills out the form and submits

// The form information is EMITTED to the server with the event name "posting_form"

// The server listens for an event 'posting_form' and when this event gets triggered, organizes all the emitted 
// information to form a single message and sends this single message with the event called 'updated_message'. 
// It also EMITs an event called 'random_number' with random number between 1-1000.

// The client listens for an event called 'random_number' and when this event gets triggered, shows the number in the HTML.

// The client listens for an event called 'updated_message' and when this event gets triggered, displays the message 
// somewhere in the HTML

const express = require('express');
const path = require('path');
const app = express();
const server = app.listen(7500);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
})

io.on('connection', function (socket){
    socket.on('posting_form', function(data){
        console.log(data);
        socket.emit('updated_message', { msg: data});
        socket.emit('random_number', { num: Math.floor(Math.random() * 1000) + 1 });
    });
})