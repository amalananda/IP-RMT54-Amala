import { useState, useEffect } from "react"
import axios from "axios"
import './WeatherApp.css' // Import file CSS

function WeatherApp() {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const cities = ["Purwokerto", "Semarang", "Tegal", "Yogyakarta", "Solo", "Cilacap"]
    fetchWeatherForCities(cities)
  }, [])

  const fetchWeatherForCities = async (cities) => {
    try {
      const allWeatherData = await Promise.all(
        cities.map(async (city) => {
          const locationResponse = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
          )
          const location = locationResponse.data.results[0]

          if (location) {
            const weatherResponse = await axios.get(
              `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code`
            )
            const weather = weatherResponse.data.current
            return {
              city: location.name,
              latitude: location.latitude,
              longitude: location.longitude,
              temperature: weather.temperature_2m,
              time: weather.time,
              weatherCode: weather.weather_code,
            }
          }
          return null
        })
      )
      setWeatherData(allWeatherData.filter((data) => data !== null))
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }

  return (
    <section>
      <h1 className="title">Cuaca di Beberapa Kota</h1>
      <div className="weather-container">

        {weatherData.map((data, index) => (
          <div className="weather-card" key={index}>
            <h2>{data.city}</h2>
            <p>Latitude: {data.latitude}</p>
            <p>Longitude: {data.longitude}</p>
            <p>Waktu: {data.time}</p>
            <p>Suhu: {data.temperature} °C</p>
            <p>Kondisi: {data.weatherCode === 3 ? "Berawan" : "Tidak Berawan"}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherApp
