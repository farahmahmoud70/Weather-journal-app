/* Global Variables */
let feelingsText = "",
  zipCode = "";
const apikey = "<YOUR_API_KEY>";  // please use your api key
const unit = "metric"; //Celcius - please change the unit to imperial' if you want to see the result in Fahrenheit
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//#region Create Request Methods (GET, POST, ...)

// get method
const getCurrentWeather = async (baseUrl, zipCode, apiKey) => {
  // const res = await fetch(`${baseUrl}?zip=${zipCode},eg&appid=${apiKey}`);
  const res = await fetch(
    `${baseUrl}?zip=${zipCode},us&appid=${apiKey}&units=${unit}`
  );
  // const res = await fetch(
  //   `  https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=4c316255a236ffdf1254d3d6189eb66c`
  // );

  try {
    const newData = await res.json();
    return newData.main.temp;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//get method
const updateUI = async () => {
  const response = await fetch("/getMostRecentEntry");
  try {
    const mostRecentEntry = await response.json();
    document.getElementById("date").innerHTML = `Date: ${mostRecentEntry.date}`;
    document.getElementById("temp").innerHTML = `Temp:  ${
      mostRecentEntry.temp
    } ${unit === "metric" ? "°C" : "°F"} `;
    document.getElementById(
      "content"
    ).innerHTML = `Content: ${mostRecentEntry.content}`;
  } catch (error) {
    console.log("error", error);
  }
};

// post method
const postData = async (url = "", projectData = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(projectData) // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//#endregion Create Request Methods (GET, POST, ...)

//#region Handle Functions

const onClickActions = async () => {
  // get the current temperature from openweathermap
  const currTemp = await getCurrentWeather(baseUrl, zipCode, apiKey);

  // set user data into the server
  postData("/addWeather", {
    temp: currTemp,
    date: newDate,
    content: feelingsText
  });

  // update the UI with the user data
  updateUI();
};

//#endregion Handle Functions

//#region Handle Event Listeners

document.getElementById("generate").addEventListener("click", onClickActions);

document.getElementById("feelings").addEventListener("change", e => {
  feelingsText = e.target.value.trim();
});

document.getElementById("zip").addEventListener("change", e => {
  zipCode = e.target.value.trim();
});

//#endregion Handle Event Listeners
