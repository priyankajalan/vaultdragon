'use strict'
module.exports = function(req, res) {
    var pg = require('pg');
    var connectionString = "postgres://gjthynzuwlgcnu:oXMSusiQgCu72n6oZheq5RYKI3@ec2-54-243-249-65.compute-1.amazonaws.com:5432/dcdrduaksp1vrj?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory"
    var key = req.body.key;
    var value = req.body.value;
    var timestamp = req.body.timestamp;
    pg.connect(connectionString, function(err, client, done){

        client.query("SELECT * FROM vaultapp WHERE key = $1;",[key], function(err, result) {
                //If the value is found update the value for the existing key
                if(result.rows.length){
                    client.query('INSERT INTO vaultapp(key,value,timestamp) VALUES($1,$2,$3)',[key,value,timestamp],function(err,result){
                        client.query("SELECT * FROM vaultapp WHERE key = $1;",[key], function(err, result) {
                            console.log(result);
                               var tablerow = {
                                'rowinfo' : result.rows,
                                'statusCode' : 1001,
                                'statusMessage' : 'value updated'
                               }
                                res.send(tablerow);
                                done();
                        });
                    })
                }                    
                //If the value is not found then add as new entry
                if(!result.rows.length){
                    client.query('INSERT INTO vaultapp(key,value,timestamp) VALUES($1,$2,$3)',[key,value,timestamp], function(err, result) {
                        client.query("SELECT * FROM vaultapp WHERE key = $1;",[key], function(err, result) {
                            console.log(err);
                                var tablerow = {
                                    'rowinfo' : result.rows,
                                    'statusCode' : 1002,
                                    'statusMessage' : 'value added'
                                }
                                res.send(tablerow);
                                done(); 
                        });
                    });
                }                    
                done(); 
        });         
    });
}