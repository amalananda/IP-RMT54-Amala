import { useEffect, useState } from 'react'
import axios from 'axios'
// import GeminiChat from '../components/GeminiChat'
import DestinationCard from '../components/DestinationCard'
// import ClubCard from '../components/ClubCard'
// import { useSelector } from "react-redux"

export default function DestinationPage() {
  const [destination, setDestination] = useState([])
  // const isLoggedIn = useSelector((state) => state.auth.access_token)

  const fetchDestinations = async () => {
    try {
      const { data } = await axios.get("http://13.215.50.60/destination", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
          // Authorization: `Bearer ${isLoggedIn}`
        }
      })
      setDestination(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchDestinations()
  }, [])

  return (
    <section>
      <div className="d-flex flex-wrap gap-3 justify-content-center py-5">
        {destination.map(e => {
          return (
            <DestinationCard key={e.id} destination={e} fetchDestinations={fetchDestinations} />
          )
        })}
      </div>
    </section>
  )
}
