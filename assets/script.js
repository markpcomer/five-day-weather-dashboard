
var APIKey = "cbc00e00ddc9ea240d4e40b6ebc3d6f6";
var newAPIKey= "20ef3ea6758a437fd090faae1ef08152";
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={newAPIKey}`;
var cities = [];
var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={API key}&units=imperial";

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var searchButtonEl = document.querySelector('#search-button');
var searchHistory = document.querySelector('#search-history');
var forecastCards = document.querySelector('#forecast-cards');
var cityName = document.querySelector('#city-name');

var currentWeather = document.querySelector('#current-weather');


function fetchWeatherData(cityName) {
  var { lat } = location;
  var { lon } = location;
  var cityName = city.name;

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

function getCityName(lat, lon, newAPIKey) {
  var reverseGeocodingURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${newAPIKey}`;

  return fetch(reverseGeocodingURL)
      .then(function(res) {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();
      })
      .then(function(data) {
          if (data && data.length > 0) {
              return data[0].name;
          } else {
              throw new Error('No city found for the provided coordinates.');
          }
      })
      .catch(function(error) {
          throw error;
      });
}

function renderCurrentWeatherCard(data) {
  currentWeather.innerHTML = '';
  
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

  currentWeather.append(resultCard);
}

function displayCurrentWeather(cityName) {
  fetchWeatherData(cityName)
    .then(renderCurrentWeatherCard)
    .catch(function (err) {
      console.log("Error", err);
    })
}

function renderForecastCards(data) {
  // clear previous forecast info upon search
  forecastCards.innerHTML = '';

  for (var i = 6; i < data.list.length; i += 8) {
    var forecastDate = moment(response.list[i].dt_txt).format("MM/DD/YYYY");
    var forecastTemp = data.list[i].main.temp;
    var forecastHumidity = data.list[i].main.temp;
    var forecastWind = data.list[i].wind;

    // 5 cards
    var forecastGroup = document.createElement('div');
    forecastGroup.setAttribute('class', 'col-md-2');
    forecastGroup.append(forecastCard);

    // Card
    var forecastCard = document.createElement('div');
    forecastCard.setAttribute('class', 'card bg-primary');
    forecastCard.append(forecastCardBody);
    
    // Card title
    var forecastCardTitle = document.createElement('h5');
    forecastCardTitle.setAttribute('class', ' card-title text-white ml-3 mt-2');
    forecastCardTitle.textContent = `${forecastDate}`;

    // Card body
    var forecastCardBody = document.createElement('div');
    forecastCardBody.setAttribute('class', 'card-text text-white ml-3');
    forecastCardBody.setAttribute('id', 'forcastData');
    forecastCardBody.append(forecastCardTitle, forecastCardTemp, rforecastCardHumidity, forecastCardWind)

    // Temp
    var forecastCardTemp = document.createElement('p');
    forecastCardTemp.setAttribute('class', 'forecast-temp');
    forecastCardTemp.textContent = `${forecastTemp}`;

    // Humidity
    var forecastCardHumidity = document.createElement('p');
    forecastCardHumidity.setAttribute('class', 'forecast-humidity');
    forecastCardHumidity.textContent = `${forecastHumidity}`;

    // Wind
    var forecastCardWind = document.createElement('p');
    forecastCardWind.setAttribute('class', 'forecast-wind');
    forecastCardWind.textContent = `${forecastWind}`;

    forecastCards.append(forecastGroup);
  }

}