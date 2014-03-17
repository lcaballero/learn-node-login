var passport = require('passport');


module.exports = function (
    config, app, HomeController) {

    function restrict(req, res, next) {
        next();
    };

    app.get('/',        restrict, HomeController.home);
    app.get('/home',    restrict, HomeController.home);
};