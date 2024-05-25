const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  cityData(city);
  form.reset();
});

async function cityData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=7edfe25e23534a9a9e482919242505&q=${city}`,
      { mode: "cors" }
    );
    response.json().then(function (response) {
      // utilize data
      console.log(response);
      populateData(response);
    });
  } catch (e) {
    alert(`Failed to get data error: ${e.message}`);
  }
}

function populateData(response) {
  let isCelsius = true;
  // clear inner html first then populate it with city info
  const content = document.querySelector(".content");
  content.innerHTML = "";
  content.innerHTML = `
  <img src="${response.current.condition.icon}">
  <h1>${response.location.name}, ${response.location.country}</h1>
  <p>${response.location.localtime}</p>
  <h2>It's ${response.current.condition.text}!</h2>
  <p>${
    isCelsius ? response.current.temp_c + "°C" : response.current.temp_f + "°F"
  }</p>
  <button id="switch">Change unit</button>
  <p>Humidity: ${response.current.humidity}%</p>
  

  `;
  const change = document.querySelector("#switch");
  change.addEventListener("click", () => {
    isCelsius = !isCelsius;
    const temperatureDisplay = document.querySelector(
      ".content p:nth-child(5)"
    );
    temperatureDisplay.textContent = isCelsius
      ? response.current.temp_c + "°C"
      : response.current.temp_f + "°F";
  });
}
