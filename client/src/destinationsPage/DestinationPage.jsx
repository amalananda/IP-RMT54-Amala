// DestinationPage.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import DestinationCard from '../components/DestinationCard'

export default function DestinationPage() {
  const [destinations, setDestinations] = useState([])

  const fetchDestinations = async () => {
    try {
      const { data } = await axios.get("https://p2.amalananda.online/destination", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      setDestinations(data)
    } catch (err) {
      console.error("Error fetching destinations:", err)
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  return (
    <section>
      <div className="d-flex flex-wrap gap-3 justify-content-center py-5">
        {destinations.map(destination => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            fetchDestinations={fetchDestinations}
          />
        ))}
      </div>
    </section>
  )
}
