const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dal = require('./dal.js');
const auth = require('./auth.js');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(cors());

//create account
app.get('/account/create/:uid/:name/:email/:password/:isAdmin', (req,res)=>{
  dal.create(req.params.uid, req.params.name, req.params.email, req.params.password, req.params.isAdmin)
  .then((user) => {
    console.log(user);
    res.send(user);
  })
});

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