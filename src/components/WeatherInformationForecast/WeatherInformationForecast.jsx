
import './WeatherInformationForecast.css';

function WeatherInformationForecast({ fiveDayForecast }) {
    let dailyForecast = {};

    if (fiveDayForecast && fiveDayForecast.list) {
        for (let forecast of fiveDayForecast.list) {
            const date = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
            });

            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    minTemp: forecast.main.temp_min,
                    maxTemp: forecast.main.temp_max,
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon, 
                };
            }
        }
    }

   
    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
    });

    const forecastKeys = Object.keys(dailyForecast)
        .filter((date) => date !== today) 
        .slice(0, 5); 

    return (
        <div className='weather-container'>
            <h2>Previsão para os Próximos 5 Dias</h2>
            <div className='forecast-list'>
                {forecastKeys.map((date, index) => (
                    <div key={index} className='daily-forecast'>
                        <h3>{date}</h3>
                        <img
                            src={`http://openweathermap.org/img/wn/${dailyForecast[date].icon}.png`}
                            alt="Ícone do clima"
                            className='weather-icon'
                        />
                        <p>{dailyForecast[date].description}</p>
                        <p>{Math.round(dailyForecast[date].minTemp)}°C min / {Math.round(dailyForecast[date].maxTemp)}°C máx</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInformationForecast;
