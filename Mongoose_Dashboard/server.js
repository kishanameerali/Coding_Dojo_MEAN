// An app which manages a pack of some kind of animal. You need to be able to add a new animal, update it, and delete it. 
// You should use the following routes to build this app:

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose_dashboard', {useNewUrlParser: true});

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

const OwlSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true}
}, {timestamps: true})

mongoose.model('Owl', OwlSchema);
const Owl = mongoose.model('Owl');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.use(flash());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Routes

app.get('/', function(req, res){
    Owl.find({}, function(err, owls){
        if(err){
            console.log("There was an error getting all the owls");
        } else {
            console.log("You should be seeing all the owls");
            res.render('index', {allOwls: owls});
        }
    })
});

app.get('/owls/:id', function(req, res){
    console.log(req.params.id);
    Owl.findOne({_id: req.params.id}, function(err, owl){
        if(err){
            console.log("We couldn't find the Owl you were looking for");
            res.redirect('/');
        } else {
            res.render('profile', {owlInfo: owl});
        }
    })
})

app.get('/new', function(req, res){
    res.render('new');
})

app.post('/owls/create', function(req, res){
    console.log('POST DATA', req.body);
    const owl = new Owl(req.body);

    owl.save(function(err){
        if(err){
            console.log("We received this error ", err);
            for(let key in err.errors){
                req.flash('newOwl', err.errors[key].message);
            }
            res.redirect('/new');
        }
        else {
            console.log("We added the owl");
            res.redirect('/');
        }
    })
})

app.get('/owls/edit/:id', function(req, res){
    console.log(req.params.id);
    Owl.findOne({_id: req.params.id}, function(err, owl){
        if(err){
            console.log("We couldn't find the Owl you were looking for");
            res.redirect('/');
        } else {
            res.render('edit', {owlInfo: owl});
        }
    })  
})

app.post('/:id', function(req, res){
    console.log('POST DATA', req.body);
    console.log(req.params.id);
    Owl.update({_id: req.params.id}, { $set: {name: req.body.name, color: req.body.color}}, function(err){
        if(err){
            console.log("Sorry something went wrong");
        }
        else{
            console.log("Owl has been updated");
        }
        res.redirect("/");
    })
})

app.post('/destory/:id', function(req, res){
    Owl.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
            console.log("Sorry something went wrong");
        }
        else{
            console.log("Owl has been deleted");
        }
        res.redirect("/");
    })
})

app.listen(8000, function(){
    console.log("Listening on port 8000");
});