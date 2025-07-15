const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

document.addEventListener("DOMContentLoaded", () => {
  weatherFn('Rajsamand');

  document.getElementById("cityname-btn").addEventListener("click", () => {
    const city = document.getElementById("cityname").value.trim();
    if (city !== "") {
      weatherFn(city);
    }
  });
});

async function weatherFn(cityName) {
  const requestUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(requestUrl);
    const data = await response.json();

    if (response.ok) {
      weatherShowFn(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function formatLocalTime(utcOffsetInSeconds) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const localTime = new Date(utc + utcOffsetInSeconds * 1000);
  return localTime.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

function weatherShowFn(data) {
  document.getElementById("city").textContent = data.name;
  document.getElementById("date_time").textContent = formatLocalTime(data.timezone);
  document.getElementById("temperature").innerHTML = `${data.main.temp}°C`;
  document.getElementById("info").textContent = data.weather[0].description;
  document.getElementById("wind_speed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById("weather-icon").src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("result").style.display = "block";

  setBackground(data.weather[0].main, data.dt, data.timezone);
}

function setBackground(weatherMain, timestamp, timezoneOffset) {
  const hour = new Date((timestamp + timezoneOffset) * 1000).getHours();
  const isDay = hour >= 6 && hour < 18;

  const weather = weatherMain.toLowerCase();
  const timeOfDay = isDay ? 'day' : 'night';
  const className = `${weather}-${timeOfDay}`;

  clearWeatherBackground();
  document.body.classList.add(className);
}

function clearWeatherBackground() {
  const weatherClasses = [
    "clear-day", "clear-night",
    "clouds-day", "clouds-night",
    "rain-day", "rain-night",
    "drizzle-day", "drizzle-night",
    "snow-day", "snow-night",
    "thunderstorm-day", "thunderstorm-night"
  ];

  weatherClasses.forEach(cls => document.body.classList.remove(cls));
}
