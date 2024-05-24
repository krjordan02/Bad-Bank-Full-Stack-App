const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const dal = require('./dal.js')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(cors());

app.get('/account/create/:name/:email/:password', (req,res)=>{
  dal.create(req.params.name, req.params.email, req.params.password)
  .then((user) => {
    console.log(user);
    res.send(user);
  })
  //res.send('what!')
});

app.get('/account/all', (req,res)=>{
  dal.all()
  .then((docs) => {
    console.log(docs);
    res.send(docs);
  })
});

var port = 3000;
app.listen(port, ()=>{
  console.log('Listening on port 3000!');
});
