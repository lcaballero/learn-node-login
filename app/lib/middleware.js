var express = require('express'),
    connect_timeout = require('connect-timeout'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, config) {

    var session_middleware = express.session({
        key:config.session.key,
        secret:config.session.secret
    });

    // Error handler
    var error_middleware = express.errorHandler({
        dumpExceptions:true,
        showStack:true
    });

    var allowed = {
        "lucas": {
            id:1,
            username:"lucas",
            password:"login"
        }
    }

    var User = {
        findOne:function(opts, done) {
            opts = opts || {};
            var username = opts.username;
            var password = opts.password;

            if (!username || !allowed[username]) {
                console.log("didn't find username");
                return done(null, false);
            }

            var user = allowed[username];

            if (user.username === username && user.password !== password) {
                console.log("didn't match username and password");
                return done(null, false);
            }

            if (user.username === username && user.password === password) {
                console.log('found user:', JSON.stringify(user, null, '  '));
                return done(null, user);
            }

            // else, wtf?
            return done(null, false)
        }
    }

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username, password);
            User.findOne({username:username, password:password}, done);
        }
    ));

    passport.serializeUser(function(user, done) {
        console.log("serializing user id:", JSON.stringify(user, null, '  '));
        allowed[user.id] = user;
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        if (allowed[id]) {
            console.log("deserializing user id:", id);
            done(null, allowed[id]);
        }
    })

    // Middleware stack for all requests
    app.use(express['static'](app.set('public')));                  // static files in /public
    app.use(connect_timeout({ time:config.request_timeout }));      // request timeouts
    app.use(express.cookieParser());                                // req.cookies
    app.use(session_middleware);                                    // req.session
    app.use(express.bodyParser());                                  // req.body & req.files
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.methodOverride());                              // '_method' property in body (POST -> DELETE / PUT)
    app.use(app.router);                                            // routes in lib/routes.js
    app.use(function (req, res, next) {                             // barebones 404 handler
        res.send(404);
    });

    // Handle errors thrown from middleware/routes
    app.use(error_middleware);
};
