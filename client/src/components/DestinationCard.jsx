import PropTypes from 'prop-types'
import { useState } from 'react'

export default function DestinationCard({ destination }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDetailClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="card" style={{ width: '12rem' }}>
        <img
          src={destination.imageUrl}
          className="card-img-top"
          alt="Destination"
          style={{
            width: '100%',
            maxHeight: '150px',
            objectFit: 'cover',
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{destination.name}</h5>
          <button className="btn btn-secondary" onClick={handleDetailClick}>
            Detail
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <img
              src={destination.imageUrl}
              alt="Destination"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h5>{destination.name}</h5>
            <p>{destination.description}</p>
          </div>
        </div>
      )}
    </>
  )
}

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
}
