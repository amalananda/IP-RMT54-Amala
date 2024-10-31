import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyTrips() {
  const [trips, setTrips] = useState([])

  const fetchTrips = async () => {
    try {
      const accessToken = localStorage.getItem("access_token")
      const response = await axios.get("https://p2.amalananda.online/trips/my-trips", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setTrips(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div>
      <h2>My Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>{trip.title}</li> // Tampilkan judul perjalanan
        ))}
      </ul>
    </div>
  )
}
