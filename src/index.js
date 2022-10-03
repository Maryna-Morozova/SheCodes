// Date/Time

let now = new Date();
let day = now.getDay();
let week = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

let minutes = now.getMinutes()
if (minutes < 10) {
    minutes = `0${minutes}`
}

let currentDate = document.querySelector("#date")
currentDate.innerHTML = `${week[day]} ${hours}:${minutes}`;




// Current geolocation in h1

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "d9fd12d82698dc44978f38d20ae7d12d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
    console.log(response.data);
    let h1 = document.querySelector("h1");
    let superText = "o";
    h1.innerHTML = `Currently ${Math.round(response.data.main.temp)} ${superText.sup()}C in ${response.data.name}`;
}



// Input //

let submitTheForm = document.querySelector("#search-form")
submitTheForm.addEventListener("submit", search)

let searchInput = document.querySelector("#search-text-input");
searchInput.addEventListener("click", function () { searchInput.value = `` })

var apiKey = "d9fd12d82698dc44978f38d20ae7d12d"

function search(event) {
    event.preventDefault();
    if (searchInput.value !== "") {
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`
        axios.get(apiUrl).then(display)
    }
}


let weatherIcons = {
        Thunderstorm: "images/weather-icons-png/CloudRainThunder.png",
        Drizzle: "images/weather-icons-png/IsoRainSwrsDay.png",
        Rain: "images/weather-icons-png/FreezingRain.png",
        Snow: "images/weather-icons-png/OccLightSnow.png",
        Clear: "images/weather-icons-png/Sunny.png",
        Clouds: "images/weather-icons-png/PartlyCloudyDay.png",  
        
        Mist: "images/weather-icons-png/Mist.png",
        Smoke: "images/weather-icons-png/Mist.png",
        Haze: "images/weather-icons-png/Mist.png",
        Dust: "images/weather-icons-png/Mist.png",
        Fog: "images/weather-icons-png/Mist.png",
        Sand: "images/weather-icons-png/Mist.png",
        Dust: "images/weather-icons-png/Mist.png",
        Ash: "images/weather-icons-png/Mist.png",
        Squall: "images/weather-icons-png/Mist.png",
        
        Tornado: "images/weather-icons-png/wind.png",
};


function display(response) {
    console.log(response.data);

    let currentlyForecast = document.querySelector(".currently")
    currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`

    let fahrenheit = document.querySelector(".fahrenheit");
    fahrenheit.addEventListener("click", convertFahrenheit);
    function convertFahrenheit(event) {
        event.preventDefault();
        currentlyForecast.innerHTML = `${Math.round((response.data.main.temp) * 9 / 5 + 32)}`
    }

    let celsius = document.querySelector(".celsius");
    celsius.addEventListener("click", convertCelsius);
    function convertCelsius(event) {
        event.preventDefault();
        currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`
    }

    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `${iconChange(response.data.weather[0].main)}`);
    console.log(response.data.weather[0].main);// clouds

    function iconChange(main) {
        if (weatherIcons[main] !== undefined) {
            return `${weatherIcons[main]}`
        }
    }
}





// weather icons:
// https://openweathermap.org/weather-conditions

// 01d sunny (clear sky)
// 02d partly_cloudy_day
// 03d cloudy (scattered clouds)
// 04d filter_drama (broken clouds)
// 09d rainy (shower rain)
// 10d umbrella (rain)
// 11d thunderstorm
// 13d weather_snowy
// 50d foggy


