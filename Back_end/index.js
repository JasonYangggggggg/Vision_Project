var Express = require("express");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;
const multer = require("multer");
var cors = require("cors");
const bodyParser = require("body-parser");
const Photo_model = require("./PhotoModel");
mongoose.set('strictQuery', false);
var app = Express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

mongoose.connect("mongodb://localhost:27017/COEN_390_db", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Error connecting to MongoDB:', err));
const connection = ''; // apply your own cloud database -> put your cloud database link here

// save picture to the database on a picture data model
app.post("/save_photo", upload.none() ,async(req,res) => {
    try{
    const {id, name, FilePhoto} = req.body;
    const fileupload = new Photo_model({
        _id:new mongoose.Types.ObjectId(), 
        id,
        name,
        FilePhoto
    });

    await fileupload.save();
    res.status(201).json({ message: 'Photo uploaded successfully' });
    res.send(true);

    }catch(errpr){
        res.status(500).json({ message: 'Photo not upload successfully' });
        res.send(false);
    }

   

});


const databasename = 'COEN_390_DataStore';
let database;
app.listen(3001, ()=>{
    mongoClient.connect(connection, (error, client)=>{
        database = client.db(databasename);
        console.log("Connection successful");
    })
})

app.get("/getinformation", (req,res)=>{
    console.log("call get");
   database.collection(databasename).find({}).toArray((error, response)=>{
    // console.log(response);
    res.send(response);
   });
   

})

//do a route to get information from the frontend and save to backend

app.post("/savePhoto", multer().none() ,(req,res)=>{
    const { name, PhotoData, Date } = req.body;
   database.collection(databasename).insertOne({
      name: name,
      PhotoData: PhotoData,
      Date: Date

   });
   console.log("success");
   res.send("Success");
})

//delete route
app.delete("/deletedata/:id", (req,res) =>{
    const id = req.params.id;
    console.log("get delete");
    database.collection(databasename).deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).send({ error: 'Internal Server Error' });
          }
          if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Data not found' });
          }
          console.log('Data deleted successfully');
          res.send('Data deleted successfully');
       
    });
})
