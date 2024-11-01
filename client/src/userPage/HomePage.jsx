import GeminiChat from '../components/GeminiChat'
import WeatherApp from '../components/WeatherApp'
import './HomePage.css'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const username = useSelector((store) => store.auth.username)

  return (
    <section className="homepage-container">
      <div className="username-container">
        <p>Hai!! {username}</p>
        <p>Yuk jalan-jalan di Jawa Tengah</p>
      </div>
      <div className="chat-container">
        <h2>Chat with Gemini AI</h2>
        <GeminiChat />
      </div>
      <div className="content-wrapper">
        <WeatherApp />

      </div>
    </section>

  )
}
