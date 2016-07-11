var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GroupPollManagementSystem', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GroupPollManagementSystem' database");
        db.collection('groups', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'groups' collection doesn't exist");
				//populateDB();
            }
        });
    }
});

exports.getAllGroups=function(req,res){
	console.log('request received');		
	//var groups = connection.collection('groups');
	db.collection('groups', function(err, collection) {
	    collection.find().toArray(function(err, items){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(items));
		//res.json(items);
		//res.end();
	});
  });
}

exports.createNewGroup = function(req, res) {
var data = { employeeID : req.body.eid, groupName : req.body.groupName, listEmployees : req.body.members};
	
	console.log("creating new group : " + JSON.stringify(req.body));
	
	list = req.body.members;
	
	id_array = [];
	for(var i in list)
	{
		var o_id = new mongo.ObjectId(list[i]);
		id_array.push({ member_id : o_id});
	}
	
	//var groups = connection.collection("groups");
	db.collection('groups', function(err, collection) {
	//grpname , eid who created , members' IDs
	// check if grpname already exists
 	collection.insertOne({
		groupName : data.groupName,
		eid : data.employeeID,
		members : id_array
	},	function(err,result){
			res.setHeader('Content-Type', 'application/json');
			if(err){				
				var respo = {inserted : 'false'};
				res.send(JSON.stringify(respo));
				//res.json(respo);
				//res.end();
			}
			assert.equal(err,null);
			console.log("Inserted Group with Name: " + data.groupName);
			var respo = {inserted : 'true'};
			res.send(JSON.stringify(respo));
			//res.json(respo);
			//res.end();
		}
	);
  });	
}

exports.groupAvailable=function(req,res){
		var grp = req.body.groupName;
		
		db.collection('groups', function(err, collection) {
		console.log('searching for ' + grp);
		
		collection.findOne({groupName : grp}, function(err, doc){
			if(err){
				console.error(err);
			}
			else{
				console.log('read one doc: ' + JSON.stringify(doc));
				
				responseObject = new Object();
				
				if(doc == null){
					//group doesn't exist already. i.e. groupName suggested by client is available.
					responseObject.flag = 'true';
				}
				else{
					responseObject.flag = 'false';
				}
				res.send(JSON.stringify(responseObject));
			}
		});
	});
}

exports.getEmployeesForGroup=function(req,res){
	/*
		req should be in following form  (array of employeeIDs):
							{
					"ListEmployees": [
							{
							  "member": "575bbc1492590d0114f5fe93"
							},
							{
							  "member": "575bbc2992590d0114f5fe94"
							},
							{
							  "member": "575bbc3992590d0114f5fe95"
							}
						  ]
					}
	*/

		
	list = req.body.ListEmployees;
		
	    db.collection('employees', function(err, collection) {
		id_array = [];
		for(var i in list)
		{
		    var o_id = new mongo.ObjectId(list[i].member);
			id_array.push({ _id : o_id});
		}
		
		collection.find({$or : id_array }).toArray(function(err , data){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(data));
			//res.json(data);
			//res.end();
		});
	});
}

exports.GetGroupsOfEmployee = function(req,res){
	console.log('Get all groups of the employee = ' + req.params.id);
	var id = req.params.id;
	
	db.collection('groups' , function(err, collection) {
	   //var o_id = new mongo.ObjectId(id)
	   //collection.find({"members": { "$in": [ mongo.ObjectId(id) ] } }).toArray(function(err, docs) {
	   collection.find().toArray(function(err, docs) {
	     console.log("docs = " + JSON.stringify(docs));
		// for(var )
	     res.send(docs);       
	});
  });
}

exports.List = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving Group: ' + id);
	
    db.collection('groups', function(err, collection) {
        //collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
		collection.findOne({'id':id	}, function(err, item) {
            res.send(item);
        });
    });
};

exports.ListAll = function(req, res) {
    console.log('Listing all groups');
    db.collection('groups', function(err, collection) {
        collection.find().toArray(function(err, items) {
			console.log('groups = ' + JSON.stringify(items));
            res.send(items);
        });
    });
};

exports.ListDefault = function(req, res) {
    console.log('Listing default groups');
	populateDB();
    db.collection('groups', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.Add = function(req, res) {
    var group = req.body;
	console.log('Request.body=' + group);
    console.log('Adding group: ' + JSON.stringify(group));
    db.collection('groups', function(err, collection) {
        collection.insert(groups, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

/* exports.Update = function(req, res) {
    var id = req.params.id;
    var group = req.body;
    console.log('Updating group: ' + id);
    console.log(JSON.stringify(group));
    db.collection('groups', function(err, collection) {
        collection.update({'id':id}, group, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating group: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
} */

exports.Delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting group: ' + id);
    db.collection('groups', function(err, collection) {
        collection.remove({'id':id}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
    var creationdt = new Date();
	var o_id1 = new mongo.ObjectId('578196cdd958b1981e859733');
	var o_id2= new mongo.ObjectId('578196cdd958b1981e859734');
    var groups = [
    {
        groupName: "IBM BU",
	    creationDate: creationdt, 
		createdBy: "578196cdd958b1981e859733",
        members: [
		  {
		    member_id:o_id1
		  }
        ]
	},
    {
        groupName: "SV Core",
		creationDate: creationdt, 
		createdBy: "578196cdd958b1981e859733",
        members: [
		  {
		    member_id:o_id2
		  }
		]	
    }
	];
	
	console.log(groups);
    db.collection('groups', function(err, collection) {
        collection.insertMany(groups, {safe:true}, function(err, result) {
		  if (err) {
                console.log("Error while inserting records:\n"+err+"\n result:"+result);
		  }
		});
		if (err) {
                console.log("Error while inserting records:\n"+err);
		}
    });
};