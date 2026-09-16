import { useEffect, useState } from 'react'
import './AdminDashboard.css'

const API_URL = 'http://127.0.0.1:5001/api/bookings/'

function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to load bookings.')
      }

      const data = await response.json()
      setBookings(data)
    } catch (err) {
      console.error(err)
      setError(
        'Unable to load bookings. Make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(
        `${API_URL}${bookingId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update booking status.')
      }

      const data = await response.json()

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? data.booking
            : booking
        )
      )
    } catch (err) {
      console.error(err)
      alert('Unable to update booking status.')
    }
  }

  const pendingCount = bookings.filter(
    (booking) => booking.status === 'pending'
  ).length

  const confirmedCount = bookings.filter(
    (booking) => booking.status === 'confirmed'
  ).length

  const completedCount = bookings.filter(
    (booking) => booking.status === 'completed'
  ).length

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">
            EPIC HOSTS KE
          </p>

          <h1>Booking Dashboard</h1>

          <p>
            Manage event booking requests and client enquiries.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchBookings}
        >
          ↻ Refresh
        </button>
      </header>

      {/* STATS */}
      <section className="admin-stats">

        <div className="admin-stat-card">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="admin-stat-card pending">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="admin-stat-card confirmed">
          <span>Confirmed</span>
          <strong>{confirmedCount}</strong>
        </div>

        <div className="admin-stat-card completed">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>

      </section>

      {/* BOOKINGS */}
      <section className="admin-bookings">

        <div className="bookings-heading">
          <div>
            <p className="admin-eyebrow">
              BOOKING REQUESTS
            </p>

            <h2>Recent Bookings</h2>
          </div>

          <span className="booking-count">
            {bookings.length} booking
            {bookings.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading && (
          <div className="admin-message">
            Loading bookings...
          </div>
        )}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="admin-message">
            No bookings have been received yet.
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bookings-list">

            {bookings.map((booking) => (
              <article
                className="booking-admin-card"
                key={booking.id}
              >

                <div className="booking-card-top">

                  <div>
                    <span className="booking-id">
                      Booking #{booking.id}
                    </span>

                    <h3>{booking.name}</h3>

                    <p className="booking-event">
                      {booking.event_type}
                    </p>
                  </div>

                  <span
                    className={`status-badge ${booking.status}`}
                  >
                    {booking.status}
                  </span>

                </div>

                <div className="booking-details">

                  <div>
                    <span>Email</span>
                    <strong>{booking.email}</strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>{booking.phone}</strong>
                  </div>

                  <div>
                    <span>Event Date</span>
                    <strong>{booking.event_date}</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>{booking.location}</strong>
                  </div>

                  <div>
                    <span>Team Size</span>
                    <strong>{booking.team_size}</strong>
                  </div>

                  <div>
                    <span>Budget</span>
                    <strong>{booking.budget}</strong>
                  </div>

                </div>

                <div className="booking-message">
                  <span>Client Message</span>
                  <p>{booking.message}</p>
                </div>

                <div className="booking-actions">

                  <label htmlFor={`status-${booking.id}`}>
                    Update Status
                  </label>

                  <select
                    id={`status-${booking.id}`}
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(
                        booking.id,
                        e.target.value
                      )
                    }
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default AdminDashboard
