var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

// Database settings
var config = require('./config/settings');

mongoose.connect(config.mongodb);
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var clients = require('./routes/clients');
var oauth2 = require('./routes/oauth2');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.disable('x-powered-by');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: '*****',
    name: '*****',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true,        // Use in production. Send session cookie only over HTTPS
        httpOnly: true,
    }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  },
  customValidators: {
    checkLength: function(value) {
        return value.length >= 8;
    }
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Create our Express router
var router = express.Router();

app.use('/', routes);
app.use('/users', users);
app.use('/api/clients', clients);
app.use('/api/oauth2', oauth2);


// Set Port
app.set('port', (process.env.PORT || 3002));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
