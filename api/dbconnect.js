var pg = require('pg');

var connectionString = "postgres://gjthynzuwlgcnu:oXMSusiQgCu72n6oZheq5RYKI3@ec2-54-243-249-65.compute-1.amazonaws.com:5432/dcdrduaksp1vrj?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory"

pg.connect(connectionString, function(err, client, done){
     client.query("select * from vaultapptable;", function(err, result) {
            console.log(result.rows);
            done(); 
     });
});