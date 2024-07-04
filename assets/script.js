
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
  var geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch (geoCodeURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if(!data[0]){
        console.error('location not found');
      } else {
        var { lat, lon } = data[0];
        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

        fetch(weatherApiUrl)
          .then(function(res) {
            return res.json();
          })
          .then(function (weather) {
            renderCurrentWeatherCard(weather);
            renderForecastCards(weather);
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
// function fetchFiveDayData(searchValue) {
//   var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

//   fetch(geoCodeURL) 
//     .then(function(res) {
//       return res.json();
//     })
//     .catch(error => {
//       console.log("Error fetching 5 day weather", error);
//     });
//     console.log("5 day weather");
// };


//  Create Current Weather Card
function renderCurrentWeatherCard(weatherData) {
  currentCard.innerHTML = '';
  console.log(weatherData);

  if (!weatherData) {
    console.error('Error: Weather data is missing or invalid.');
    return;
  }
  var todayDate = dayjs().format('MM/DD/YYYY');
  var city = weatherData.city.name;
  var temp = weatherData.list[0].main.temp;
  var humidity = weatherData.list[0].main.humidity;
  var wind = weatherData.list[0].wind.speed;

  // Card
  var resultCard = document.createElement('div');
  resultCard.classList.add('result-card');

  // Card body
  var resultCardBody = document.createElement('div');
  resultCardBody.classList.add('result-card-body');

  // Card title
  var resultCity = document.createElement('h4');
  var resultDate = document.createElement('h5');
  resultCity.textContent = city;
  resultDate.textContent = todayDate;

  // Temp
  var resultTemp = document.createElement('p');
  resultTemp.textContent = 'Temperature: ' + temp + '° F';

  // Humidity
  var resultHumidity = document.createElement('p');
  resultHumidity.textContent = 'Humidity: ' + humidity + "%";


  // Wind
  var resultWind = document.createElement('p');
  resultWind.textContent = 'Wind: ' + wind + ' MPH';

  resultCardBody.append(resultCity, resultDate, resultTemp, resultHumidity, resultWind);
  resultCard.appendChild(resultCardBody);
  currentCard.appendChild(resultCard);
  currentCard.classList.remove('d-none');
}

//  Create 5-day Forecast Cards
function createForecastCards(weatherData) {
  // clear previous forecast info upon search
  forecastCards.innerHTML = '';
  console.log(weatherData);

  for (i = 0; i < weatherData.length; i++) {
    var firstDay = dayjs().add(1, 'day').startOf('day');

    var forecastDate = dayjs().format('MM/DD/YYYY');
    var forecastTemp = weatherData.list[i].main.temp;
    var forecastHumidity = weatherData.list[i].main.temp;
    var forecastWind = weatherData.list[i].wind;

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
    forecastCardTitle.setAttribute('class', 'card-title text-white ml-3 mt-2');
    forecastCardTitle.textContent = `${forecastDate}`;

    // Card body
    var forecastCardBody = document.createElement('div');
    forecastCardBody.setAttribute('class', 'card-text text-white ml-3');
    forecastCardBody.setAttribute('id', 'forcastData');
    forecastCardBody.append(forecastCardTitle, forecastCardTemp, forecastCardHumidity, forecastCardWind)

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
    forecastCards.classList.remove('d-none');

    console.log(data, 'Created 5 day cards');
  }
  
}

//  Render 5-day Forecast Cards
function renderForecastCards(forecast) {
  forecastCards.innerHTML = '';

  console.log(forecast);


  var headerContainer = document.createElement('div');
  headerContainer.setAttribute('class', 'col-12');

  var headerTitle = document.createElement('h2');
  headerTitle.textContent = '5 Day Forecast';

  headerContainer.append(headerTitle);
  forecastCards.classList.remove('d-none');
  forecastCards.append(headerContainer);
 
  for (var i = 1; i < forecast.length; i += 8) {
    var firstDay = dayjs().add(1, 'day').startOf('day');
    var lastDay = dayjs().add(6, 'day').startOf('day');
    if (forecast[i].dt >= firstDay && forecast[i].dt < lastDay) {
      console.log(forecast[i]);
      console.log('renderForecastCards loop');
      createForecastCards(forecast[i]);
    }
  }
}




//  Handle Form Submission
function handleFormSubmit(event) {
  
  event.preventDefault();
  var searchValue = cityInputEl.value.trim(); 
  fetchCurrentWeatherData(searchValue);
  
    // .then(res => {
    //   renderCurrentWeatherCard(res);
    // })
  //  .then(res => displaySearchHistory(res))
  //  .then(() => searchValue.value = "");
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
