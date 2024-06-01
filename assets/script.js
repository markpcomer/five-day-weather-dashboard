
var APIKey = "cbc00e00ddc9ea240d4e40b6ebc3d6f6";
var newAPIKey= "20ef3ea6758a437fd090faae1ef08152";
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={newAPIKey}`;
var cities = [];
var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=imperial";

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var searchButtonEl = document.querySelector('#search-button');
var searchHistory = document.querySelector('#search-history');
var forecastCards = document.querySelector('#future-cards');
var cityName = document.querySelector('#city-name');

var currentWeather = document.querySelector('#current-weather');


function fetchWeatherData(city) {
  var { lat } = location;
  var { lon } = location;
  var city = city.name;
  
  var imperialQueryURL = `https://api.openweathermap.org/data/2.5/forecast?
    lat=${lat}&lon=${lon}&appid=${newAPIKey}&units=imperial`;


    return fetch(imperialQueryURL)
      .then(function (res) {
        if(!res) {
          throw new Error("Response not okay");
        }
        return res.json();
      });
}

function renderCurrentWeatherCard(data) {
  var todayDate = dayjs().format('M/D/YYYY');
  var city = data.name;
  var temp = data.main.temp;
  var humidity = data.main.humidity;
  var wind = data.wind.speed;

  // Card
  var resultCard = document.createElement('div');
  resultCard.setAttribute('class', 'result-card');
  resultCard.append(resultCardBody);

  // Card title
  var resultCardTitle = document.createElement('h3');
  resultCardTitle.setAttribute('class', 'h3 result-card-title');
  resultCardTitle.textContent = `${city} ${todayDate}`;

  // Card body
  var resultCardBody = document.createElement('div');
  resultCardBody.setAttribute('class', 'result-card-body');
  cardBody.append(resultCardTitle, resultTemp, resultHumidity, resultWind);

  // Temp
  var resultTemp = document.createElement('p');
  resultTemp.setAttribute('class', 'result-temp');
  resultTemp.textContent = `${temp}`;

  // Humidity
  var resultHumidity = document.createElement('p');
  resultHumidity.setAttribute('class', 'result-humidity');
  resultHumidity.textContent = `${humidity}`;

  // Wind
  var resultWind = document.createElement('p');
  resultWind.setAttribute('class', 'result-wind');
  resultWind.textContent = `${wind}`;

  currentWeather.empty();
  currentWeather.append(resultCard);

}

function displayCurrentWeather(city) {
  fetchWeatherData(city)
    .then(renderCurrentWeatherCard)
    .catch(function (err) {
      console.log("Error", err);
    })
}


/* FIRST ATTEMPT
function fetchWeather(city) {
  var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=imperial";
  fetch(imperialQueryURL)
    .then (function (response) {
      return response.json();
    })
    .then (function (data) {
      displayCityWeather(data, city);
    })
    console.log("");
};

function fetchLocation(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + newAPIKey;

  fetch(queryURL)
    .then(function (response){
      return response.json();
    })
    .then (function (lat, lon){
      
    })
}
*/