/* Global Variables */
const baseURL = "https://samples.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=5172e21fbf39a8392e4a840962019e86";
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to generate button
document.querySelector('#generate').addEventListener('click' , () => {
    const zipCode = document.querySelector('#zip').value;
    const userResponse = document.querySelector('#feelings').value;
    
    /*Chaining async functions to get first temperature from openweathermap API then post (that temperature + 
    current date + user respone into server endpoint then get endpoint date and use it for update UI dynamically)*/
    getTemperature(proxyurl, baseURL, zipCode, apiKey)
    .then((temp) => {
        postData('http://localhost:3000/addData', {temperature: temp, date: newDate, userResponse: userResponse })
        .then(updateUI('http://localhost:3000/all'));
    })  
});

/* Function to GET Web API Data*/
const getTemperature = async (proxyurl, baseURL, zipCode, apiKey) => {
    const res = await fetch (proxyurl + baseURL + zipCode + apiKey);
    try {
        const weatherData = await res.json();
        console.log(weatherData);
        const {main : {temp}} = weatherData; 
        return temp;
    }
    catch (error) {
        console.log("Error", error);
    }
};

/* Function to POST data */
const postData = async (url, data) => {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("Error", error);
    }
};


/* Function to GET Project Data and update UI */
const updateUI = async (url) => {
    const res = await fetch (url);
    try {
        const projectData = await res.json();
        console.log(projectData);
        document.querySelector('#date').innerHTML = "Date: " + projectData.date;
        document.querySelector('#temp').innerHTML = "Temperature: " + projectData.temperature;
        document.querySelector('#content').innerHTML = "User Response: " + projectData.userResponse;
    }
    catch (error) {
        console.log("Error", error);
    }
};