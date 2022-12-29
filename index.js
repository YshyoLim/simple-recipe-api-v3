const express = require("express")
const cors = require("cors")
const mongodb = require("mongodb")
const ObjectId = require("mongodb").ObjectId
const MongoClient = mongodb.MongoClient
const dotenv = require("dotenv")
dotenv.config();

let app = express();
app.use(express.json())
app.use(cors())

async function connect(){
    const mongo_url = process.env.MONGO_URI
    let client = await MongoClient.connect(mongo_url, {
        "useUnifiedTopology": true
    })

    let databaseName = "fake_recipes"
    let db = client.db(databaseName)
    console.log(`database connect: ${databaseName}`)

}

async function main(){
    let db = await connect();

    app.get('/recipes', async(req, res)=>{
        let recipes = await db.collection('recipes').find().toArray();
        res.json();
    })
}

main()

app.listen(process.env.PORT || 8888, ()=>{
    console.log(`Server started..listing to PORT 8888`)
})