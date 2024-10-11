import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { FaMoon, FaSun } from 'react-icons/fa'  
import WeatherInformation from './components/WeatherInformation/WeatherInformation'
import WeatherInformationForecast from './components/WeatherInformationForecast/WeatherInformationForecast'

function App() {
  const [weather, setWeather] = useState()
  const [forecast, setForecast] = useState()
  const [darkMode, setDarkMode] = useState(false)

  const inputRef = useRef()

  async function searchCity() {
    const city = inputRef.current.value
    const key = "be87137952b075f05a59b15e70087a2c"

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const weatherInfo = await axios.get(weatherApiUrl)
    const forecastInfo = await axios.get(forecastApiUrl)

   setForecast(forecastInfo.data)
   setWeather(weatherInfo.data)
  }

  
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <>
      <div className='container'>
        <header>
          <h1>Previsão do Tempo</h1>
        </header>

        <div className='input-group'>
          <input ref={inputRef} type='text' placeholder='Digite o nome da cidade' />
          <button onClick={searchCity}>Buscar</button>
        </div>

        {weather && <WeatherInformation weather={weather} />}
        {forecast && <WeatherInformationForecast fiveDayForecast={forecast} />}

        <button className='toggle-theme' onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </>
  )
}

export default App
