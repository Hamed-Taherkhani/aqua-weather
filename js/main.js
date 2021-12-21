const getWeatherBtn = document.getElementById("get-weather"),
  cityNameInput = document.getElementById("city-name");

let url = "";

fetchData();
getWeatherBtn.addEventListener("click", fetchData);
function fetchData() {
  // To preventing default from form element:
  if (event !== undefined) event.preventDefault();

  setCityNameOnRequest();

  const xhr = new XMLHttpRequest();
  xhr.onloadend = () => {
    let response = xhr.responseText;
    // Parse response text to json.
    response = JSON.parse(response);
    console.log(response);

    putInfoOnPage(response);
  };
  xhr.open("GET", url, true);
  xhr.send();
}

const cityName = document.querySelector("#weather-information > h2"),
  weatherInfoElements = document.getElementsByClassName("weather-info"),
  condition = document.querySelector("#conditions p");
function putInfoOnPage(response) {
  // Set the weather condition:
  condition.textContent = response.current.condition.text;

  // Set the name of place
  cityName.textContent =
    response.location.region +
    ", " +
    response.location.name +
    ", " +
    response.location.country;

  // Set the weather temperature:
  response.current.temp_c;
  weatherInfoElements[0].textContent = response.current.temp_c + " C";

  // Set the humidity:
  weatherInfoElements[1].textContent = response.current.humidity + " %";

  // Set the UV:
  weatherInfoElements[2].textContent = response.current.uv;

  // Set the amount of clouds:
  weatherInfoElements[3].textContent = response.current.cloud;
}

function setCityNameOnRequest() {
  let cityName = cityNameInput.value;
  if (cityName.length === 0) {
    cityName = "Takestan";
  }
  url = `https://api.weatherapi.com/v1/current.json?key=ab2b37f6d8dc473281c72011210308&q=${cityName}&aqi=no`;
}
