/**
 * Created by lucascaballero on 11/23/13.
 */
var Pool = require('generic-pool').Pool;
var Client = require('pg').Client;

module.exports = function(config) {

    var options = {
        name:'pg',
        create: function(callback) {

            if (!config.postgres_conn) {
                throw 'Mising connection options.';
            }

            var client = new Client(config.postgres_conn);

            client.connect(
                function(err) {
                    if (!!err) {
                        console.log('pg.Client connection error', err);
                    } else {
                        callback(null, client);
                    }
                }
            )
        },
        destroy: function(client) {
            return client.end();
        },
        max:10,
        min:0,
        idleTimeoutMillis: 30000,
        log:false
    }

    return Pool(options);
};