const { MongoClient} = require("mongodb");
//use in production
const url            = 'mongodb://mongo:27017/';

//use in development
// const url            = 'mongodb://localhost:27017/';
let db               = null;

//create mongo client
const client = new MongoClient(url);

(async function run(){
  //connect to client and 'myProject' db
  await client.connect();
  db = client.db('bad_bank');
  console.log('Connected successfully to server')
})();

function create(uid, name, email, password, isAdmin){
  return new Promise((resolve, reject) => {
    (()=> {
      const collection = db.collection('users');
      const doc = {uid, name, email, password, isAdmin, ballance: 0};
      try{
        let insert = collection.insertOne(doc);
        resolve(insert);
      }catch{
        reject('Failed to insert document!');
      }
      console.log('Inserted document');
    })()
  })
}

function updateBalance(uid, newBalance){
  return new Promise((resolve, reject) => {
    (()=> {
      const collection = db.collection('users');
      try{
        let update = collection.updateOne(
          {uid: uid},
          {
            $set: {'ballance': newBalance}
          }
        );
        resolve(newBalance);
      }catch{
        reject('Failed to update balance!');
      }
      console.log('Updated balance');
    })()
  })
}

function all(uid){
  var user = '';
  return new Promise((resolve, reject) => {
    (async ()=> {
      try{
        const customers = await db
        .collection('users')
        .find()
        .toArray();
        if(uid !== "allData"){
          customers.forEach(ele => {
            if(ele.uid === uid){
              user = ele;
            }
          })
          resolve(user);
        }else{
          resolve(customers);
        }
      }catch{
        reject('Failed to get documents!')
      }
      
        
      
    })()
  })
}

module.exports = {create, updateBalance, all};