import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyTrips() {
  const [trips, setTrips] = useState([])
  const [destinations, setDestinations] = useState([])
  const [newTrip, setNewTrip] = useState({
    id: null,
    title: '',
    startDate: '',
    endDate: '',
    destinationIds: [],
  })

  const fetchTrips = async () => {
    try {
      const accessToken = localStorage.getItem("access_token")
      const response = await axios.get("https://p2.amalananda.online/trip/my-trips", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setTrips(response.data)
    } catch (err) {
      console.error("Failed to fetch trips:", err)
    }
  }

  const fetchDestinations = async () => {
    try {
      const accessToken = localStorage.getItem("access_token")
      const response = await axios.get("https://p2.amalananda.online/destination", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setDestinations(response.data)
    } catch (err) {
      console.error("Failed to fetch destinations:", err)
    }
  }

  const handleCreateOrUpdateTrip = async () => {
    try {
      const accessToken = localStorage.getItem("access_token")
      const url = newTrip.id
        ? `https://p2.amalananda.online/trip/${newTrip.id}`
        : "https://p2.amalananda.online/trip"
      const method = newTrip.id ? "PUT" : "POST"

      const response = await axios({
        method,
        url,
        data: {
          title: newTrip.title,
          startDate: newTrip.startDate,
          endDate: newTrip.endDate,
          destinationIds: newTrip.destinationIds,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (newTrip.id) {
        setTrips((prevTrips) =>
          prevTrips.map((trip) => (trip.id === newTrip.id ? response.data : trip))
        )
      } else {
        setTrips((prevTrips) => [...prevTrips, response.data])
      }

      setNewTrip({ id: null, title: '', startDate: '', endDate: '', destinationIds: [] })
    } catch (err) {
      console.error("Failed to create/update trip:", err)
    }
  }

  const handleEditTrip = (trip) => {
    setNewTrip({
      id: trip.id,
      title: trip.title,
      startDate: trip.startDate,
      endDate: trip.endDate,
      destinationIds: trip.Destinations.map(destination => destination.id),
    })
  }

  useEffect(() => {
    fetchTrips()
    fetchDestinations()
  }, [])

  const handleDestinationChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value)
    setNewTrip((prev) => ({ ...prev, destinationIds: selectedOptions }))
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>My Trips</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {trips.map((trip) => (
          <li key={trip.id} style={{ margin: '20px 0', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <h4>{trip.title}</h4>
            <p><strong>Start Date:</strong> {trip.startDate}</p>
            <p><strong>End Date:</strong> {trip.endDate}</p>
            <h5>Destinations:</h5>
            <ul>
              {trip.Destinations && trip.Destinations.length > 0 ? (
                trip.Destinations.map((destination) => (
                  <li key={destination.id}>{destination.name}</li>
                ))
              ) : (
                <li>No destinations</li>
              )}
            </ul>
            <button onClick={() => handleEditTrip(trip)} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <h3>{newTrip.id ? "Edit Trip" : "Create New Trip"}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Title"
          value={newTrip.title}
          onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={newTrip.startDate}
          onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={newTrip.endDate}
          onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <h5>Select Destinations:</h5>
        <select
          multiple
          value={newTrip.destinationIds}
          onChange={handleDestinationChange}
          style={{ height: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateOrUpdateTrip}
          style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {newTrip.id ? "Update Trip" : "Create Trip"}
        </button>
      </div>
    </div>
  )
}
