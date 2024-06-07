
var APIKey = "cbc00e00ddc9ea240d4e40b6ebc3d6f6";
var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={APIKey}&units=imperial";

var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-input');
var searchButton = document.querySelector('#search-button');
var searchHistoryEl = document.querySelector('#search-history');

var forecastCards = document.querySelector('#forecast-cards');
var cityName = document.querySelector('#city-name');

var currentWeather = document.querySelector('.current-weather');
var inputGroup = document.querySelector('.input-group');

var cityList = [];
var searchHistory = [];

var URL = 'https://api.openweathermap.org/data/2.5/weather?q=tampa&appid=cbc00e00ddc9ea240d4e40b6ebc3d6f6';


//  Check if search history exists when page loads
initHistory();

// Debuggin Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  var userFormEl = document.querySelector('#user-form');
  var cityInputEl = document.querySelector('#city-input');
  var searchButton = document.querySelector('#search-button');

  userFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var searchValue = cityInputEl.value.trim();
    fetchCurrentWeatherData(searchValue);
    cityInputEl.value = '';
  });

  searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    var searchValue = cityInputEl.value.trim();
    fetchCurrentWeatherData(searchValue);
    cityInputEl.value = '';
  });
});

//  Add Event Listeners
//document.addEventListener('submit', handleFormSubmit);
//searchButton.addEventListener('click', handleSearchButtonClick);
//displaySearchHistory.addEventListener('click', handleStoredCityClick);

//  Fetch current weather based on user input
 function fetchCurrentWeatherData(searchValue) {
  console.log(searchValue);
  var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch(geoCodeURL)
    .then(res => {
      if(!res.ok) {
        throw new Error('Network response not okay');
      }
      return res.json();
    })
    .then(res => {
      console.log(res);
      handleWeatherResponse(res[0], searchValue);
    })
    .catch(error => {
      console.log("Error fetching current weather", error);
    });
    console.log("Current weather");
};


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
  function handleWeatherResponse(res, searchValue, forecastData){
    console.log(searchValue);
    var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;
    fetch(geoCodeURL)
    .then(res => {
      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
      }
      return res.json();
    })
    .then(res => {
      if (!res.list || res.list.length === 0) {
        console.error("Error: No forecast data received");
        return;
      }
      console.log(res, "forecastData present");
      const cityName = res.city.name;
      renderCurrentWeatherCard(cityName, res.list[0]);
      renderForecastCards(res);
      displaySearchHistory(searchValue);
    })
    .catch(error => {
      console.error("Error handling weather responses:", error);
      // Display a user-friendly error message to the user
    });
  };

//  Create Current Weather Card
function renderCurrentWeatherCard(city, weather) {
  currentWeather.innerHTML = '';

  if (!weather || !weather.main) {
    console.error('Error: Weather data is missing or invalid.');
    return;
  }
  
  //var todayDate = dayjs().format('MM/DD/YYYY');
  var temp = weather.main.temp;
  var humidity = weather.main.humidity;
  var wind = weather.wind.speed;

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
  cardBody.append(resultCardTitle);

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

  resultCardBody.append(resultTemp, resultHumidity, resultWind);
  resultCard.append(resultCardBody);
  currentWeather.append(resultCard);

  console.log("Rendered current card");
}

//  Create 5-day Forecast Cards
function createForecastCards(data) {
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
    console.log('Created 5 day cards');
  }

}

//  Render 5-day Forecast Cards
function renderForecastCards(res) {
  forecastCards.innerHTML = '';
  for (var i = 1; i < res.length; i += 8) {
    // var date = date
    var forecastEl = createForecastCards(res.list[i], /* date */);
    forecastCards.append(forecastEl);
  } 
}

//  Handle Form Submission
function handleFormSubmit(event) {
  event.preventDefault();
  var searchValue = cityInputEl.value.trim();
  fetchCurrentWeatherData(searchValue);
  // search history func (searchValue);
  cityInputEl.value = '';
}

//  Handle Search Button click
function handleSearchButtonClick(event) {
  event.preventDefault();
  var searchValue = cityInputEl.value.trim();
  fetchCurrentWeatherData(searchValue);
  displaySearchHistory(searchValue);
  cityInputEl.value = '';
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
      listStoredCityArray()
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
function initHistory() {
  if(localStorage.getItem('cities')) {
    cityList = JSON.parse(localStorage.getItem('cities'));
    var cityIndex = cityList.length -1;
    listStoredCityArray();
    if(cityList.length !== 0) {
      fetchCurrentWeatherData(cityList[cityIndex]);
      // show search history
    }
  }
}

/*


document.addEventListener('DOMContentLoaded', function() {
  var storedCities = localStorage.getItem('cityName');

  if(storedCities !== null) {
    searchHistory = JSON.parse(storedCities);
  } else {
    searchHistory = [];
  }
});

function renderSearchedCities(){
  searchHistoryEl.innerHTML = '';

  searchHistory.forEach(function(city) {
    var prevCity = document.createElement('li');
    prevCity.setAttribute('class', 'list-group-item');
    prevCity.setAttribute('data-name', city);
    prevCity.textContent = city;
    searchHistory.append(prevCity);
  })
}

function fetchWeatherData(location) {
  var { lat, lon } = location;

  var imperialQueryURL = `https://api.openweathermap.org/data/2.5/forecast?
    lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

    return fetch(imperialQueryURL)
      .then(function (res) {
        if(!res.ok) {
          throw new Error("Response not okay");
        }
        return res.json();
      });
}


function getCityName(lat, lon, APIKey) {
  var reverseGeocodingURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKey}`;

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

function renderCurrentWeatherCard(city, weather) {
  currentWeather.innerHTML = '';
  
  var todayDate = dayjs().format('MM/DD/YYYY');
  var temp = weather.main.temp;
  var humidity = weather.main.humidity;
  var wind = weather.wind.speed;

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
  cardBody.append(resultCardTitle);

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

  resultCardBody.append(resultTemp, resultHumidity, resultWind);
  resultCard.append(resultCardBody);
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


searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  var searchHistory = JSON.parse(localStorage.getItem('cityName')) || []; 

  var cityName = inputGroup?.value?.trim() || ''; 

  if (cityName && searchHistory.indexOf(cityName) === -1) {
    searchHistory.push(cityName);
    localStorage.setItem('cityName', JSON.stringify(searchHistory));
    renderSearchedCities();
  }

  renderCurrentWeatherCard();
  renderForecastCards();

  inputGroup.value = '';
});
*/