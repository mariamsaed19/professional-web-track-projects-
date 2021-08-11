
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require("express");
const cors= require("cors");
const bodyParser=require("body-parser");
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//set listening port
const port = 8585;
// Setup Server
const server= app.listen(port,listening);
function listening(){
    console.log(`running on port ${port}`);
}

// GET 
app.get('/all',function(req,res){
    res.send(projectData);
})

//POST
app.post("/generate",saveData);
function saveData(req,res){    
    projectData={
        temp : req.body.temp,
        date : req.body.date,
        userResponse : req.body.userRes
    }
    res.send(projectData)
}