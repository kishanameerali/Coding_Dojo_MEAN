// Assignment Survey Form
// Have the server render views/index.ejs that has the form for the user to fill out
// The user fills out the form and submits
// The submitted form gets sent to /result
// The server recognizes when someone posts things to /result, grabs information from the POST, and sends 
// the POST data back as it renders views/results.ejs

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
})

app.post('/result', function(req, res){
    console.log("POST DATA", req.body);
    res.render('result', {info: req.body});
})

app.listen(5000, function(){
    console.log("Listening on port 5000");
});