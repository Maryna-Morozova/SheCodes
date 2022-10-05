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




// Current geolocation

let apiKey = "d9fd12d82698dc44978f38d20ae7d12d";
let lat = null;
let lon = null;

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
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
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`
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
    console.log(response
    );    

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


// Dark Theme
function toggleTheme() {
    if (theme === "light") {
        theme = "dark";
        document.querySelector("body").classList.add("dark");
        document.querySelector(".date").classList.add("dark");
    } else {
        theme = "light";
        document.querySelector("body").classList.remove("dark");
        document.querySelector(".date").classList.remove("dark");
    }
}


let theme = "light";
let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme)



// Time

// console.log(moment.tz.names("Europe/Lisbon"));
// console.log(moment.tz.guess());

setInterval(function () {
    let kyiv = document.querySelector("#current-time")
    // console.log(moment.tz(new Date(), 'Europe/London').format('YYYYMMDD HH:mm'));
    // console.log(moment.tz('Europe/Kiev').format('MMMM Do YYYY'));
    // console.log(moment().format('HH:mm'));
    kyiv.querySelector(".currentTime").innerHTML = moment.tz(moment.tz.guess()).format("h:mm:ss A");
    kyiv.querySelector(".currentDate2").innerHTML = moment.tz(moment.tz.guess()).format('MMMM Do YYYY')
    

    // // Los Angeles
    // let losAngeles = document.getElementById('los-angeles')
    // losAngeles.querySelector('.time').innerHTML = moment().tz('America/Los_Angeles').format('h:mm:ss A');
    // losAngeles.querySelector('.date').innerHTML = moment().tz('America/Los_Angeles').format('MMMM Do YYYY');

    // // Paris
    // let paris = document.getElementById('paris')
    // paris.querySelector('.time').innerHTML = moment().tz('Europe/Paris').format('h:mm:ss A');
    // paris.querySelector('.date').innerHTML = moment().tz('Europe/Paris').format('MMMM Do YYYY');

    // // Tokyo
    // let tokyo = document.getElementById('tokyo');
    // let tokyoTime = moment().tz('Asia/Tokyo');
    // tokyo.querySelector('.time').innerHTML = tokyoTime.format('h:mm:ss A');

    // tokyo.querySelector('.date').innerHTML = tokyoTime.format('MMMM Do YYYY');

    // // Sydney
    // let sydney = document.getElementById('sydney');
    // let sydneyTime = moment().tz('Australia/Sydney');
    // sydney.querySelector('.time').innerHTML = sydneyTime.format('h:mm:ss A');
    // sydney.querySelector('.date').innerHTML = sydneyTime.format('MMMM Do YYYY');
}, 1000);



// function search(event) {
//     let cities = document.querySelector('#cities');
//     let value = event.target.value;
//     if (event.target.value === 'current') {
//         value = moment.tz.guess();
//     }

//     if (value.length) {
//         let searchTime = moment().tz(value);
//         let city = value.split("/")[1].replace('_', ' ')
//         let time = searchTime.format('h:mm:ss A');
//         let date = searchTime.format('MMMM Do YYYY');;
//         cities.innerHTML = `
// 			<div class="city">
// 				<div>
// 					<h2>${city}</h2>
// 					<div class="date">${date}</div>
// 				</div>
// 				<div class="time">${time}</div>
// 			</div>
// 			`
//     }
// }

// let select = document.getElementById("search");
// select.addEventListener("change", search);


// html
{/* <div>
        <select id="search">
          <option value="">Select a location..</option>
          <option value="current">Current location</option>
          <option value="Europe/London">London</option>
          <option value="America/New_York">New York</option>
        </select>
      </div>
      <div class="cities" id="cities">
        <div class="city">
          <div>
            <h2>Kiev</h2>
            <div class="date">October 5th 2022</div>
          </div>
          <div class="time">12:50:23 AM</div>
        </div>
      </div> */}