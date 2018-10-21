"use strict";

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let models = require('./models');

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Template engine setup
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('static'));

// Sessions middleware
var sessionStore = new session.MemoryStore;

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}));

// Flash messaging middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Landing page route
app.get('/', function(req, res) {
    res.render("index", {title: "Get alert about forest fires"});
});

let register = require('./routes/registerRouter');
let firemap = require('./routes/fireMapRouter')

app.use('/register', register);
app.use('/firemap', firemap);

// app.post('/register', function(req, res) {
//     models['member']
//     .findOrCreate({where: {name: req.body.name, 
//                            email: req.body.mail, 
//                            phone: req.body.number,
//                            location: req.body.location
//                            }})
//     .spread(function (user, created) {
//         console.log(user.get({
//             plain: true
//         }))
//         if (created) {
//             req.flash('success', 'Thank you for registering :)')
//             res.redirect('/')

//             return;
//         };
//     })
//     .catch(function (error) {
//         console.log(error);
//         req.flash('danger', 'Invalid Input');
//         res.redirect('/');

//         return;
//     })

//     req.flash('danger', 'This email account is already in use :(')
//     res.redirect('/');
// });

// Sync Database
models.sequelize.sync()
    .then(function() {
        console.log('Database successfully synced!')
    })
    .catch(function(err) {
        console.log(err, "Something went wrong with the database.")
    });

app.listen(3000, function(err) {
    if (!err) {
        console.log('Site is live!');
    }
    else console.log(err);
});