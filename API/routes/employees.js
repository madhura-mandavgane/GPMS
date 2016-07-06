var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GPMS1', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GPMS' database");
        db.collection('employees', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.login = function(req,res) {
		console.log('login request : ' + JSON.stringify(req.body));
		var data = { username : req.body.username, password : req.body.password };
		
		db.collection('employees', function(err, collection) {
		collection.findOne( { $and : [{ username : data.username } , {password : data.password} ] }, function(err , user){
			/*	res.setHeader('Content-Type', 'application/json');
				//assert.equal(err,null);
				if(doc == null){
					res.setErr
					var obj = { message : "Username not found"};
					res.json(obj);
					console.log( " Username not found" + err);
					res.end();
				}
				else{
					//res.setHeader('200','OK');
					res.json(doc);
					res.end();
				}
			*/
            if (err) {
                console.log('Cannot authenticate: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log(result + ' document(s) updated');
                res.send(user);
            }			
		});
    });
}


//get Employee Objects by their IDs
exports.getEmployeesById = function(req,res){
		console.log('start getempID' + JSON.stringify(req.body));
		data = { eid : req.body.eid };
        
		db.collection('employees', function(err, collection) {
	    var o_id = new mongo.ObjectId(data.eid);
		collection.findOne({ _id : o_id}, function(err , doc){
				res.setHeader('Content-Type', 'application/json');
				//assert.equal(err,null);
				if(err){
					res.setHeader('404','Not Ok');
					console.log(err);
					res.end();
				}
				else{
					res.setHeader('200','OK');
					res.send(JSON.stringify(doc));
				}
				
		});
	});	
}

exports.getAllEmployees = function(req,res){
	console.log('request for all employees..');
	
	db.collection('employees', function(err, collection) {
	collection.find().toArray(function(err,docs){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(docs));
	});
  });
}