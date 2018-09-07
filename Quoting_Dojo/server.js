// Simple app that allows users to add quotes to a database and display them on a separate page.
// The 'add my quote' button should add the user's quote to the database, but the 'skip to quotes' button should 
// take the user directly to the main page.  

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quoting_dojo', {useNewUrlParser: true});

app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

const QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quote: {type: String, required: true},
}, {timestamps: true})
mongoose.model('Quote', QuoteSchema);
const Quote = mongoose.model('Quote');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.use(flash());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Here are our routes

app.get('/', function(req, res){
    res.render('index');
})

//Post route for form to submit Quote
app.post('/quotes', function(req, res){
    console.log('POST DATA', req.body);
    const quote = new Quote(req.body);

    quote.save(function(err){
        if(err){
            console.log("We have the following error: ", err);
            for(let key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log('Success, your quote was submitted');
            res.redirect('allQuotes');
        }
    })
})

//Route for allQuotes view
app.get('/allQuotes', function(req, res){
    Quote.find().sort({createdAt: -1}).exec(function(err, quotes){ 
        if(err){
            console.log("There was an error pulling up the Quotes");
        } else {
            res.render('allquotes', {allQuotes: quotes});
        }
    })
})


app.listen(5050, function(){
    console.log("Listening on port 5050");
})