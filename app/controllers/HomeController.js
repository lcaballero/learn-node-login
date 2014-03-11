module.exports = function (app, config, ConnectionPool) {

    console.log("conn: ", config.postgres_conn);

    return {
        index:[
            function (req, res, next) {

                ConnectionPool.acquire(function(err, client) {
                    if (err) {

                        res.send("err");
                        next();

                    } else {

                        client.query("select * from _user;", [], function(err, results) {
                            ConnectionPool.release(client);

                            if (err) {
                                console.log("err: ", err);
                                res.send(err);
                            } else {

                                res.locals.users = JSON.stringify(results, null, '  ');
                                res.locals.conn = config.postgres_conn;
                                res.locals.title = 'hello world 2';
                                res.render('pages/index');

                            }

                        });
                    }
                });

            }
        ],
        home: [
            function(req, res, next) {
                res.locals.title = 'Dashboard';
                res.render('pages/home');
            }
        ],
        login: [
            function(req, res, next) {
                res.locals.title = 'Login';
                res.render('pages/login');
            }
        ],
        register: [
            function(req, res, next) {
                res.locals.title = 'Register';
                res.render('pages/register');
            }
        ]

    };
};
