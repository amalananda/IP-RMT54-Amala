// src/components/GeminiChat.js
import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyA9lnkXWwK_bM2-VFjxhTRO_dHEKrwWrCM")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
    try {
      const result = await model.generateContent(prompt + " Berikan jawaban secara singkat, jelas dan padat hanya nama tempat wisata saja di provinsi jawa tengah ")
      setResponse(result.response.text())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Tulis prompt di sini..."
      />
      <button onClick={handleSend}>Kirim</button>
      <p>Respon: {response}</p>
    </div>
  )
}

export default GeminiChat
