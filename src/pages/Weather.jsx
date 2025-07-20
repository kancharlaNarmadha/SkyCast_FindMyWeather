import { useState, useMemo } from 'react'
import axios from 'axios'

function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const fetchWeather = () => {
    if (city.trim() === '') {
      alert('Please enter a city name!')
      return
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fcdec5d5a06f421817563c34f154b2d
&units=metric
`)
      .then(res => {
        setWeather(res.data)
        setError('')
      })
      .catch(() => {
        setError('City not found!')
        setWeather(null)
      })
  }

  const tempF = useMemo(() => {
    return weather ? (weather.main.temp * 9/5 + 32).toFixed(2) : ''
  }, [weather])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Weather Finder</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Temp: {weather.main.temp} °C / {tempF} °F</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Weather
