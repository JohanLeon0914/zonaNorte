type ScoreCounterProps = {
  color: 'red' | 'blue';
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const ScoreCounter = ({ color, score, onIncrement, onDecrement }: ScoreCounterProps) => {
  const gradient = color === 'red' ? 'from-red-500 to-red-700' : 'from-blue-500 to-blue-700';
  const colorSpain = color === 'red' ? 'ROJO' : 'AZUL';

  return (
    <div className={`text-white rounded-2xl p-5 bg-gradient-to-br ${gradient} shadow-xl ring-1 ring-white/10`}>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Puntos {colorSpain.toUpperCase()} </h1>
      <div className="text-5xl sm:text-6xl font-black mb-5 drop-shadow">{score}</div>
      <div className="flex justify-center gap-3">
        <button className="rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold py-2.5 px-4 shadow focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onIncrement}>+1</button>
        <button className="rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 px-4 shadow focus:outline-none focus:ring-2 focus:ring-red-400" onClick={onDecrement}>-1</button>
      </div>
    </div>
  );
};

export default ScoreCounter;