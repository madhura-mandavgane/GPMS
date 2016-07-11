1. Create a DB from mongo client
   
   use GroupPollManagementSystem;

2. Import the json files (committed into git) into the above db

   mongoimport --db GroupPollManagementSystem --collection employees --file employees.json
   mongoimport --db GroupPollManagementSystem --collection groups --file groups.json
   mongoimport --db GroupPollManagementSystem --collection polls --file polls.json
