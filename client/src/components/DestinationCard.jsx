import PropTypes from 'prop-types'
import axios from 'axios'

export default function DestinationCard({ destination = {}, fetchTrips }) {
  const handleAddToMyTrip = async () => {
    try {
      const accessToken = localStorage.getItem("access_token")
      const userId = localStorage.getItem("user_id") // Dapatkan user ID dari localStorage

      await axios.post("http://13.215.50.60/trip", {
        userId,
        title: `Trip to ${destination.name}`,
        destinations: [destination.id],
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // Memperbarui daftar trips setelah berhasil menambah
      fetchTrips && fetchTrips()
    } catch (err) {
      console.error("Error adding to trip:", err)
    }
  }

  return (
    <div className="card" style={{ width: '12rem' }}>
      <img
        src={destination.imageUrl}
        className="card-img-top"
        alt="Destinations"
        style={{
          width: '100%',
          maxHeight: '150px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{destination.name}</h5>
        <button className="btn btn-primary" onClick={handleAddToMyTrip}>
          Add to My Trip
        </button>
      </div>
    </div>
  )
}

DestinationCard.propTypes = {
  fetchTrips: PropTypes.func,
  destination: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string, // Perbaiki tipe menjadi string
    imageUrl: PropTypes.string,
  })
}
