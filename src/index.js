let apiKey = "d9fd12d82698dc44978f38d20ae7d12d";


// Date/Time
let week = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]
// let now = new Date();
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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    console.log(`${months[month]}.${day}`);
    return `${months[month]}.${day}`
}
// ${ formatWindDegrees(forecastDay.wind.deg) }
// function formatWindDegrees(degrees) {
//     if (degrees > 0 && degrees < 45) {
//         return NNE
//     } else if (degrees > 22.5 && degrees < 45) {
//         return NE
//     } else if (degrees > 45 && degrees < 67.5) {
//         return ENE
//     } else if (degrees > 67.5 && degrees < 90) {
//         return ENE
//     }
// }

function displayForecast(response) {
    let forecast = response.data.list;
    console.log(forecast);

    let forecastElement = document.querySelector("#apiForcast");

    let forecastHTML = ``;

    forecast.forEach(function (forecastDay) {
        forecastHTML = forecastHTML + `
        <div class="row week">
            <div class="col-1">${formatDay(forecastDay.dt)}</div>
            <div class="col-3">${forecastDay.dt_txt}</div>          
            <div class="col-1">${Math.round(forecastDay.main.temp)}<sup>o</sup></div>           
            <div class="col-1 humidity">${forecastDay.main.humidity}%</div>
            <div class="col-2">
            ${Math.round(forecastDay.wind.speed)} m/s<span class="material-symbols-outlined">air</span></div>
            <div class="col-1">${Math.round(forecastDay.main.feels_like)}<sup>o</sup></div>
            <div class="col-2" style="text-transform: capitalize">${forecastDay.weather[0].description}</div>
            <div class="col-1 icon">
                    <img src="" alt="" class="icon" id="icon" />
            </div>
        </div >
        <hr />`
        
    })
    forecastElement.innerHTML = forecastHTML;

    // forecast.forEach2(function (forecastDay2) {
    //     let icon = document.querySelector("#icon");
    //     icon.setAttribute("src", `${iconChange(forecastDay2.weather[0].main)}`);
    //     function iconChange(main) {
    //         if (weatherIcons[main] !== undefined) {
    //             console.log(`${weatherIcons[main]}`);
    //             return `${weatherIcons[main]}`
    //         }
    //     }
    // }
}



// Current geolocation

let lat = null;
let lon = null;

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemp);
}

function getForecast(coordinates) {
    console.log(coordinates);
    // let apiKeyForecast = "1a2b7258ebd456c01aef9175dfe8b709"
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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
    getForecast (response.data.coord)
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