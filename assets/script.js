// API Key for accessing the OpenWeatherMap API
var APIKey = "cbc00e00ddc9ea240d4e40b6ebc3d6f6";

// URL template for fetching weather data based on coordinates, using imperial units
var imperialQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid={APIKey}&units=imperial";

// DOM elements for user interface interactions
var userFormEl = document.querySelector('#search-button'); // Button for searching
var cityInputEl = document.querySelector('#city-input'); // Input field for city name
var searchButton = document.querySelector('#search-button'); // Search button
var searchHistoryEl = document.querySelector('#search-history'); // Element to display search history

var forecastCards = document.querySelector('#forecast-cards'); // Container for forecast cards
var searchValue = document.querySelector('#city-name'); // Element to show the city name

var currentCard = document.querySelector('.current-card'); // Card to display current weather
var inputGroup = document.querySelector('.input-group'); // Group for input elements

var forecastSoloContainer = document.querySelector('.forecast-solo-container'); // Container for solo forecast cards

// Arrays to store city names and search history
var cityList = [];
var searchHistory = [];

// Function to update search history in the UI and local storage
function citySearchHistory(searchValue){
  // Clear existing search history display
  searchHistoryEl.innerHTML = '';

  // Create a new container for the searched city
  var searchContainer = document.createElement('div');
  searchContainer.classList.add('past-city-container');

  // Create a paragraph element for the searched city
  var searchedCity = document.createElement('p');
  searchedCity.classList.add('past-city');
  searchedCity.textContent = searchValue; // Set text to the searched city name

  // Append the city element to the container and the container to the search history element
  searchContainer.append(searchedCity);
  searchHistoryEl.append(searchContainer);

  // Load existing search history from local storage
  if(searchHistory.length > 0) {
    var storedSearches = localStorage.getItem('searchHistory');
    searchHistory = JSON.parse(storedSearches);
  }

  // Add the new search value to the history and update local storage
  searchHistory.push(searchValue);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to load and display previously searched cities from local storage
function loadHistory() {
  var savedHistory = localStorage.getItem('searchHistory');
  if(!savedHistory) {
    return false; // Exit if no history is found
  }
  
  // Parse the saved history and display each search
  savedHistory = JSON.parse(savedHistory);
  savedHistory.forEach(function(searchValue) {
    citySearchHistory(searchValue); // Display each city in the history
  });
}

// Function to fetch current weather data based on user input
function fetchCurrentWeatherData(searchValue) {
  // Create URL for geocoding the city name to get coordinates
  var geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch(geoCodeURL) // Fetch the geocode data
    .then(function (res) {
      return res.json(); // Convert response to JSON
    })
    .then(function (data) {
      if(!data[0]){ // Check if location was found
        console.error('location not found');
      } else {
        // Destructure latitude and longitude from the first result
        var { lat, lon } = data[0];
        // Create URL for fetching weather data using the coordinates
        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

        fetch(weatherApiUrl) // Fetch the weather data
          .then(function(res) {
            return res.json(); // Convert response to JSON
          })
          .then(function (weather) {
            renderCurrentWeatherCard(weather); // Render current weather
            citySearchHistory(searchValue); // Update search history
          })
          .catch(function (error) {
            console.error('Error in inner fetch', error); // Handle errors
          });

      }
    })
    .catch(function (err) {
      console.error('Error in outer fetch', err); // Handle errors
    });
}

// Function to render the 5-day weather forecast cards
function renderForecastCards(searchValue) {
  forecastSoloContainer.innerHTML = ''; // Clear previous forecast cards
  var geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`;

  fetch(geoCodeURL) // Fetch the geocode data again for forecast
    .then(function (res) {
      return res.json(); // Convert response to JSON
    })
    .then(function (data) {
      if(!data[0]){ // Check if location was found
        console.error('location not found');
      } else {
        // Destructure latitude and longitude from the first result
        var { lat, lon } = data[0];
        // Create URL for fetching weather data using the coordinates
        var weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
        
        fetch(weatherApiUrl) // Fetch the weather forecast data
          .then(function(res) {
            return res.json(); // Convert response to JSON
          })
          .then(function (res) {
            // Set title for forecast cards section
            var forecastSectionTitle = document.getElementById("forecast-cards-title");
            forecastSectionTitle.textContent = "5 Day Forecast";
            
            // Loop through the forecast data to create cards for each day
            for(var i = 1; i < res.list.length; i+=8) { // Step by 8 to get daily data
              var date = dayjs(res.list[i].dt_txt).format('MM/DD/YYYY'); // Format date
              var temp = res.list[i].main.temp; // Get temperature
              var humidity = res.list[i].main.humidity; // Get humidity
              var wind = res.list[i].wind.speed; // Get wind speed

              // Create a card for each day's forecast
              var soloCard = document.createElement('div');
              soloCard.classList.add("solo-card", "rounded", "forecast-card-info");

              // Create elements for date, temperature, humidity, and wind
              var forecastDateElem = document.createElement('p');
              forecastDateElem.classList.add('forecast-date');
              forecastDateElem.textContent = date;

              var forecastTempElem = document.createElement('p');
              forecastTempElem.classList.add('forecast-temp');
              forecastTempElem.textContent = 'Temperature: ' + temp + '° F';

              var forecastHumidityElem = document.createElement('p');
              forecastHumidityElem.classList.add('forecast-humidity');
              forecastHumidityElem.textContent = 'Humidity: ' + humidity + '%';

              var forecastWindElem = document.createElement('p');
              forecastWindElem.classList.add('forecast-wind');
              forecastWindElem.textContent = 'Wind: ' + wind + ' MPH';

              // Append elements to soloCard
              soloCard.append(forecastDateElem, forecastTempElem, forecastHumidityElem, forecastWindElem);

              // Append soloCard to forecastSoloContainer
              forecastSoloContainer.appendChild(soloCard);
            }
          })
          .catch(function (error) {
            console.error('Error in inner fetch', error); // Handle errors
          });
      }
    })
    .catch(function (err) {
      console.error('Error in outer fetch', err); // Handle errors
    });
}

// Function to create and render the current weather card
function renderCurrentWeatherCard(weatherData) {
  currentCard.innerHTML = ''; // Clear existing current weather display

  if (!weatherData) {
    console.error('Error: Weather data is missing or invalid.'); // Error handling
    return;
  }
  
  // Get today's date, city name, and weather information
  var todayDate = dayjs().format('MM/DD/YYYY');
  var city = weatherData.city.name;
  var temp = weatherData.list[0].main.temp;
  var humidity = weatherData.list[0].main.humidity;
  var wind = weatherData.list[0].wind.speed;

  // Create a card for displaying the current weather
  var resultCard = document.createElement('div');
  resultCard.classList.add('result-card');

  // Card body for the weather information
  var resultCardBody = document.createElement('div');
  resultCardBody.classList.add('result-card-body');

  // Card title with city name and date
  var resultCity = document.createElement('h4');
  var resultDate = document.createElement('h5');
  resultCity.textContent = city;
  resultDate.textContent = todayDate;

  // Temperature display
  var resultTemp = document.createElement('p');
  resultTemp.textContent = 'Temperature: ' + temp + '° F';

  // Humidity display
  var resultHumidity = document.createElement('p');
  resultHumidity.textContent = 'Humidity: ' + humidity + "%";

  // Wind display
  var resultWind = document.createElement('p');
  resultWind.textContent = 'Wind: ' + wind + ' MPH';

  // Append all elements to the card body and then to the main card
  resultCardBody.append(resultCity, resultDate, resultTemp, resultHumidity, resultWind);
  resultCard.appendChild(resultCardBody);
  currentCard.appendChild(resultCard); // Add the card to the current weather section
  currentCard.classList.remove('d-none'); // Make sure the current card is visible
}

// Handle the form submission for searching weather
document.getElementById('user-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission behavior

  var searchName = document.getElementById('city-input').value.trim(); // Get the city name from input
  if (searchName === '') {
    alert("Please enter city name."); // Alert if input is empty
    e.preventDefault(); // Prevent submission
  }
  
  // Fetch and render current weather and forecast
  fetchCurrentWeatherData(searchName);
  renderForecastCards(searchName);
  citySearchHistory(searchName); // Update search history
  loadHistory(searchName); // Load history
});

// Event listener for clicking on previous search history
searchHistoryEl.addEventListener('click', function(e) {
  if (e.target.tagName === "p") { // Check if clicked element is a paragraph (searched city)
    var previousCity = e.target.textContent.trim(); // Get the text of the clicked city
    fetchCurrentWeatherData(previousCity); // Fetch weather for the clicked city
    renderForecastCards(previousCity); // Render forecast for the clicked city

    e.target.remove(); // Remove the clicked city from the history display
  }
});

// Load previous search history on page load
loadHistory();
