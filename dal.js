const { MongoClient} = require("mongodb");
const url            = 'mongodb://localhost:27017/';
let db               = null;

//create mongo client
const client = new MongoClient(url);

(async function run(){
  //connect to client and 'myProject' db
  await client.connect();
  db = client.db('myProject');
  console.log('Connected successfully to server')
})();

function create(name, email, password){
  return new Promise((resolve, reject) => {
    (()=> {
      const collection = db.collection('users');
      const doc = {name, email, password, ballance: 0};
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

function all(){
  return new Promise((resolve, reject) => {
    (async ()=> {
      try{
        const customers = await db
        .collection('users')
        .find()
        .toArray();
        resolve(customers);
      }catch{
        reject('Failed to get documents!')
      }
      
        
      
    })()
  })
}

module.exports = {create, all};