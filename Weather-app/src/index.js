// let weather = {
//     paris: {
//         temp: 19.7,
//         humidity: 80,
//     },
//     tokyo: {
//         temp: 17.3,
//         humidity: 50,
//     },
//     lisbon: {
//         temp: 30.2,
//         humidity: 20,
//     },
//     "san francisco": {
//         temp: 20.9,
//         humidity: 100,
//     },
//     oslo: {
//         temp: -5,
//         humidity: 20,
//     },
// };

// write your code here


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



function search(event) {
    event.preventDefault();
    if (searchInput.value !== "") {
        let apiKey = "d9fd12d82698dc44978f38d20ae7d12d"
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`
        axios.get(apiUrl).then(display) 
    }
}

function display(response) {
    console.log(response.data);
    
    let currentlyForecast = document.querySelector(".currently")
    currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`

    let fahrenheit = document.querySelector(".fahrenheit");
    fahrenheit.addEventListener("click", convertFahrenheit);
    function convertFahrenheit(event) {
        event.preventDefault();
        currentlyForecast.innerHTML = `${(Math.round(response.data.main.temp) * 9) / 5 + 32}`
    }

    let celsius = document.querySelector(".celsius");
    celsius.addEventListener("click", convertCelsius);
    function convertCelsius(event) {
        event.preventDefault();
        currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`
    }

    let currentDesc = document.querySelector(".symbols")
    currentDesc.innerHTML = `${response.data.weather[0].description}`
 
}






// var defaultValue = document.querySelector(".currently");
// defaultValue.innerHTML = `${forecast("paris")}`


// function forecast(cityName) {
//     if (cityName !== "" && cityName !== null) {
//         cityName = cityName.toLowerCase(cityName.trim());

//         if (weather[cityName] !== undefined) {
//             return `${Math.round(weather[cityName].temp)}`;
//         } else {
//             return `Sorry`;
//         }
//     }
// }
