const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dal = require('./dal.js');
const auth = require('./auth.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'BadBank API',
      version: '1.0.0'
    }
  },
  apis: ['index.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
* @swagger
*paths:
*  /account/create/{uid}/{name}/{email}/{password}/{isAdmin}:
*    get:
*      summary: Creates a new user.
*      parameters:
*        - in: path
*          name: uid
*          type: string
*          required: true
*          description: Uid provided by firebase authentication.
*        - in: path
*          name: name
*          type: string
*          required: true
*          description: User's name.
*        - in: path
*          name: email
*          type: string
*          required: true
*          description: User's email.
*        - in: path
*          name: password
*          type: string
*          required: true
*          description: User's password.
*        - in: path
*          name: isAdmin
*          type: boolean
*          required: true
*          description: Defines if a user is or is not an admin.
*      responses:
*        200:
*          description: Success
*/

//create account
app.get('/account/create/:uid/:name/:email/:password/:isAdmin', (req,res)=>{
  dal.create(req.params.uid, req.params.name, req.params.email, req.params.password, req.params.isAdmin)
  .then((user) => {
    console.log(user);
    res.send(user);
  })
});

/**
* @swagger
*paths:
*  /account/updateBalance/{uid}/{newBalance}/:
*    get:
*      summary: Updates a users balance.
*      parameters:
*        - in: path
*          name: uid
*          type: string
*          required: true
*          description: User's uid.
*        - in: path
*          name: newBalance
*          type: number
*          required: true
*          description: The updated balance.
*      responses:
*        200:
*          description: Success
*/

//update balance
app.get('/account/updateBalance/:uid/:newBalance/', (req,res)=>{
  // let uid = auth.authenticateToken(req.params.token);
  // console.log(uid);
  dal.updateBalance(req.params.uid, req.params.newBalance)
  .then((update) => {
    //console.log('Collection: ' + JSON.stringify(docs));
    res.send(update);
  })
});

/**
* @swagger
*paths:
*  /account/all/{uid}:
*    get:
*      summary: Gets a account info for all or one user.
*      parameters:
*        - in: path
*          name: uid
*          type: string
*          required: true
*          description: User's uid.  Submit 'allData' to get all user data.
*      responses:
*        200:
*          description: Success
*/

//get account info
app.get('/account/all/:uid', (req,res)=>{
  // let uid = auth.authenticateToken(req.params.token);
  // console.log(uid);
  console.log(req.params.uid);
  dal.all(req.params.uid)
  .then((docs) => {
    //console.log('Collection: ' + JSON.stringify(docs));
    res.send(docs);
  })
});

const sample = () => "Test";

var port = 3000;
app.listen(port, ()=>{
  console.log('Listening on port 3000!');
});

exports.sample = sample;