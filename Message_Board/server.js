// A simple single page message board that allows users to create messages, and comment on existing messages

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/msg_board', {useNewUrlParser: true});

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

//insert your schemas

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    content: {type: String, required: [true, "Comment must have content"]}
}, {timestamps: true})

mongoose.model('Comment', CommentSchema);
const Comment = mongoose.model('Comment');

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"]},
    content: {type: String, required: [true, "Message must have content"]},
    comments: [CommentSchema]
}, {timestamps: true})

mongoose.model('Message', MessageSchema);
const Message = mongoose.model('Message');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.use(flash());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    Message.find({}, function(err, messages){
        if(err){
            console.log("There was an issue getting all the messages");
        }
        else {
            console.log('You should be seeing all the messages');
            res.render('index', {allMessages: messages});
        }
    })
})


//post route for message
app.post('/createmsg', function(req, res){
    console.log(req.body);
    const msg = new Message(req.body);

    msg.save(function(err){
        if(err){
            console.log("We received the following error ", err);
            for(let idx in err.errors){
                req.flash('newMsg', err.errors[idx].message);
            }
        }
        else {
            console.log('Your message has been added');
        }
        res.redirect('/');
    })
})


//post route for comment
app.post('/createcomm', function(req, res){
    console.log(req.body);
    const comment = new Comment(req.body);

    comment.save(function(err){
        if(err){
            console.log("We received the following error when trying to post your comment", err);
            for(let idx in err.errors){
                req.flash('newComment', err.errors[idx].message);
            }
        }
        else {
            Message.findOneAndUpdate({_id: req.body.id}, {$push: {comments: comment}}, function(err){
                if(err){
                    console.log("We received the following error when trying to add your comment to the message", err);
                }
                else {
                    console.log('Your comment has been added');
                }
            })
        }
        res.redirect('/');
    })
})





app.listen(7070, function(){
    console.log('Listening on port 7070');
});