const express = require('express');
const app = express();
const config = require('./config/database');
const Register = require('./modals/Register.js');
const passport = require('passport');
const flash = require('connect-flash');

const session = require('express-session');



app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(express.urlencoded({
    extended: false
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
const mongoose = require('mongoose');







mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.set('view-engine', 'ejs');

app.get("/dashboard", (req, res) => {
    res.render("dassboard.ejs", {
        user: Register.name
    });
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.get("/register", (req, res) => {
    res.render("register.ejs");
});



app.post("/register", (req, res) => {
    // body parser
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new Register({
        name: name,
        email: email,
        password: password
    })
    newUser.save();
    res.redirect("/login");
});
//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});


app.listen(5000, () => {
    console.log("server is started on port 5000");
});