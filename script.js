let weather = {
  fetchWeather: function (ville) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=56dcadfba04ba98370c7e0c9ad313c70&units=metric&lang=fr`)
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector("#ville").innerText = "   " + name;
    document.querySelector("#icone").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#description").innerText = description;
    document.querySelector("#temp").innerText = temp + "°C";
    document.querySelector("#humidite").innerText = "Humidité: " + humidity + "%";
    document.querySelector("#vent").innerText = "Vitesse vent: " + speed + " km/h";
  }
};

let config = {
  fetchConfig: function (file) {
    fetch(file)
      .then(response => response.json())
      .then(config => {
        const { ville } = config;
        weather.fetchWeather(ville);
      })
  }
}

// On charge le fichier JSON et on effectue le premier appel
config.fetchConfig("./config.json");

// Rafraîchissement toutes les heures
var refreshInterval = setInterval(function () {
  config.fetchConfig("./config.json");
}, 360000);

// Arrêt du rafraîchissement 
// clearInterval(refreshInterval);
