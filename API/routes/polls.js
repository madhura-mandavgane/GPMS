var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GroupPollMgmtSystem', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GroupPollMgmtSystem' database");
        db.collection('polls', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'polls' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.List = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving poll: ' + id);
    db.collection('polls', function(err, collection) {
		collection.findOne({'id':id	}, function(err, item) {
            res.send(item);
        });
    });
};	

exports.ListByEmployee = function(req, res) {
    console.log('Listing all polls created by Employee:' + req.params.id);
    db.collection('polls', function(err, collection) {
        collection.find({'createdBy':req.params.id}).toArray(function(err, items) {
		    console.log(JSON.stringify(items));
            res.send(items);
        });
    });
};

exports.ListAll = function(req, res) {
    console.log('Listing all polls');
    db.collection('polls', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.Add = function(req, res) {
    //TODO: validations
    var poll = req.body;
	console.log('Request.body=' + poll);
    console.log('Adding poll: ' + JSON.stringify(poll));
    db.collection('polls', function(err, collection) {
        collection.insert(poll, {safe:true}, function(err, result) {
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
    var poll = req.body;
    console.log('Updating poll: ' + id);
    console.log(JSON.stringify(poll));
    db.collection('polls', function(err, collection) {
        collection.update({'id':id}, poll, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating poll: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(poll);
            }
        });
    });
}

exports.Delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting poll: ' + id);
    db.collection('polls', function(err, collection) {
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

    var polls = [
    {
		id: "1000",
		createdBy: "8073",
		pollStatus: "0",
		creationDate: "05/22/2016", 
		openingDate: "",
		closingDate: "",
		question: "What is the capital of India ?",
		answers: [
		{ 
		    option: "a",
			ans:"Mumbai"
	    },
		{ 
		    option: "b",
			ans:"Calcutta"
	    },
		{ 
		    option: "c",
			ans:"Delhi"
	    },
		{ 
		    option: "d",
			ans:"Bglore"
	    }
	    ],
		correctOption: "c",
		isResultVisibleToParticipants: "true",
		ParticipantGroups : [
		{
		    groupId: "1000"
		},
		{
		    groupId: "1001"
		}
		]
	},
	{
		id: "1001",
		createdBy: "8073",
		pollStatus: "0",
		creationDate: "05/22/2016", 
		openingDate: "",
		closingDate: "",
		question: "What is the capital of MH ?",
		answers: [
		{ 
		    option: "a",
			ans:"Mumbai"
	    },
		{ 
		    option: "b",
			ans:"Calcutta"
	    },
		{ 
		    option: "c",
			ans:"Delhi"
	    },
		{ 
		    option: "d",
			ans:"Bglore"
	    }
	    ],
		correctOption: "a",
		isResultVisibleToParticipants: "true",
		ParticipantGroups : [
		{
		    groupId: "1000"
		},
		{
		    groupId: "1001"
		}
		]
	}
	];

    db.collection('polls', function(err, collection) {
        collection.insert(polls, {safe:true}, function(err, result) {});
    });

};