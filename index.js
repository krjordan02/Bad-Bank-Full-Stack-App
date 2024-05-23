const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(cors());

app.get('/account/create/:name/:email/:password', (req,res)=>{
  res.send({
    names:    req.params.name,
    email:    req.params.email,
    password: req.params.password
  });
});

app.get('/account/login/:email/:password', (req,res)=>{
  res.send({
    email:    req.params.email,
    password: req.params.password
  });
});

app.get('/account/all', (req,res)=>{
  res.send({
    names:    'Keegan',
    email:    'keegan@gmail.com',
    password: 'secret'
  });
});

var port = 3000;

app.listen(port, ()=>{
  console.log('Listening on port 3000');
});