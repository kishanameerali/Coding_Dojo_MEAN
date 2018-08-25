// Assignment: Counter
// Build an Express application that counts the number of times the root route ('/') has been viewed by the user. 
// This assignment is to test your understanding of session.

// Ninja Level 1
// Add a +2 button underneath the counter that reloads the page and increments counter by 2. Add another route to handle this functionality.

// Ninja Level 2
// Add a reset button that resets the counter back to 1. Add another route to handle this functionality.

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    if (req.session.counter){
        req.session.counter += 1;
    }
    else {
        req.session.counter = 1;
    };
    res.render("index", {count: req.session.counter});
})

// Ninja Level 1, adding the +2 button
app.get('/plustwo', function(req, res){
    req.session.counter += 1;
    res.redirect('/');
})

// Ninja Level 2, adding the reset button
app.get('/reset', function(req, res){
    req.session.counter = 0;
    res.redirect('/');
})

app.listen(5000, function(){
    console.log("Listening on port 5000");
});