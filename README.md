## Peertuber back-end part 

## About the project 

Peertuber is the aggregator of the Peertube instances. It is based on the official API that could be found <a href="https://instances.joinpeertube.org/instances" target="_blank">here.</a> To learn more about Peertube visit  <a href="https://joinpeertube.org" target="_blank">official site.</a>

Current repository contains the code of the backend server of Peertuber. Check the front-end client repository<a href="https://github.com/acdmft/peertuber-front" target="_blank"> here.</a> 

Peertuber <a href="peertuber.vercel.app" target="_blank">demo.</a>

## Dependencies 
* [Node.js] (https://nodejs.org/)
* [Express] (https://expressjs.com)
* [Mongoose] (https://https://mongoosejs.com/)
* [Express-graphql] (https://github.com/graphql/express-graphql)
* [Graphql] (https://github.com/graphql/graphql-js)

#### To manage authentication and cookies: 
* [Bcrypt] (https://github.com/kelektiv/node.bcrypt.js)
* [Cookie-parser] (https://github.com/expressjs/cookie-parser)
* [jsonwebtoken] (https://github.com/auth0/node-jsonwebtoken)

### To implement CORS 
* [Cors] (https://github.com/expressjs/cors)

## Getting started 

### Launch mongodb database 
Create mongodb instance and download <a href="https://drive.google.com/file/d/1Q789y5QzP29LoNwOs2V22ACxb5ZcnY22/view?usp=sharing" target="_blank">videos</a> and 
<a href="https://drive.google.com/file/d/1cT5U5yZdwdSDUC9_I9sVUqpyDfIXPAZ3/view?usp=sharing" target="_blank">instances</a> collections.

### import downloaded collections 
```
 mongoimport --host <mongodb uri string> --db <db_name> --type json --file <path/to/downloaded/files> --jsonArray --authenticationDatabase admin --ssl --username <username> --password <password> --collection <collection name>
```

### clone current repo and install dependencies 
```
git clone https://github.com/acdmft/peertuber-back.git
cd peertuber-back 
npm install
// to start server 
node server
```

### create  .env file in the root directory and put inside following variables
```
PORT=5000
MONGO_URI=<mongodb uri>
SERVER_CODE=<secret code>
ALLOWED_URL=http://localhost:3000 // client application url
```

### Contact me 

<h3> Contact me</h3>
Linked In : https://www.linkedin.com/in/andrei-zheksim/
