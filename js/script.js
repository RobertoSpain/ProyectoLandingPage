const API_KEY = "a862ceedd508c1ff723356e293c6f7b8";

// Coordenadas de las playas
const beaches = [
    { name: "Pipeline, Hawái", lat: 21.6645, lon: -158.0597 },
    { name: "Gold Coast, Australia", lat: -28.0167, lon: 153.4 },
    { name: "Teahupoo, Tahití", lat: -17.8333, lon: -149.2667 }
];

// Elemento contenedor para las tarjetas de playas y clima
const beachesContainer = document.getElementById("beaches-container");

// Función para obtener los datos del clima
async function getWeatherData(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener datos del clima: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getWeatherData:", error.message);
        return null;
    }
}

// Mostrar las playas y sus condiciones climáticas
async function displayBeachesWithWeather() {
    if (!beachesContainer) {
        console.error("El contenedor 'beaches-container' no existe.");
        return;
    }

    beachesContainer.innerHTML = ""; // Limpia solo el contenedor de las tarjetas

    let content = `<div class="row justify-content-center text-center">`;

    for (const beach of beaches) {
        const data = await getWeatherData(beach.lat, beach.lon);

        // Generar información de la playa
        content += `
            <div class="col-md-4 mb-4">
                <div class="beach-card">
                    <h4>${beach.name}</h4>
                    <p>Conocido por sus olas increíbles y su belleza natural.</p>
                </div>
                <div class="weather-card">
                    ${
                        data
                            ? `
                            <h5>Condiciones Climáticas</h5>
                            <p>Clima: ${data.weather[0].description} 
                                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" 
                                     alt="${data.weather[0].description}" 
                                     title="${data.weather[0].description}">
                            </p>
                            <p>Temperatura: ${data.main.temp}°C</p>
                            <p>Humedad: ${data.main.humidity}%</p>
                            <p>Velocidad del viento: ${data.wind.speed} m/s</p>
                        `
                            : "<p>No se pudo obtener la información del clima.</p>"
                    }
                </div>
            </div>
        `;
    }

    content += `</div>`;
    beachesContainer.innerHTML = content; // Añade las tarjetas al contenedor específico
}

// Llamar a la función cuando cargue la página
document.addEventListener("DOMContentLoaded", displayBeachesWithWeather);
