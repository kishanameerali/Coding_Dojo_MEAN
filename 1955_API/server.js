const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/1955', {useNewUrlParser: true});


const PersonSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]}
}, {timestamps: true})

mongoose.model('Person', PersonSchema);
const Person = mongoose.model('Person');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    Person.find({}, function(err, people){
        if(err){
            console.log("Returned Error", err);
            res.json({message: "Error", error:err})
        }
        else {
            res.json({message: "Success", data: people});
        }
    })
})

// will add a name into the database
app.get('/new/:name', function(req, res){
    const person = new Person(req.params);

    person.save(function(err, person){
        if(err){
            console.log("We received this error ", err);
            res.json({message: "Error", error:err});
        }
        else {
            res.json({message: "Success", data: person});
        }
    })
})

// will delete a name from the database
app.get('/remove/:name', function(req, res){
    Person.findOneAndRemove({name: req.params.name}, function(err){
        if(err){
            console.log("Returned Error", err);
            res.json({message: "Error", error:err});
        }
        else {
            res.json({message: "Success"});
        }
    })
})

// will bring up the document of that particular person
app.get('/:name', function(req, res){
    Person.findOne({name: req.params.name}, function(err, person){
        if(err){
            console.log("Returned Error", err);
            res.json({message: "Error", error:err});
        } else {
            res.json({message: "Success", data: person});
        }
    })
})


app.listen(5050, function(){
    console.log('Listening on port 5050');
});