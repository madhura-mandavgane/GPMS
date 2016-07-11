var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
        db = new Db('GroupPollManagementSystem', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'GroupPollManagementSystem' database");
        db.collection('polls', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'polls' collection doesn't exist");
				//populateDB();
            }
        });
    }
});

exports.List = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving poll: ' + id);
    db.collection('polls', function(err, collection) {
		var o_id = new mongo.ObjectId(id);
		collection.find({_id:o_id}).toArray(function(err, items) {
		console.log(JSON.stringify(items));
            res.send(JSON.stringify(items));
        });
    });
};	


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

exports.ListByEmployee = function(req, res) {
    console.log('Listing all polls created by Employee:' + req.params.id);
    db.collection('polls', function(err, collection) {
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
			        items[item].pollStatus = "Open";
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
    db.collection('polls', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.ListOpenPollsForUser = function(req, res) {
    console.log('Listing all open polls');
  	var query = req.query;
	console.log("req.query= " + JSON.stringify(req.query));

	var groupIds = [];
	for (var grp in req.query)
    {
	    groupIds.push(req.query[grp]);
		console.log(req.query[grp]);
    }
	

    db.collection('polls', function(err, collection) {
	   var today = new Date().toISOString();
	   console.log(today);

	   var pollsToConsider=[];
	   collection.find().toArray(function(err, polls) {
			console.log(JSON.stringify(polls));
			for(var poll in polls)			  
			{
			   var participatingGroups = polls[poll].ParticipantGroups;
			   console.log("participatingGroups = " + JSON.stringify(polls[poll].ParticipantGroups));
			   for(var grp in participatingGroups)
			   {
			      if(groupIds.indexOf(participatingGroups[grp].groupId) != -1)
				  {	
				     pollsToConsider.push(polls[poll]);
					 break;
				  }
			   }
			}
			console.log("pollsToConsider = " + JSON.stringify(pollsToConsider));
			for(var i = 0; i<pollsToConsider.length; i++)			  
			{
			  var date = new Date();
			  var oDate = new Date(pollsToConsider[i]["openingDate"]);
			  console.log("odate = " + oDate); 
			  var cDate = new Date(pollsToConsider[i]["closingDate"]);
			  console.log("cdate = " + cDate); 
			  
			  if((cDate >= date) && (oDate <= date))
			     {
			        console.log("open");
			        pollsToConsider[i]["pollStatus"] = "Open";
			     }
		      else
			     {
                   console.log("closed");				 
			       pollsToConsider[i]["pollStatus"] = "Closed";
				 }
			}				
	        console.log("Final = "  + JSON.stringify(pollsToConsider));
	        res.send(pollsToConsider);
        });	 
	 });
};

exports.Add = function(req, res) {
    //TODO: validations

	var poll = JSON.parse(JSON.stringify(req.body));
    console.log('Adding poll: ' + JSON.stringify(poll));

    db.collection('polls', function(err, collection) {
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

exports.UpdateAnswer = function(req, res) {
    var id = req.params.id;
    var poll = req.body;
    console.log('Updating poll: ' + id);

    db.collection('polls', function(err, collection) {
	var o_id = new mongo.ObjectId(id);
   
	collection.update({_id:o_id}, { $set: {"answers": JSON.stringify(poll.answers)} }, function(err, result) {
            if (err) {
                console.log('Error updating poll: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('\n'+ result + ' document(s) updated');
                res.send(poll);
            }
        });
    });
}

exports.Update = function(req, res) {
    var id = req.params.id;
    var poll = req.body;
    console.log('Updating poll: ' + id);

    db.collection('polls', function(err, collection) {
	var o_id = new mongo.ObjectId(id);
   
	collection.update({_id:o_id}, function(err, result) {
            if (err) {
                console.log('Error updating poll: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('\n'+ result + ' document(s) updated');
                res.send(poll);
            }
        });
    });
}

exports.Delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting poll: ' + id);
    db.collection('polls', function(err, collection) {
		var o_id = new mongo.ObjectId(id);
        collection.remove({'_id':o_id}, function(err, result) {
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

    db.collection('polls', function(err, collection) {
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
		createdBy: "578196cdd958b1981e859734",
		creationDate: creationdt, 
		openingDate: openingdt1,
		closingDate: closingdt1,
        pollStatus:"",   
		question: "What is the capitalof India ?",
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
		    groupId: "578199a4535ffc6c1ea931c3"
		},
		{
		    groupId: "578199a4535ffc6c1ea931c4"
		}
		]
	},
	{
		description:"Trip Planning",
		createdBy: "578196cdd958b1981e859734",
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
		    groupId: "578199a4535ffc6c1ea931c4"
		},
		{
		    groupId: "578199a4535ffc6c1ea931c3"
		}
		]
	},
	{
		description:"Selfie Shot Question - General knowledge",
		createdBy: "578196cdd958b1981e859734",
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
		    groupId: "578199a4535ffc6c1ea931c4"
		},
		{
		    groupId: "578199a4535ffc6c1ea931c3"
		}
		]
	}
	];

	console.log(polls);
    db.collection('polls', function(err, collection) {
        collection.insertMany(polls, {safe:true}, function(err, result) {
		  if (err) {
                console.log("Error while inserting records:\n"+err+"\n result:"+result);
		  }
		});
		if (err) {
                console.log("Error while inserting records2:\n"+err);
		}
    });
}
