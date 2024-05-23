const { MongoClient, ServerApiVersion } = require("mongodb");
const url = 'mongodb://localhost:27017/';

//create mongo client
const client = new MongoClient(url);

async function run(){
  try{
    //connect to client
    await client.connect();

    // Connect to the "test project" database and access its "customers" collection
    const dbName = "testProject";
    const db = client.db(dbName);
    var collection = db.collection('customers');

    //create user to insert
    var name = 'Keegan' + Math.floor(Math.random()*10000);
    var email = name + '@gmail.com';
    var doc = {name, email};

    //inset doc
    const result = await collection.insertOne(doc)
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    //find document
    const find = await collection.findOne(doc);
    console.log(find);

    //get and print all documents in the "customers" collection
    var customers = await db
      .collection('customers')
      .find()
      .toArray();

  }finally{
    //close client connection
    await client.close();
  }
}

//run and print any errors
run().catch(console.dir);