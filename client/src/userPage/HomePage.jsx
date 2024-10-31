import GeminiChat from '../components/GeminiChat'
import WeatherApp from '../components/WeatherApp'
import './HomePage.css'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const username = useSelector((store) => store.auth.username)

  return (
    <section className="homepage-container">
      <div className="content-wrapper">
        <p>{username}</p>
        <WeatherApp />
        <div className="chat-container">
          <h2>Chat with Gemini AI</h2>
          <GeminiChat />
        </div>
      </div>
    </section>
  )
}
