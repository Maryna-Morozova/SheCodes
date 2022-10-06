let apiKeyForecast = "96ad27349a64ea1dcdfbe6f4d458c085"

// Date/Time
let week = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]
let day = new Date().getDay();
let currentDate = document.querySelector("#date")
currentDate.innerHTML = `${week[day]}`;

// let hours = now.getHours();
// if (hours < 10) {
//     hours = `0${hours}`;
// }

// let minutes = now.getMinutes()
// if (minutes < 10) {
//     minutes = `0${minutes}`
// }

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    
    let day = date.getDay()
    let days = ["Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"]
    return days[day]
}

function formatDate(timestamp) {
    let date = new Date(timestamp * 1000)

    let day = date.getDate()
    let month = date.getMonth()
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
    return `${months[month]}.${day}`
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#week-forecast");
    let forecastHTML = ``;
    forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
            function iconChange(main) {
                if (weatherIcons[main] !== undefined) {
                    return `${weatherIcons[main]}`
                }
            }
            forecastHTML = forecastHTML + ` 
        <hr class="hr"/>       
            <div class="row week">
                <div class="col-1">${formatDay(forecastDay.dt)}</div>
                <div class="col-2">${formatDate(forecastDay.dt)}</div>          
                <div class="col-1">${Math.round(forecastDay.temp.day)}<sup>o</sup></div>           
                <div class="col-2 humidity">${forecastDay.humidity}%</div>
                <div class="col-2 wind">${Math.round(forecastDay.wind_speed)} m/s</div>
                <div class="col-2 descr" style="text-transform: capitalize">${forecastDay.weather[0].description}</div>
                <div class="col-2 icon">
                    <img src="${iconChange(forecastDay.weather[0].main)}" alt="" class="" id="" width="55px"/>
                    </div>
            </div >
            
        `
        }
    })
    forecastElement.innerHTML = forecastHTML;
}


// Current geolocation

let lat = null;
let lon = null;

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyForecast}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
}

function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
    value = moment.tz.guess();
    let city = value.split("/")[1].replace('_', ' ')
    let currentGeo = document.querySelector("#search-text-input");
    currentGeo.setAttribute("placeholder", `${city}`);

    let currentlyTemp = document.querySelector(".currently");
    currentlyTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

    let currentDesc = document.querySelector("#description");
    currentDesc.innerHTML = `${response.data.weather[0].description}`;

    let currentIcon = document.querySelector("#icons");
    currentIcon.setAttribute("src", `${iconChange(response.data.weather[0].main)}`);
    function iconChange(main) {
        if (weatherIcons[main] !== undefined) {
            return `${weatherIcons[main]}`
        }
    }

    let fahrenheit = document.querySelector(".fahrenheit");
    fahrenheit.addEventListener("click", convertFahrenheit);
    function convertFahrenheit(event) {
        event.preventDefault();
        currentlyTemp.innerHTML = `${Math.round((response.data.main.temp) * 9 / 5 + 32)}`
    }

    let celsius = document.querySelector(".celsius");
    celsius.addEventListener("click", convertCelsius);
    function convertCelsius(event) {
        event.preventDefault();
        currentlyTemp.innerHTML = `${Math.round(response.data.main.temp)}`
    }
    getForecast(response.data.coord)
}

// Input //

let submitTheForm = document.querySelector("#search-form")
submitTheForm.addEventListener("submit", search)

let searchInput = document.querySelector("#search-text-input");
searchInput.addEventListener("click", function () {
    searchInput.value = ``;
    let geo = document.querySelector("#search-text-input");
    geo.setAttribute("placeholder", `City`);
})

function search(event) {
    event.preventDefault();
    if (searchInput.value !== "") {
        console.log(searchInput.value);
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKeyForecast}&units=metric`
        axios.get(apiUrl).then(onFulfilled, onRejected)
    }
}

function onRejected(response) {
    console.log(response.response.data.message);
    let currentDesc = document.querySelector("#description");
    currentDesc.innerHTML = `${response.response.data.message}`;
    let currentlyForecast = document.querySelector(".currently")
    currentlyForecast.innerHTML = ``;
    let icon = document.querySelector("#icons");
    icon.setAttribute("src", ``);
}

function onFulfilled(response) {
    console.log(response);

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

    let currentDesc = document.querySelector("#description");
    currentDesc.innerHTML = `${response.data.weather[0].description}`;

    let icon = document.querySelector("#icons");
    icon.setAttribute("src", `${iconChange(response.data.weather[0].main)}`);
    function iconChange(main) {
        if (weatherIcons[main] !== undefined) {
            return `${weatherIcons[main]}`
        }
    }
    getForecast(response.data.coord)
}

var weatherIcons = {
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


// Dark Theme
function toggleTheme() {
    if (theme === "light") {
        theme = "dark";
        document.querySelector("body").classList.add("dark");
        document.querySelector(".date").classList.add("dark");
        document.querySelector(".currentDate2").classList.add("dark");
        document.querySelector(".currentTime").classList.add("dark");

    } else {
        theme = "light";
        document.querySelector("body").classList.remove("dark");
        document.querySelector(".date").classList.remove("dark");
        document.querySelector(".currentDate2").classList.remove("dark");
        document.querySelector(".currentTime").classList.remove("dark");

    }
}

let theme = "light";
let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme)



// Timer
setInterval(function () {
    let kyiv = document.querySelector("#current-time")
    kyiv.querySelector(".currentTime").innerHTML = moment.tz(moment.tz.guess()).format("h:mm:ss A");
    kyiv.querySelector(".currentDate2").innerHTML = moment.tz(moment.tz.guess()).format('MMMM Do YYYY')
}, 1000);