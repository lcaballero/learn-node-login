var passport = require('passport');


module.exports = function (
    config, app, HomeController) {


    var auth = passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login'
    });

    function restrict(req, res, next) {
        if (req.session.user || req.user) {
            next();
        } else {
            req.session.error = "Access denied!";
            res.redirect("/login");
        }
    };

    app.get('/',        restrict, HomeController.index);
    app.get('/home',    restrict, HomeController.home);

    app.get('/login',   HomeController.login);
    app.post('/login',  auth);
    app.get('/logout', function(req, res){
        req.session.destroy(function(){
            res.redirect('/login');
        });
    });

};