import { useState } from 'react'
import './App.css'
import aboutImage from './assets/images/epic.jpeg'

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleBookingSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')
    setSubmitted(false)

    const form = e.target

    const bookingData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      event_type: form.eventType.value,
      event_date: form.date.value,
      location: form.location.value,
      team_size: form.teamSize.value,
      budget: form.budget.value,
      message: form.message.value,
    }

    try {
      const response = await fetch(
        'http://localhost:5001/api/bookings/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to submit booking request.'
        )
      }

      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error('Booking submission error:', err)
      setError(
        err.message ||
        'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="site">

            {/* NAVIGATION */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo">
            <span>EPIC</span> HOSTS KE
          </a>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#booking" className="nav-button">
            Book Us
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => {
              document
                .querySelector('.nav-links')
                .classList.toggle('mobile-open')
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-container">

            <div className="hero-content">
              <p className="eyebrow">
                PROFESSIONAL EVENT STAFFING
              </p>

              <h1>
                We Make
                <span> Every Event Epic.</span>
              </h1>

              <p className="hero-text">
                Professional ushers, hosts and event support teams
                helping you create memorable experiences for every guest.
              </p>

              <div className="hero-actions">
                <a href="#booking" className="primary-button">
                  Book Our Team
                </a>

                <a href="#services" className="secondary-button">
                  Explore Services
                </a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>100+</strong>
                  <span>Events Supported</span>
                </div>

                <div>
                  <strong>50+</strong>
                  <span>Professional Hosts</span>
                </div>

                <div>
                  <strong>5+</strong>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85"
                alt="Professional event"
                className="hero-image"
              />

              <div className="floating-card">
                <div className="floating-icon">✦</div>
                <div>
                  <strong>Professional Service</strong>
                  <span>From arrival to farewell.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="about section" id="about">
          <div className="section-container about-grid">

            <div className="about-image">
              <div className="about-image-main">
                <img
                  src={aboutImage}
                  alt="Epic Hosts KE event"
                />
              </div>

              <div className="experience-card">
                <strong>5+</strong>
                <span>
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </div>

            <div className="about-content">
              <p className="eyebrow">
                ABOUT EPIC HOSTS KE
              </p>

              <h2>
                Creating Experiences
                <span> That Matter.</span>
              </h2>

              <p>
                Epic Hosts KE provides professional event hosting,
                ushering and guest management services designed to
                make every event organized, welcoming and memorable.
              </p>

              <p>
                From corporate functions and conferences to weddings,
                launches and brand activations, our team brings
                professionalism, energy and attention to detail to
                every assignment.
              </p>

              <a href="#booking" className="text-link">
                Work With Us →
              </a>
            </div>

          </div>
        </section>

        {/* SERVICES */}
        <section className="services section" id="services">
          <div className="section-container">

            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  WHAT WE DO
                </p>

                <h2>
                  Services Built Around
                  <span> Your Event.</span>
                </h2>
              </div>

              <p>
                Whatever the occasion, we provide the people and
                professionalism needed to make it run smoothly.
              </p>
            </div>

            <div className="services-grid">

              <div className="service-card featured">
                <span className="service-number">01</span>
                <div className="service-icon">✦</div>

                <h3>Event Ushering</h3>

                <p>
                  Professional ushers who welcome guests, manage
                  seating and help create a smooth guest experience.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

              <div className="service-card">
                <span className="service-number">02</span>
                <div className="service-icon">◉</div>

                <h3>Event Hosting</h3>

                <p>
                  Confident and engaging hosts and MCs who keep
                  your programme flowing and your audience engaged.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

              <div className="service-card">
                <span className="service-number">03</span>
                <div className="service-icon">◇</div>

                <h3>Brand Activations</h3>

                <p>
                  Energetic teams to represent your brand and
                  connect with audiences during activations.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

              <div className="service-card">
                <span className="service-number">04</span>
                <div className="service-icon">▣</div>

                <h3>Corporate Events</h3>

                <p>
                  Professional event support for conferences,
                  seminars, launches and corporate functions.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

              <div className="service-card">
                <span className="service-number">05</span>
                <div className="service-icon">♡</div>

                <h3>Weddings & Private Events</h3>

                <p>
                  Warm and professional teams to welcome guests
                  and help your special occasion run beautifully.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

              <div className="service-card">
                <span className="service-number">06</span>
                <div className="service-icon">↗</div>

                <h3>Promotional Events</h3>

                <p>
                  Friendly promotional teams that help businesses
                  attract attention and engage potential customers.
                </p>

                <a href="#booking">
                  Book Service →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="portfolio section" id="portfolio">
          <div className="section-container">

            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  OUR WORK
                </p>

                <h2>
                  Moments We've
                  <span> Helped Create.</span>
                </h2>
              </div>

              <p>
                A glimpse into the types of events where the
                Epic Hosts KE team brings energy and professionalism.
              </p>
            </div>

            <div className="portfolio-grid">

              <div className="portfolio-item portfolio-large">
                <img
                  src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85"
                  alt="Corporate event"
                />

                <div className="portfolio-overlay">
                  <span>Corporate Events</span>
                </div>
              </div>

              <div className="portfolio-item">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85"
                  alt="Wedding event"
                />

                <div className="portfolio-overlay">
                  <span>Weddings</span>
                </div>
              </div>

              <div className="portfolio-item">
                <img
                  src="https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=900&q=85"
                  alt="Live event"
                />

                <div className="portfolio-overlay">
                  <span>Live Events</span>
                </div>
              </div>

              <div className="portfolio-item">
                <img
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85"
                  alt="Conference"
                />

                <div className="portfolio-overlay">
                  <span>Conferences</span>
                </div>
              </div>

              <div className="portfolio-item">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85"
                  alt="Brand activation"
                />

                <div className="portfolio-overlay">
                  <span>Brand Activations</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="why section">
          <div className="section-container why-grid">

            <div className="why-image">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85"
                alt="Professional event team"
              />
            </div>

            <div className="why-content">
              <p className="eyebrow">
                WHY EPIC HOSTS KE
              </p>

              <h2>
                More Than Ushers.
                <span> We Create Experiences.</span>
              </h2>

              <div className="why-list">

                <div className="why-item">
                  <div className="why-icon">✓</div>

                  <div>
                    <h3>Professional Team</h3>

                    <p>
                      Well-presented, trained and confident event
                      professionals.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-icon">✓</div>

                  <div>
                    <h3>Reliable Service</h3>

                    <p>
                      We understand that your event depends on
                      people who show up prepared and on time.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-icon">✓</div>

                  <div>
                    <h3>Guest-Focused</h3>

                    <p>
                      We help your guests feel welcomed, informed
                      and well taken care of.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* BOOKING */}
        <section className="booking section" id="booking">
          <div className="section-container">

            <div className="booking-wrapper">

              <div className="booking-intro">
                <p className="eyebrow">
                  LET'S WORK TOGETHER
                </p>

                <h2>
                  Planning Your
                  <span> Next Event?</span>
                </h2>

                <p>
                  Tell us a little about your event and the services
                  you need. Our team will get back to you with the
                  next steps.
                </p>

                <div className="booking-contact">
                  <div>
                    <span>Email</span>
                    <strong>
                      info@epichostske.com
                    </strong>
                  </div>

                  <div>
                    <span>WhatsApp</span>
                    <strong>
                      Available on request
                    </strong>
                  </div>
                </div>
              </div>

              <form
                className="booking-form"
                onSubmit={handleBookingSubmit}
              >

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+254 7XX XXX XXX"
                      pattern="(\+254|0)7[0-9]{8}"
                      title="Please enter a valid Kenyan phone number, e.g. +254712345678 or 0712345678"
                      required
                    />
                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventType">
                      Event Type
                    </label>

                    <select
                      id="eventType"
                      name="eventType"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select event type
                      </option>

                      <option value="ushering">
                        Event Ushering
                      </option>

                      <option value="hosting">
                        Event Hosting / MC
                      </option>

                      <option value="brand-activation">
                        Brand Activation
                      </option>

                      <option value="corporate">
                        Corporate Event
                      </option>

                      <option value="wedding">
                        Wedding / Private Event
                      </option>

                      <option value="promotional">
                        Promotional Event
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="date">
                      Event Date
                    </label>

                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">
                      Event Location
                    </label>

                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="e.g. Nakuru, Nairobi"
                      required
                    />
                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group">
                    <label htmlFor="teamSize">
                      Number of Ushers / Hosts
                    </label>

                    <select
                      id="teamSize"
                      name="teamSize"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select number
                      </option>

                      <option value="1-5">
                        1 - 5
                      </option>

                      <option value="6-10">
                        6 - 10
                      </option>

                      <option value="11-20">
                        11 - 20
                      </option>

                      <option value="21-50">
                        21 - 50
                      </option>

                      <option value="50+">
                        50+
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget">
                      Estimated Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>

                      <option value="below-20k">
                        Below KSh 20,000
                      </option>

                      <option value="20k-50k">
                        KSh 20,000 - 50,000
                      </option>

                      <option value="50k-100k">
                        KSh 50,000 - 100,000
                      </option>

                      <option value="100k-250k">
                        KSh 100,000 - 250,000
                      </option>

                      <option value="250k+">
                        KSh 250,000+
                      </option>
                    </select>
                  </div>

                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Tell Us About Your Event
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your event, the services you need and any other important details..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Sending Request...'
                    : submitted
                      ? 'Booking Request Sent ✓'
                      : 'Send Booking Request →'}
                </button>

                {submitted && (
                  <div className="booking-success">
                    ✓ Your booking request has been received. Our team will
                    get back to you soon.
                </div>
                  )}

                  {error && (
                    <div className="booking-error">
                      {error}
                    </div>
                  )}

                <p className="form-note">
                  We will review your request and get back to you.
                </p>

              </form>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer" id="contact">

          <div className="section-container footer-grid">

            <div className="footer-brand">
              <a href="#home" className="footer-logo">
                <span>EPIC</span> HOSTS KE
              </a>

              <p>
                Professional event hosts, ushers and staffing
                solutions for memorable experiences.
              </p>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>

              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
            </div>

            <div className="footer-column">
              <h4>Services</h4>

              <a href="#services">
                Event Ushering
              </a>

              <a href="#services">
                Event Hosting
              </a>

              <a href="#services">
                Brand Activations
              </a>

              <a href="#services">
                Corporate Events
              </a>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>

              <a href="mailto:info@epichostske.com">
                info@epichostske.com
              </a>

              <span>Kenya</span>
            </div>

          </div>

          <div className="footer-bottom">
            <div className="section-container">
              © {new Date().getFullYear()} Epic Hosts KE.
              All rights reserved.
            </div>
          </div>

        </footer>

      </main>
    </div>
  )
}

export default App