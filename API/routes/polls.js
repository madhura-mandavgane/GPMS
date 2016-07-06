var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GPMS1', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GPMS' database");
        db.collection('polls1', {strict:true}, function(err, collection) {
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
    db.collection('polls1', function(err, collection) {
		var o_id = new mongo.ObjectId(id);
		collection.find({_id:o_id}).toArray(function(err, items) {
		console.log(JSON.stringify(items));
            res.send(JSON.stringify(items));
        });
    });
};	

exports.ListByEmployee = function(req, res) {
    console.log('Listing all polls1 created by Employee:' + req.params.id);
    db.collection('polls1', function(err, collection) {
        collection.find({'createdBy':req.params.id}).toArray(function(err, items) {
		    console.log(JSON.stringify(items));
			for(var item in items)			  
			{ 
			   var today = new Date();
			   var openingDate = new Date(items[item].openingDate);
			   var closingDate = new Date(items[item].closingDate);

			   if((closingDate >= today) && (openingDate <= today))
			   {
			        console.log("open");
			        items[item].pollstatus = "Open";
			   }
			   else if(today < openingDate)
			   { 
			        console.log("Not Opened");
			        items[item].pollStatus = "Not Opened";
			   }
			   else
			   {
			        console.log("Closed");
			        items[item].pollStatus = "Closed";
			   }
			}
            res.send(items);
        });
    });
};

exports.ListAll = function(req, res) {
    console.log('Listing all polls');
    db.collection('polls1', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.ListOpenPollsForUser = function(req, res) {
    console.log('Listing all polls');
    db.collection('polls1', function(err, collection) {
	var today = new Date().toISOString();
	//var today = new Date();
	console.log(today);
    collection.find( { $or: [
	                          { $and: [ { 'closingDate':{ $gte: new Date(today) } }, 
	                                    { 'openingDate':{ $lte: new Date(today) } }
							          ]
							  },
							  { $and: [ { 'closingDate':{ $lt: new Date(today) } },
	                                    { 'isResultVisibleToParticipants': 'true' }
							          ]
							  }
							]
					 } ).toArray(function(err, items) {
			console.log(JSON.stringify(items));
			for(var item in items)			  
			{
			  var date = new Date();
			  var oDate = new Date(items[item].openingDate);
			  var cDate = new Date(items[item].closingDate);
			  
			  if((cDate >= date) && (oDate <= date))
			     {
			        console.log("open");
			        items[item].pollStatus = "Open";
			     }
		      else
			     {
                   console.log("closed");				 
			       items[item].pollStatus = "Closed";
				 }
			}		
	         //collection.find( {'closingDate':{ $gte: new Date(today) } } ).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.Add = function(req, res) {
    //TODO: validations

	var poll = JSON.parse(JSON.stringify(req.body));
    console.log('Adding poll: ' + JSON.stringify(poll));

    db.collection('polls1', function(err, collection) {
        collection.insert(poll, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result);
            }
        });
    }
	
);
}

exports.Update = function(req, res) {
    var id = req.params.id;
    var poll = req.body;
    console.log('Updating poll: ' + id);
    console.log(JSON.stringify(poll));
    db.collection('polls1', function(err, collection) {
	var o_id = new mongo.ObjectId(id);
        collection.update({'id':o_id}, poll, {safe:true}, function(err, result) {
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
    db.collection('polls1', function(err, collection) {
        console.log(collection);
		var o_id = new mongo.ObjectId(id);
        db.collection.remove({'_id':o_id}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

exports.Commit = function(req, res) {
    //TODO: validations

	var poll = JSON.parse(JSON.stringify(req.body));
    console.log('Commiting poll: ' + JSON.stringify(poll));

    db.collection('polls1', function(err, collection) {
        collection.insert(poll, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result);
            }
        });
    }
	
);
}

var addDays = function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

var backDate = function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
    var creationdt = new Date();
	var openingdt1 = creationdt;
	var closingdt1 = addDays(creationdt, 3);
	
	var openingdt2  = backDate(creationdt, 3);
	var closingdt2  = backDate(creationdt, 2);
    var creationdt2 = backDate(creationdt, 4); 
	
	var openingdt3 = addDays(creationdt, 1);
	var closingdt3 = addDays(creationdt, 2);
   
    var polls = [
    {
		description:"Selfie Shot Question",
		createdBy: "577b8d92bc1283884fcd2573",
		creationDate: creationdt, 
		openingDate: openingdt1,
		closingDate: closingdt1,
        pollStatus:"",   
		question: "What is the capital of India ?",
		answers: [
		{ 
                   "ans":"Mumbai",
				     "optionNo" : "1",
                   "correct":"false",
                   "answeredCount":"1" 
	        },
		{ 
		   "ans":"Calcutta",
		     "optionNo" : "2",
                   "correct":"false",
                   "answeredCount":"2"
	        },
		{ 
                   "ans":"Delhi",
				     "optionNo" : "3",
                   "correct":"true",
                   "answeredCount":"4"
	        },
		{ 
		   "ans":"Bglore",
		     "optionNo" : "4",
                   "correct":"false",
                   "answeredCount":"6"
       	        }
	        ],                
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
		description:"Trip Planning",
		createdBy: "577b8d92bc1283884fcd2573",
		creationDate: creationdt2, 
		openingDate: openingdt2,
		closingDate: closingdt2,
        pollStatus:"",   
		question: "Where should we go for trip on this Sunday ?",
		answers: [
		{ 
                   "ans":"Mumbai",
				   "optionNo" : "1",
                   "correct":"false",
                   "answeredCount":"1" 
	        },
		{ 
		           "ans":"Calcutta",
				   "optionNo" : "2",
                   "correct":"false",
                   "answeredCount":"2"
	        },
		{ 
                   "ans":"Delhi",
				   "optionNo" : "3",
                   "correct":"false",
                   "answeredCount":"4"
	        },
		{ 
		           "ans":"Bglore",
		           "optionNo" : "4",
                   "correct":"false",
                   "answeredCount":"6"
       	        }
	        ],          
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
		description:"Selfie Shot Question - General knowledge",
		createdBy: "577b8d92bc1283884fcd2573",
		creationDate: creationdt, 
		openingDate: openingdt3,
		closingDate: closingdt3,
        pollStatus:"",   
		question: "What is the currency of US ?",
		answers: [
		{ 
                   "ans":"Rupee",
				   "optionNo" : "1",
                   "correct":"false",
                   "answeredCount":"1" 
	        },
		{ 
		   "ans":"Dollar",
		   "optionNo" : "2",
           "correct":"true",
           "answeredCount":"2"
	        }
	    ],                
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

	console.log(polls);
    db.collection('polls1', function(err, collection) {
        collection.insert(polls, {safe:true}, function(err, result) {
		  if (err) {
                console.log("Error while inserting records:"+err);
		  }
		});
		
    });
}
