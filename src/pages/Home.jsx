import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (city.trim() === '') {
      alert('Please enter a city name!')
      return
    }
    navigate('/weather', { state: { city } })
  }, [city, navigate])

  return (
    <div>
      <h1>SkyCast - Find My Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  )
}

export default Home
