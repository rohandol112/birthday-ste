import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Confetti from '../components/Confetti'

const messages = [
  { id: 1, text: "Hey Swamini!" },
  { id: 2, text: "I really like your name btw!" },
  { id: 3, text: "It's your birthday!!! :D" },
  { id: 4, text: "Happy birthday to you!! Yeee!" },
  { id: 5, text: "That's what I was going to say..." },
  { id: 6, text: "But then I stopped." },
  { id: 7, text: "I realised, I wanted to do something special." },
  { id: 8, text: "Because," },
  { id: 9, text: "You are awesome :)" },
  { id: 10, text: "S O" },
  { id: 11, text: "Happy Birthday! 🎂", isFinal: true }
]

function Birthday() {
  const navigate = useNavigate()
  const textRef = useRef(null)
  const currentMessageRef = useRef(0)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const nextMessage = () => {
    const messageElement = textRef.current
    const currentIndex = currentMessageRef.current

    if (currentIndex >= messages.length) {
      // Start playing the video after the last message
      setVideoPlaying(true)
      return
    }

    gsap.to(messageElement, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        if (currentIndex < messages.length) {
          messageElement.textContent = messages[currentIndex].text
          gsap.fromTo(messageElement,
            {
              opacity: 0,
              y: 100
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.7)"
            }
          )
          currentMessageRef.current++
          
          if (currentIndex < messages.length - 1) {
            setTimeout(nextMessage, 1000

            )
          } else {
            // After the last message, start the video after a short delay
            setTimeout(() => {
              setVideoPlaying(true)
            }, 1000) // Delay before starting the video
          }
        }
      }
    })
  }

  useEffect(() => {
    // Initial animation
    const messageElement = textRef.current
    gsap.fromTo(messageElement,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.7)",
        onComplete: () => {
          setTimeout(nextMessage, 1500)
        }
      }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center">
        <p 
          ref={textRef}
          className="text-4xl text-white font-medium drop-shadow-lg"
        >
          {messages[0].text}
        </p>
      </div>

      {/* Cake Cutting Video */}
      {videoPlaying && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <h2 className="text-2xl text-white mb-4">Watch the Cake Cutting!</h2>
          <div className="relative w-full max-w-md">
            <video 
              className="w-full h-auto rounded-lg shadow-lg" 
              controls 
              autoPlay 
              muted
              onEnded={() => navigate('/')} // Navigate back after video ends
            >
              <source src="/assets/cake-cutting.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

export default Birthday 