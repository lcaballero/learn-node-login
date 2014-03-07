var hbs = require('express-hbs'),
    engine = require('ejs-locals'),
    path = require('path');

module.exports = function (app) {

    //set up view engine
    app.engine('ejs', engine);
    app.set('views', path.join(__dirname, "../views"));
    app.set('view engine', 'ejs');

//    app.engine('hbs', hbs.express3({
//        partialsDir:path.join(__dirname, "../views/partials")
//    }));

    // Static locals
    app.locals({
    });
};