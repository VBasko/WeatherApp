/*----------- Display current day of week and time --------------*/
function currentTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let dayAndTime = document.querySelector("#day-and-time");
  dayAndTime.innerHTML = `${day} ${hours}:${minutes}`;
}

/*----------- Display searching city and weather --------------*/

/*----------- Choose an icon from Iconify -------*/

function choosePicture(icon) {
  let pic = "";
  switch (icon) {
    case "01d":
      pic = `<span class="iconify" data-icon="wi:day-sunny" id="icon"></span>`;
      break;
    case "01n":
      pic = `<span class="iconify" data-icon="wi:night-clear" id="icon"></span>`;
      break;
    case "02d":
      pic = `<span class="iconify" data-icon="wi:day-cloudy" id="icon"></span>`;
      break;
    case "02n":
      pic = `<span class="iconify" data-icon="wi:night-cloudy" id="icon"></span>`;
      break;
    case "03d":
      pic = `<span class="iconify" data-icon="wi:cloud" id="icon"></span>`;

      break;
    case "03n":
      pic = `<span class="iconify" data-icon="wi:cloud" id="icon"></span>`;

      break;
    case "04d":
      pic = `<span class="iconify" data-icon="wi:cloudy" id="icon"></span>`;

      break;
    case "04n":
      pic = `<span class="iconify" data-icon="wi:cloudy" id="icon"></span>`;

      break;
    case "09d":
      pic = `<span class="iconify" data-icon="wi:showers" id="icon"></span>`;

      break;
    case "09n":
      pic = `<span class="iconify" data-icon="wi:showers" id="icon"></span>`;

      break;
    case "10d":
      pic = `<span class="iconify" data-icon="wi:day-rain-mix" id="icon"></span>`;

      break;
    case "10n":
      pic = `<span class="iconify" data-icon="wi:night-rain-mix" id="icon"></span>`;

      break;
    case "11d":
      pic = `<span class="iconify" data-icon="wi:day-lighting" id="icon"></span>`;

      break;
    case "11n":
      pic = `<span class="iconify" data-icon="wi:night-lighting" id="icon"></span>`;

      break;
    case "13d":
      pic = `<span class="iconify" data-icon="wi:snowflake-cold" id="icon"></span>`;

      break;
    case "13n":
      pic = `<span class="iconify" data-icon="wi:snowflake-cold" id="icon"></span>`;

      break;
    case "50d":
      pic = `<span class="iconify" data-icon="wi:day-fog" id="icon"></span>`;

      break;
    case "50n":
      pic = `<span class="iconify" data-icon="wi:night-fog" id="icon"></span>`;

      break;
  }
  return pic;
}

/*----------- Show real weather ------------*/
let apiKey = "4c6e3574ee40805d6cf2ed08e07f518d";
let units = "metric";
let apiUrlStaticPart = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrl = `${apiUrlStaticPart}q=batumi&appid=${apiKey}&units=${units}`;
let currentTemperature = document.querySelector("#current-temperature");
let currentHumidity = document.querySelector("#humidity");
let currentWind = document.querySelector("#wind");
let currentCity = document.querySelector("#current-city");
let currentWeatherDescription = document.querySelector("#description");
let iconElement = document.querySelector("#weather-icon");

axios.get(apiUrl).then(displayWeather);

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastArray = response.data.daily;
  console.log(forecastArray);
  let forecastArea = document.querySelector("#forecast-area");

  let forecastCard = "";

  forecastArray.forEach(function (day, index) {
    if (index < 5) {
      let icon = choosePicture(day.weather[0].icon);
      forecastCard =
        forecastCard +
        `
      <div class="forecast-card">
        <p class="day-of-week">${formatDate(day.dt)}</p>
          ${icon}
        <p class="weather">${Math.round(day.temp.max)}° / ${Math.round(
          day.temp.min
        )}°</p>
      </div>
    `;
    }
  });

  forecastArea.innerHTML = forecastCard;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  currentTime();
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = `${cityName}`;
  currentTemperature.innerHTML = `${temp}`;
  currentHumidity.innerHTML = `${humidity}`;
  currentWind.innerHTML = `${wind}`;
  currentWeatherDescription.innerHTML = `${description}`;
  iconElement.innerHTML = `${choosePicture(icon)}`;

  getForecast(response.data.coord);
}
/*-----x------ Show real weather -------x-----*/

function refreshHeaderSearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input");

  if (inputCity.value) {
    let city = inputCity.value;

    /*----------- Making a request --------------*/
    let apiUrl = `${apiUrlStaticPart}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);

    /*-----x------ Making a request --------x------*/
  }

  searchingForm.reset();
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", refreshHeaderSearch);

/*----------- Get current location and change city --------------*/
function useCurrentCity(location) {
  let cityName = location.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityName}`;
}

function showPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiUrl = `${apiUrlStaticPart}lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrl).then(useCurrentCity);
}

function useCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", useCurrentPosition);

/*----------- Choosing Units --------------
let celsiusTemperature = null;

let celsius = document.querySelector("#celcius");
let farhenheit = document.querySelector("#farhenheit");

----------- Convert to Farhenheit --------------
function convertToFarhenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  farhenheit.classList.add("active");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

farhenheit.addEventListener("click", convertToFarhenheit);

----------- Convert to Celsius --------------
function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  farhenheit.classList.remove("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

celsius.addEventListener("click", convertToCelsius);
*/
