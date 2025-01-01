const search_section = document.querySelector('.weather2')
const welcome_section = document.querySelector('.weather1')
function weather() {
    const apikey = '5a87e766a423e9e6b12519920ddbd2ae'; 
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`; 

    fetch(weather_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('ERROR:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}

function displayWeather(data) {
    const tempInfo = document.getElementById('temp-info'); 
    const weatherInfo = document.getElementById('weather-info'); 
    const weatherIcon = document.getElementById('weather-icon'); 
	const cityInfo = document.getElementById('city-info');
    const feelslikeInfo = document.getElementById('feelslike-info');
    const windspeedInfo = document.getElementById('windspeed-info');
    const humidityInfo = document.getElementById('humidity-info');
    const pressureInfo = document.getElementById('pressure-info');
    const visibilityInfo = document.getElementById('visibility-info');

    tempInfo.innerHTML = '';
    weatherInfo.innerHTML = '';
    weatherIcon.src = '';
    feelslikeInfo.innerHTML = '';
    cityInfo.innerHTML = '';
    windspeedInfo.innerHTML = '';
    humidityInfo.innerHTML = '';
    pressureInfo.innerHTML = '';
    visibilityInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); 
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
		const feelslike = Math.round(data.main.feels_like - 273.15);
		const windspeed = data.wind.speed;
		const humidity = data.main.humidity;
		const pressure = data.main.pressure;
		const visibility = data.visibility;
        
        const cityHTML = `<p>${cityName}</p>`
        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${description}</p>`;
        const feelslikeHTML = `<p>Feels like ${feelslike}°C</p>`;
        const windspeedHTML = `
        <p>Wind Speed</p>
        <p>${windspeed}km/h</p>
        `;
        const humidityHTML = `
        <p>Humidity</p>
        <p>${humidity}%</p>
        `;
        const pressureHTML = `
        <p>Pressure</p>
        <p>${pressure}mb</p>
        `;
        const visibilityHTML = `
        <p>Visibility</p>
        <p>${visibility}m</p>
        `;

        tempInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML;
		cityInfo.innerHTML = cityHTML;
        feelslikeInfo.innerHTML = feelslikeHTML;
        windspeedInfo.innerHTML = windspeedHTML;
        humidityInfo.innerHTML = humidityHTML;
        pressureInfo.innerHTML = pressureHTML;
        visibilityInfo.innerHTML = visibilityHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
		display_section(search_section);
    }
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon'); 
    weatherIcon.style.display = 'block';
}

function display_section(section){
	[welcome_section, search_section].forEach(section => section.style.display = 'none');

	section.style.display = 'flex'
}