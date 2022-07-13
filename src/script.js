/*----------- Display current day of week and time --------------*/
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

/*----------- Display searching city and weather --------------*/

/*----------- Choose an icon from Iconify -------*/

function choosePicture(icon) {
  let pic = "";
  switch (icon) {
    case "01d":
      pic = "wi:day-sunny";
      break;
    case "01n":
      pic = "wi:night-clear";
      break;
    case "02d":
      pic = "wi:day-cloudy";
      break;
    case "02n":
      pic = "wi:night-cloudy";
      break;
    case "03d":
      pic = "wi:cloud";

      break;
    case "03n":
      pic = "wi:cloud";

      break;
    case "04d":
      pic = "wi:cloudy";

      break;
    case "04n":
      pic = "wi:cloudy";

      break;
    case "09d":
      pic = "wi:showers";

      break;
    case "09n":
      pic = "wi:showers";

      break;
    case "10d":
      pic = "wi:day-rain-mix";

      break;
    case "10n":
      pic = "wi:night-rain-mix";

      break;
    case "11d":
      pic = "wi:day-lightning";

      break;
    case "11n":
      pic = "wi:night-lightning";

      break;
    case "13d":
      pic = "wi:snowflake-cold";

      break;
    case "13n":
      pic = "wi:snowflake-cold";

      break;
    case "50d":
      pic = "wi:day-fog";

      break;
    case "50n":
      pic = "wi:night-fog";

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
let iconElement = document.querySelector("#icon");

axios.get(apiUrl).then(displayWeather);

function displayWeather(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = `${cityName}`;
  currentTemperature.innerHTML = `${temp}`;
  currentHumidity.innerHTML = `${humidity}`;
  currentWind.innerHTML = `${wind}`;
  currentWeatherDescription.innerHTML = `${description}`;
  iconElement.setAttribute("data-icon", choosePicture(icon));
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

/*----------- Choosing Units --------------*/
let celsiusTemperature = null;

let celsius = document.querySelector("#celcius");
let farhenheit = document.querySelector("#farhenheit");

/*----------- Convert to Farhenheit --------------*/
function convertToFarhenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  farhenheit.classList.add("active");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

farhenheit.addEventListener("click", convertToFarhenheit);

/*----------- Convert to Celsius --------------*/
function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  farhenheit.classList.remove("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

celsius.addEventListener("click", convertToCelsius);
