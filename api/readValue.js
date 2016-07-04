'use strict'

module.exports = function(req, res) {
    var pg = require('pg');
    var connectionString = "postgres://gjthynzuwlgcnu:oXMSusiQgCu72n6oZheq5RYKI3@ec2-54-243-249-65.compute-1.amazonaws.com:5432/dcdrduaksp1vrj?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory"
    var key = req.body.key;
    var timestamp = req.body.timestamp;
    pg.connect(connectionString, function(err, client, done){
    	if(!timestamp){
    		 client.query("SELECT * FROM vaultapp WHERE key = $1",[key], function(err, result) {
                var LatestValue = Math.max.apply(Math,result.rows.map(function(o){return o.timestamp;}));
                console.log(LatestValue); 
                client.query("SELECT * FROM vaultapp WHERE timestamp = $1",[LatestValue], function(err, result) {
	                var response = {
	                	'rows' : result.rows,
	                	'StatusCode' : 20001,
	                	'Status' : 'Retrieved latest value'
	                }
	                res.send(response);
                });                   
                done(); 
         });
    	}
    	if(timestamp){
    		client.query("SELECT * FROM vaultapp WHERE key = $1 AND timestamp = $2",[key,timestamp], function(err, result) {
    			var response = {
                	'rows' : result.rows,
                	'StatusCode' : 20002,
                	'Status' : 'Retrieved particular value'
                }
                res.send(response);
    		});
    	}
        
    });
}