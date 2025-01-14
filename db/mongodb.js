const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// console.log(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = {
  client,
  run,
};






















































// let client;
// let usersCollection;
// let transactionsCollection;

// async function connectToDatabase() {
//   if (client && client.topology && client.topology.isConnected()) {
//     return { usersCollection, transactionsCollection };
//   }

//   try {
//     client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//       // Add these options for better performance in serverless environments
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       maxPoolSize: 10, // Adjust based on your needs
//     });

//     await client.connect();
//     console.log("Connected to MongoDB");

//     const database = client.db("bank");
//     usersCollection = database.collection("users");
//     transactionsCollection = database.collection("transactions");

//     return { usersCollection, transactionCollection };
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     throw error;
//   }
// }

// async function getUsersCollection() {
//   const { usersCollection } = await connectToDatabase();
//   return usersCollection;
// }

// async function getTransactionsCollection() {
//   const { transactionsCollection } = await connectToDatabase();
//   return transactionsCollection;
// }

// async function closeConnection() {
//   if (client) {
//     await client.close();
//     console.log("MongoDB connection closed");
//   }
// }

// module.exports = {
//   getUsersCollection,
//   getTransactionsCollection,
//   closeConnection,
//   ObjectId,
// };
