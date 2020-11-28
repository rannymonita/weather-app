// Date & Time Display
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
} else {
  hour = hour + "";
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
} else {
  minute = minute + ``;
}
let newTime = `${hour}:${minute}`;

let h4 = document.querySelector("#current-date");
h4.innerHTML = `${day}, ${month} ${date}, ${newTime}`;

// Search City Weather - Homework Week 5

function search(city) {
  let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  function showCityTemperature(response) {
    console.log(response.data);
    let cityTemperature = Math.round(response.data.main.temp);
    let cityRealFeel = Math.round(response.data.main.feels_like);

    let currentTemperature = document.querySelector("#current-temp");
    let currentRealFeel = document.querySelector("#real-feel-temp");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let description = document.querySelector("#weather-description");

    currentTemperature.innerHTML = cityTemperature;
    currentRealFeel.innerHTML = `${cityRealFeel}°C`;
    humidity.innerHTML = `${response.data.main.humidity}%`;
    windSpeed.innerHTML = `${response.data.wind.speed} `;
    description.innerHTML = `${response.data.weather[0].description}`;

    function updateTempToCelcius(event) {
      event.preventDefault();

      let celciusTemperature = Math.round(cityTemperature);
      let celciusRealFeel = Math.round(cityRealFeel);
      currentTemperature.innerHTML = `${celciusTemperature}`;
      currentRealFeel.innerHTML = `${celciusRealFeel}°C`;
      celciusLink.innerHTML = `<strong>C°</strong>`;
      fahrenheitLink.innerHTML = `F°`;
    }

    function updateTempToFahrenheit(event) {
      event.preventDefault();

      let fahrenheitTemperature = Math.round((cityTemperature * 9) / 5 + 32);
      let fahrenheitRealFeel = Math.round((cityRealFeel * 9) / 5 + 32);
      currentTemperature.innerHTML = `${fahrenheitTemperature}`;
      currentRealFeel.innerHTML = `${fahrenheitRealFeel}°F`;
      fahrenheitLink.innerHTML = `<strong>F°</strong>`;
      celciusLink.innerHTML = `C°`;
    }

    let celciusLink = document.querySelector("#celcius-link");
    let fahrenheitLink = document.querySelector("#fahrenheit-link");

    celciusLink.addEventListener("click", updateTempToCelcius);
    fahrenheitLink.addEventListener("click", updateTempToFahrenheit);
  }

  axios.get(apiUrl).then(showCityTemperature);
}

function showNewCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#user-city-input");
  let h1 = document.querySelector("h1");

  if (newCity.value) {
    h1.innerHTML = `${newCity.value}`.toLocaleUpperCase();
  } else {
    alert(`Please type a city`);
  }

  let city = newCity.value;

  search(city);
}

let cityInput = document.querySelector("#city-name");
cityInput.addEventListener("submit", showNewCity);
search("Lisbon");

// Current location Weather

function showTemperature(response) {
  console.log(response.data);
  let currLocTemperature = Math.round(response.data.main.temp);
  let currentPosition = `${response.data.name}, ${response.data.sys.country}`;
  let newRealFeel = Math.round(response.data.main.feels_like);

  let currentTemperature = document.querySelector("#current-temp");
  let currentRealFeel = document.querySelector("#real-feel-temp");
  let celciusLink = document.querySelector("#celcius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#weather-description");

  let h1 = document.querySelector("h1");
  h1.innerHTML = currentPosition;
  currentTemperature.innerHTML = currLocTemperature;
  currentRealFeel.innerHTML = `${newRealFeel}°C`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} `;
  description.innerHTML = `${response.data.weather[0].description}`;

  function updateTempToCelcius(event) {
    event.preventDefault();

    let celciusTemperature = Math.round(currLocTemperature);
    let celciusRealFeel = Math.round(newRealFeel);
    currentTemperature.innerHTML = `${celciusTemperature}`;
    currentRealFeel.innerHTML = `${celciusRealFeel}°C`;
    celciusLink.innerHTML = `<strong>C°</strong>`;
    fahrenheitLink.innerHTML = `F°`;
  }

  function updateTempToFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((currLocTemperature * 9) / 5 + 32);
    let fahrenheitRealFeel = Math.round((newRealFeel * 9) / 5 + 32);
    currentTemperature.innerHTML = `${fahrenheitTemperature}`;
    currentRealFeel.innerHTML = `${fahrenheitRealFeel}°F`;
    fahrenheitLink.innerHTML = `<strong>F°</strong>`;
    celciusLink.innerHTML = `C°`;
  }

  celciusLink.addEventListener("click", updateTempToCelcius);
  fahrenheitLink.addEventListener("click", updateTempToFahrenheit);
}

function showLocation(position) {
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let buttonCurentLocation = document.querySelector("#current-location");
buttonCurentLocation.addEventListener("click", getCurrentPosition);
