
type ScoreCounterProps = {
  color: 'red' | 'blue',
  score: number,
  onIncrement: () => void,
  onDecrement: () => void,
}

const ScoreCounter = ({ color, score, onIncrement, onDecrement }: ScoreCounterProps) => {
  const bgColor = color === 'red' ? 'bg-red-500' : 'bg-blue-500'
  let colorSpain = color === 'red' ? "Rojo" : "Azul"

  return (
    <div className={`text-white rounded-lg p-4 ${bgColor}`}>
      <h1 className="text-3xl font-bold mb-4">Puntos {colorSpain.toUpperCase()} </h1>
      <div className="text-5xl font-bold mb-4">{score}</div>
      <div className="flex justify-center space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onIncrement}>+1</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onDecrement}>-1</button>
      </div>
    </div>
  )
}


export default ScoreCounter;