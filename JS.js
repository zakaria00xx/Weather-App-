const cont = document.getElementById("cont");
const header = document.getElementById("header");
const innn = document.getElementById("input");
const btn = document.getElementById("btn");
const weatherInfo = document.getElementById("weather-info");
const icon = document.getElementById("icon");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const errorMessage = document.getElementById("error-message");

btn.addEventListener("click", getWeather);

function getWeather() {
  let findC = innn.value.trim();

  if (findC === "") {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Please enter a valid city!";
    return;
  }

  fetch(`http://api.weatherapi.com/v1/current.json?key=3329cc7206cf42ae960135520252307&q=${findC}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "City not found. Please try again!";
        return;
      }
      
      errorMessage.style.display = "none"; // Hide error message on success

      let name = data.location.name;
      let newTemp = `${data.current.temp_c} ℃`;
      let newIcon = "https:" + data.current.condition.icon;

      icon.src = newIcon;
      city.textContent = name;
      temp.textContent = newTemp;
    })
    .catch(error => {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Sorry, we got an error!";
      console.error(error);
    });
}
