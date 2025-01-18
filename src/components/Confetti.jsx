const Confetti = () => {
  // Create an array of 50 confetti pieces
  const confettiPieces = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-confetti-fall"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti 