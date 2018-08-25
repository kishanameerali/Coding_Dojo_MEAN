// Assignment: Great Number Game
// Create a site that when a user loads it creates a random number between 1-100 and stores the number in session. 
// Allow the user to guess at the number and tell them when they are too high or too low. 
// If they guess the correct number tell them and offer to play again.

const express = require('express');
const path = require('path');
const session = require("express-session");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.use(session({
    secret: "secretsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    req.session.num = Math.floor(Math.random() * 100) + 1;
    res.render('index');
})

app.post('/guess', function(req,res){
    let num = req.body.guess;

    if(num < req.session.num){
        req.session.result = "low";
    }
    else if(num > req.session.num){
        req.session.result = "high";
    }
    else{
        req.session.result = "won";
    }
    var result_array = [req.session.result, req.session.num]

    res.render('index', { result: result_array});
})

app.listen(8000, function() {
    console.log("listening on port 8000");
   });