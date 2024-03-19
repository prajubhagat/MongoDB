
var MongoClient = require("mongodb").MongoClient;

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://prajubhagat10:E8Oqv5DIGZpFkwEL@praju.pnnbnzy.mongodb.net/testdb?retryWrites=true&w=majority&appName=Praju";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    //Make the appropriate DB calls

    // await listDatabases(client);

    await insertData(client);
    // await findData(client);
    // await deleteData(client);

    // await updateData(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  console.log(JSON.stringify(databasesList));
  databasesList.databases.forEach((db) =>
    console.log(` - ${JSON.stringify(db.sizeOnDisk)}`)
  );
}

async function createDatabase(client) {
    await client.db("testdb").createCollection("customers");
  }

  async function insertData(client) {
    let dbo = await client.db("testdb");
    var myobj = { name: "Company  India", address: "Nagpur Highway 37", age: 33 };
    let data = await dbo.collection("customers").insertOne(myobj);
    console.log(data);
  }

  async function findData(client) {
    let dbo = await client.db("testdb");
    // To all data
    // let data = await dbo.collection("customers").find({}).toArray();

    // for only name and age
    // let data = await dbo.collection("customers").find({} , { projection:{ name: 1, age: 1} }).toArray();
    
    let data = await dbo.collection("customers").find({}).sort({ name: 1, age: 1 }).toArray();
    console.log("data >> ", data);
  }


  async function deleteData(client) {
    let dbo = await client.db("testdb");
    //delete one
    let data = await dbo.collection("customers").deleteOne({ name: "Company India"});
    // let data = await dbo.collection("customers").drop();
    console.log("data >> ", data);
  }

  async function updateData(client) {
    let dbo = await client.db("testdb");
    var myquery = { name: "Company  India" };
    var newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
    let data = await dbo.collection("customers").updateMany(myquery, newvalues);
    console.log("data >> ", data);
  }
  


main().catch(console.error);