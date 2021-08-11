/* Global Variables */
let baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey="&APPID=60c5a85a6719da625bec2509d2fffa0e&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
const zipCode = document.querySelector('#zip'); //get element holding zip code
const dateElem = document.querySelector('#date');  // element that will hold date
const tempElem = document.querySelector('#temp');  // element that will hold tempreature
const contentElem = document.querySelector('#content'); // element that will hold user feeling
const feelingArea = document.querySelector('#feelings'); // element holding user feeling

function generate(){
  let zip =zipCode.value //get value of zip code
  if(zip =='' || zip==undefined || zip ==null){ // user doesn't enter anything
    return;
  }
    getTemperature(baseUrl,zip, apiKey) 
    .then(function(data){
      if(data.cod!=200){ //zip code doesn't exist
        return alert(data.message) //allert user
      }
      // post request to the server
      postData("/generate",{"temp" : data.main.temp , "date" : newDate , "userRes": (feelingArea.value==undefined)? " ":feelingArea.value});
    })
    .then ( function(newData){
 
      updateInterface(); //update ui elements
    });
}



  const getTemperature = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key) //fetch data from api
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
      
    }
  }

 //post request
  const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( data )
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };


 //update ui and reset input fields
  const updateInterface = async()=>{
    const request = await fetch('/all');
    try {
   
      const data = await request.json()
      dateElem.innerHTML=`Date : ${data.date}`
      tempElem.innerHTML=`Temp : ${data.temp}`
      contentElem.innerHTML=`User Feeling : ${data.userResponse}`

      //reset input fields
      feelingArea.value="";
      zipCode.value="";
    }
    catch (error) {
      console.log("error", error);
    }
  }
  