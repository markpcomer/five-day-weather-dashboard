
var APIKey = "cbc00e00ddc9ea240d4e40b6ebc3d6f6";
var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={APIKey}&units=imperial";

var userFormEl = document.querySelector('#search-button');
var cityInputEl = document.querySelector('#city-input');
var searchButton = document.querySelector('#search-button');
var searchHistoryEl = document.querySelector('#search-history');

var forecastCards = document.querySelector('#forecast-cards');
var cityName = document.querySelector('#city-name');

var currentCard = document.querySelector('.current-card');
var inputGroup = document.querySelector('.input-group');

var cityList = [];
var searchHistory = [];



//  Check if search history exists when page loads

// initHistory();

// Debuggin Event Listeners

// document.addEventListener('DOMContentLoaded', function() {

//   userFormEl.addEventListener('submit', function(event) {
//     event.preventDefault();
//     var searchValue = cityInputEl.value.trim();
//     fetchCurrentWeatherData(searchValue);
//     cityInputEl.value = '';
//   });

//   searchButton.addEventListener('click', function(event) {
//     event.preventDefault();
//     var searchValue = cityInputEl.value.trim();
//     fetchCurrentWeatherData(searchValue);
//     fetchFiveDayData(searchValue);
//     cityInputEl.value = '';
//   });
// });




//  Fetch current weather based on user input
function fetchCurrentWeatherData(searchValue) {
  console.log("fetch current weather", searchValue);
  var geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch (geoCodeURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data); 
      if(!data[0]){
        console.error('location not found');
      } else {
        var { lat, lon } = data[0];
        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

        fetch(weatherApiUrl)
          .then(function(res) {
            return res.json();
          })
          .then(function (weatherData) {
            console.log("weather data", weatherData);
            renderCurrentWeatherCard(weatherData);

          })
          .catch(function (error) {
            console.error('Error in inner fetch', error);
          })

      }
    })
    .catch(function (err) {
      console.error('Error in outer fetch', err);
    })
}

//  Fetch 5-day forecast 
function fetchFiveDayData(searchValue) {
  var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch(geoCodeURL) 
    .then(function(res) {
      return res.json();
    })
    .catch(error => {
      console.log("Error fetching 5 day weather", error);
    });
    console.log("5 day weather");
};

//  Handle fetch responses
// function handleWeatherResponse(city, weatherData){
//     if (weatherData && weatherData.list && weatherData.list.length > 0){
//       renderCurrentWeatherCard(city, weatherData.list[0]);
//       renderForecastCards(city, weatherData.list);
//     } else {
//       console.error("Error: No weather data received");
//     }
// };

//  Create Current Weather Card
function renderCurrentWeatherCard(weatherData) {
  console.log(weatherData);
  currentCard.innerHTML = '';

  if (!weatherData) {
    console.error('Error: Weather data is missing or invalid.');
    return;
  }
  console.log(weatherData.city.name);
  //var todayDate = dayjs().format('MM/DD/YYYY');
  var city = weatherData.city.name;
  var temp = weatherData.list[0].main.temp;
  var humidity = weatherData.list[0].main.humidity;
  var wind = weatherData.list[0].wind.speed;

  // Card
  var resultCard = document.createElement('div');
  //resultCard.setAttribute('class', 'result-card');
  resultCard.classList.add('result-card');

  // Card body
  var resultCardBody = document.createElement('div');
  // resultCardBody.setAttribute('class', 'result-card-body');
  resultCardBody.classList.add('result-card-body');

  // Card title
  //var resultCardTitle = document.createElement('h3');
  //resultCardTitle.setAttribute('class', 'h3 result-card-title');
  //resultCardTitle.textContent = `${city}`;
  var resultCity = document.createElement('h3');
  resultCity.textContent = city;

  // Temp
  var resultTemp = document.createElement('p');
  // resultTemp.setAttribute('class', 'result-temp');
  resultTemp.textContent = 'Temperature: ' + temp;

  // Humidity
  var resultHumidity = document.createElement('p');
  //resultHumidity.setAttribute('class', 'result-humidity');
  resultHumidity.textContent = 'Humidity: ' + humidity;


  // Wind
  var resultWind = document.createElement('p');
  //resultWind.setAttribute('class', 'result-wind');
  resultWind.textContent = 'Wind: ' + wind;

  resultCardBody.append(resultCity, resultTemp, resultHumidity, resultWind);
  resultCard.appendChild(resultCardBody);
  currentCard.appendChild(resultCard);
  currentCard.classList.remove('d-none');

  console.log("Rendered current card");
}

//  Create 5-day Forecast Cards
function CreateForecastCards(data) {
  // clear previous forecast info upon search
  forecastCards.innerHTML = '';

  for (var i = 6; i < data.list.length; i += 8) {
    // var forecastDate = moment(data.list[i].dt_txt).format("MM/DD/YYYY");
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
    console.log('Created 5 day cards');
  }
}

//  Render 5-day Forecast Cards
function renderForecastCards(res) {
  forecastCards.innerHTML = '';
  for (var i = 1; i < res.length; i++) {
    // var date = date
    var forecastEl = createForecastCards(res.list[i], /* date */);
    forecastCards.append(forecastEl);
  } 
}


//  Handle Form Submission
function handleFormSubmit(event) {
  
  event.preventDefault();
  console.log("handle form submit");
  var searchValue = cityInputEl.value.trim(); 
  console.log("searchValue", searchValue);
  fetchCurrentWeatherData(searchValue);
  
    // .then(res => {
    //   renderCurrentWeatherCard(res);
    // })
  //  .then(res => displaySearchHistory(res))
  //  .then(() => searchValue.value = "");

    console.log("Enter a city name");
  }
  

//  Handle Stored City Button click
function handleStoredCityClick(event) {
  event.preventDefault();
  var searchValue = cityInputEl.value.trim();
  fetchCurrentWeatherData(searchValue);
  displaySearchHistory(searchValue);
  cityInputEl.value = '';
}


// Display and save search history
function displaySearchHistory(searchValue) {
  if(searchValue){
    if(cityList.indexOf(searchValue) == -1) {
      cityList.push(searchValue);
      listStoredCityArray();
    } else {
      var updateItem = cityList.indexOf(searchValue);
      cityList.splice(updateItem, 1);
      cityList.push(searchValue);
      listStoredCityArray();
    }
  }
}

// List the array into the search history sidebar
function listStoredCityArray() {
  displaySearchHistory.innerHTML = '';
  cityList.forEach(function(city){
    var storedCity = document.createElement('li');
    storedCity.setAttribute('class', 'list-group-item city-button');
    storedCity.dataset.value = city;
    storedCity.textContent = `${city}`;
    searchHistoryEl.append(storedCity);
  });
  localStorage.setItem('cities', JSON.stringify(cityList));
};

//  Initialize Search History
function initHistory(searchValue) {
  if(localStorage.getItem('cities')) {
    cityList = JSON.parse(localStorage.getItem('cities'));
    var cityIndex = cityList.length -1;
    console.log("City List:", cityList); 
    console.log("City Index:", cityIndex);
    listStoredCityArray();
    if(cityList.length !== 0) {
      fetchCurrentWeatherData(searchValue, function(res) {
        renderCurrentWeatherCard(res);
      });
    }
  }
}


searchButton.addEventListener('click', handleFormSubmit);
