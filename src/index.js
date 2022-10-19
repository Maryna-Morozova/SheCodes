const apiKeyForecast = '96ad27349a64ea1dcdfbe6f4d458c085';

// Date/Time
const week = ['Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'];
const day = new Date().getDay();
const currentDate = document.querySelector('#date');
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
  const date = new Date(timestamp * 1000);

  const day = date.getDay();
  const days = ['Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'];
  return days[day];
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = date.getDate();
  const month = date.getMonth();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[month]}.${day}`;
}

function displayForecast(response) {
  if (response.name === 'AxiosError') {
    const forecastElement = document.querySelector('#week-forecast');
    const forecastHTML = '';
    forecastElement.innerHTML = forecastHTML;
  } else {
    const forecast = response.data.daily;
    const forecastElement = document.querySelector('#week-forecast');
    let forecastHTML = '';
    console.log(forecast);

    forecast.forEach((forecastDay, index) => {
      if (index < 5) {
        function iconChange(main) {
          if (weatherIcons[main] !== undefined) {
            return `${weatherIcons[main]}`;
          }
        }

        forecastHTML
                += `<hr class="hr"/>       
                <div class="row week">
                    <div class="col-1 formatDay">${formatDay(forecastDay.dt)}</div>
                    <div class="col-2 formatDate">${formatDate(forecastDay.dt)}</div>          
                    <div class="col-1 temp">${Math.round(forecastDay.temp.day)}<sup>o</sup></div>
                    <div class="col-2 humidity">${forecastDay.humidity}%</div>
                    <div class="col-2 wind">${Math.round(forecastDay.wind_speed)} m/s</div>
                    <div class="col-2 descr" style="text-transform: capitalize">${forecastDay.weather[0].description}</div>
                    <div class="col-2 icon">
                        <img src="${iconChange(forecastDay.weather[0].main)}" alt="" class="" id="" width="55px"/>
                    </div>
                </div >`;
      }
    });
    forecastElement.innerHTML = forecastHTML;
  }
}

// Current geolocation

let lat = null;
let lon = null;

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyForecast}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getForecast(coordinates) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  value = moment.tz.guess();
  const city = value.split('/')[1].replace('_', ' ');
  const currentGeo = document.querySelector('#search-text-input');
  currentGeo.setAttribute('placeholder', `${city}`);

  const currentlyTemp = document.querySelector('.currently');
  currentlyTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

  const currentDesc = document.querySelector('#description');
  currentDesc.innerHTML = `${response.data.weather[0].description}`;

  const currentIcon = document.querySelector('#icons');
  currentIcon.setAttribute('src', `${iconChange(response.data.weather[0].main)}`);
  function iconChange(main) {
    if (weatherIcons[main] !== undefined) {
      return `${weatherIcons[main]}`;
    }
  }

  const fahrenheit = document.querySelector('.fahrenheit');
  fahrenheit.addEventListener('click', convertFahrenheit);
  function convertFahrenheit(event) {
    event.preventDefault();
    currentlyTemp.innerHTML = `${Math.round((response.data.main.temp) * 9 / 5 + 32)}`;
  }

  const celsius = document.querySelector('.celsius');
  celsius.addEventListener('click', convertCelsius);
  function convertCelsius(event) {
    event.preventDefault();
    currentlyTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  }
  getForecast(response.data.coord);
}

// Input //

const submitTheForm = document.querySelector('#search-form');
submitTheForm.addEventListener('submit', search);

const searchInput = document.querySelector('#search-text-input');
searchInput.addEventListener('click', () => {
  searchInput.value = '';
  const geo = document.querySelector('#search-text-input');
  geo.setAttribute('placeholder', 'City');
});

function search(event) {
  event.preventDefault();
  if (searchInput.value !== '') {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKeyForecast}&units=metric`;
    axios.get(apiUrl).then(onFulfilled, onRejected);
  }
}

function onRejected(response) {
  console.log(response.response.data.message);
  const currentDesc = document.querySelector('#description');
  currentDesc.innerHTML = `${response.response.data.message}`;
  const currentlyForecast = document.querySelector('.currently');
  currentlyForecast.innerHTML = '';
  const icon = document.querySelector('#icons');
  icon.setAttribute('src', '');
  displayForecast(response);
}

function onFulfilled(response) {
  console.log(response);

  const currentlyForecast = document.querySelector('.currently');
  currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`;

  const fahrenheit = document.querySelector('.fahrenheit');
  fahrenheit.addEventListener('click', convertFahrenheit);
  function convertFahrenheit(event) {
    event.preventDefault();
    currentlyForecast.innerHTML = `${Math.round((response.data.main.temp) * 9 / 5 + 32)}`;
  }

  const celsius = document.querySelector('.celsius');
  celsius.addEventListener('click', convertCelsius);
  function convertCelsius(event) {
    event.preventDefault();
    currentlyForecast.innerHTML = `${Math.round(response.data.main.temp)}`;
  }

  const currentDesc = document.querySelector('#description');
  currentDesc.innerHTML = `${response.data.weather[0].description}`;

  const icon = document.querySelector('#icons');
  icon.setAttribute('src', `${iconChange(response.data.weather[0].main)}`);
  function iconChange(main) {
    if (weatherIcons[main] !== undefined) {
      return `${weatherIcons[main]}`;
    }
  }
  getForecast(response.data.coord);
}

var weatherIcons = {
  Thunderstorm: 'images/weather-icons-png/CloudRainThunder.png',
  Drizzle: 'images/weather-icons-png/IsoRainSwrsDay.png',
  Rain: 'images/weather-icons-png/FreezingRain.png',
  Snow: 'images/weather-icons-png/OccLightSnow.png',
  Clear: 'images/weather-icons-png/Sunny.png',
  Clouds: 'images/weather-icons-png/PartlyCloudyDay.png',

  Mist: 'images/weather-icons-png/Mist.png',
  Smoke: 'images/weather-icons-png/Mist.png',
  Haze: 'images/weather-icons-png/Mist.png',
  Dust: 'images/weather-icons-png/Mist.png',
  Fog: 'images/weather-icons-png/Mist.png',
  Sand: 'images/weather-icons-png/Mist.png',
  Dust: 'images/weather-icons-png/Mist.png',
  Ash: 'images/weather-icons-png/Mist.png',
  Squall: 'images/weather-icons-png/Mist.png',

  Tornado: 'images/weather-icons-png/wind.png',
};

// Toggle Theme
let themeButton = document.querySelector("#theme");
themeButton.addEventListener("click", toggleTheme)

function toggleTheme() {
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('.date').classList.toggle('dark');
  document.querySelector('.currentDate2').classList.toggle('dark');
  document.querySelector('.currentTime').classList.toggle('dark');
}

// Timer
setInterval(() => {
  const kyiv = document.querySelector('#current-time');
  kyiv.querySelector('.currentTime').innerHTML = moment.tz(moment.tz.guess()).format('h:mm:ss A');
  kyiv.querySelector('.currentDate2').innerHTML = moment.tz(moment.tz.guess()).format('MMMM Do YYYY');
}, 1000);
