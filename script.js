document.getElementById('search-btn').addEventListener('click', getWeather);

async function getWeather() {
    const apiKey = API_KEY; // Your API key is now securely stored in config.js
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');

    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    // For OpenWeatherMap (uncomment to use)
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // For Open-Meteo (free, by lat/lon - for demo)
    // You would need to convert a city name to latitude/longitude for Open-Meteo;
    // Here, using default for demo (e.g., New Delhi: 28.61, 77.21)
    // const url = `https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current_weather=true`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found!');
        const data = await response.json();

        // Parse API result (for OpenWeatherMap)
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfo.innerHTML = `
            <h2>${city}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
            <p>Temperature: ${temp}°C</p>
            <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        `;
        weatherInfo.classList.add('show');
    } catch (err) {
        weatherInfo.innerHTML = `<p>Error: ${err.message}</p>`;
    }
}
