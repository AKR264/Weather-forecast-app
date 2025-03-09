const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Rajsamand');
});

async function weatherFn(cName) {
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
	$('#city').text(data.name);
	$('#date_time').text(moment().
		format('MMMM Do YYYY, h:mm:ss a'));
	$('#temperature').
		html(`${data.main.temp}°C`);
	$('#info').
		text(data.weather[0].description);
	$('#wind_speed').
		html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-icon').
	    attr('src',
		`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
	$('#result').fadeIn();
}