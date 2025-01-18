import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const surpriseRef = useRef(null);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial animations for title and subtitle
    tl.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "bounce.out",
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, "-=0.5");
    
    // Floating effect for the background
    gsap.to(containerRef.current, {
      backgroundPosition: "200% 0%",
      duration: 10,
      repeat: -1,
      ease: "linear"
    });
  }, []);

  const handleClick = () => {
    if (!showSurprise) {
      setShowSurprise(true);
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
              navigate('/birthday');
            }
          });
        }
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 cursor-pointer"
      onClick={handleClick}
    >
      <h1 
        ref={titleRef}
        className="text-6xl font-bold text-white drop-shadow-lg mb-4"
      >
        Happy Birthday, Swamini!
      </h1>
      <p 
        ref={subtitleRef}
        className="text-2xl text-white drop-shadow-md"
      >
        Click anywhere to reveal your special message!
      </p>

      {/* Surprise Message */}
      {showSurprise && (
        <div 
          ref={surpriseRef}
          className="absolute text-4xl text-yellow-300 font-bold animate-bounce"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          🎉 Surprise! 🎉
        </div>
      )}

      {/* Floating stars or confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            {['✨', '💫', '⭐️', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;