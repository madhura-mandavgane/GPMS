var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GroupPollMgmtSystem', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GroupPollMgmtSystem' database");
        db.collection('groups', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'groups' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

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
		    console.log('items:' +JSON.stringify(items));
            res.end(JSON.stringify(items));
        });
    });
};

exports.Add = function(req, res) {
    var group = req.body;
	console.log('Request.body=' + group);
    console.log('Adding group: ' + JSON.stringify(group));
    db.collection('groups', function(err, collection) {
        collection.insert(group, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.Update = function(req, res) {
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
                res.send(group);
            }
        });
    });
}

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

    var groups = [
    {
        name: "IBM BU",
		id: "1000",
		creationDate: "05/22/2016", 
		createdBy: "8073",
        employees: [
		{
		    id:"1111",
			name:"XXX"
		},
        { 
		    id:"1222",
			name:"YYY"
		}
      ]
	},
    {
        name: "SV Core",
		id: "1001",
		creationDate: "05/22/2016", 
		createdBy: "8073",
        employees: [
		{
		    id:"2111",
			name:"XXX"
		},
		{ 
		    id:"2222",
			name:"YYY"
		}
		]	
    }
	];

    db.collection('groups', function(err, collection) {
        collection.insert(groups, {safe:true}, function(err, result) {});
    });

};