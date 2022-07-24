function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateElement = document.querySelector("#date");
  let formattedDate = `${day} ${hour}:${minutes}`;
  dateElement.innerHTML = formattedDate;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".entered-city").value;
  let apiKey = "63116731662a94eebc651f7bb7447ea1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function getWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  mainTemp.innerHTML = celsiusTemperature;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let weatherIcon = document.querySelector("#main-icon");
  let apiIcon = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${apiIcon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}
function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "63116731662a94eebc651f7bb7447ea1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let mainTemp = document.querySelector("#temperature");
  mainTemp.innerHTML = fahrenheitTemperature;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}
function showCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}
formatDate(new Date());
axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=63116731662a94eebc651f7bb7447ea1&units=metric`
  )
  .then(getWeather);
let searchForm = document.querySelector(".search-city-form");
searchForm.addEventListener("submit", handleSubmit);
let locationButton = document.querySelector(".btn-location");
locationButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getPosition);
});
let celsius = document.querySelector(".celsius-link");
let celsiusTemperature = null;
let fahrenheit = document.querySelector(".fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);
celsius.addEventListener("click", showCelsius);
