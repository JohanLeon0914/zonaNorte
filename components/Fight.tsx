import { useState } from "react";
import Swal from "sweetalert2";

type ScoreCounterProps = {
  color: "red" | "blue";
  score: number;
  faults: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrement3: () => void;
  onDecrement3: () => void;
  onIncrement5: () => void;
  onDecrement5: () => void;
  incrementFaults: () => void;
};

const ScoreCounter = ({
  color,
  score,
  faults,
  onIncrement,
  onDecrement,
  onIncrement3,
  onDecrement3,
  onIncrement5,
  onDecrement5,
  incrementFaults,
}: ScoreCounterProps) => {
  const bgColor = color === "red" ? "from-red-500 to-red-700" : "from-blue-500 to-blue-700";
  let colorTraducido = color === "red" ? "ROJO" : "AZUL";
  return (
    <div className={`relative mt-5 text-white rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${bgColor} shadow-xl ring-1 ring-white/10`}>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">PUNTOS {colorTraducido.toUpperCase()}</h1>
      <div className="text-5xl sm:text-6xl font-black mb-4 drop-shadow">{score}</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">FALTAS {colorTraducido.toUpperCase()}</h1>
      <div className="text-5xl sm:text-6xl font-black mb-5 drop-shadow">{faults}</div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className="rounded-xl bg-green-500 hover:bg-green-400 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onIncrement}
        >
          +1
        </button>
        <button
          className="rounded-xl bg-red-700 hover:bg-red-600 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onDecrement}
        >
          -1
        </button>

        <button
          className="rounded-xl bg-green-500 hover:bg-green-400 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onIncrement3}
        >
          +3
        </button>
        <button
          className="rounded-xl bg-red-700 hover:bg-red-600 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onDecrement3}
        >
          -3
        </button>
        
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <button
          className="rounded-xl bg-green-500 hover:bg-green-400 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={onIncrement5}
        >
          +5
        </button>
        <button
          className="rounded-xl bg-red-700 hover:bg-red-600 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onDecrement5}
        >
          -5
        </button>

        <button
          className="rounded-xl bg-white bg-opacity-90 text-gray-900 hover:bg-white px-6 py-2.5 font-extrabold shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60"
          onClick={incrementFaults}
        >
          Falta
        </button>
        
      </div>

    </div>
  );
};

const Fight = () => {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [blueFaults, setBlueFaults] = useState(0);
  const [redFaults, setRedFaults] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const handleTerminateClick = () => {
    if(redFaults >= 4) {
      setWinner("Blue");
    } else if(blueFaults >= 4) {
      setWinner("Red");
    }else if (redScore > blueScore) {
      setWinner("Red");
    } else if (blueScore > redScore) {
      setWinner("Blue");
    } else if(blueScore === redScore) {
      if(redFaults > blueFaults) {
        setWinner("Blue");
      } else if(redFaults < blueFaults) {
        setWinner("Red");
      } else {
        setWinner("Tie");
      }
    } else {
      setWinner("Tie");
    }
  };

  const handleRedFault = () => {
    setRedFaults(redFaults + 1 );
    console.log(redFaults)
    if (redFaults >= 4) {
      handleTerminateClick()
    }
  };

  const handleBlueFault = () => {
    setBlueFaults(blueFaults + 1);
    if(blueFaults >= 4) {
      handleTerminateClick()
    } 
  };

  const handleRestart = () => {
    setBlueScore(0);
    setRedScore(0);
    setBlueFaults(0);
    setRedFaults(0);
    setWinner(null);
  };

  const handleRedIncrement = () => {
    setRedScore(redScore + 1);
  };

  const handleRedDecrement = () => {
    if (redScore > 0) {
      setRedScore(redScore - 1);
    }
  };

  const handleRedIncrement3 = () => {
    setRedScore(redScore + 3);
  };

  const handleRedDecrement3 = () => {
    if (redScore >= 3) {
      setRedScore(redScore - 3);
    } else {
      setRedScore(0);
    }
  };

  const handleRedIncrement5 = () => {
    setRedScore(redScore + 5);
  };

  const handleRedDecrement5 = () => {
    if (redScore >= 5) {
      setRedScore(redScore - 5);
    }else {
      setRedScore(0);
    }
  };

  const handleBlueIncrement = () => {
    setBlueScore(blueScore + 1);
  };

  const handleBlueDecrement = () => {
    if (blueScore > 0) {
      setBlueScore(blueScore - 1);
    }
  };

  const handleBlueIncrement3 = () => {
    setBlueScore(blueScore + 3);
  };

  const handleBlueDecrement3 = () => {
    if (blueScore >= 3) {
      setBlueScore(blueScore - 3);
    }else {
      setRedScore(0);
    }
  };

  const handleBlueIncrement5 = () => {
    setBlueScore(blueScore + 5);
  };

  const handleBlueDecrement5 = () => {
    if (blueScore >= 5) {
      setBlueScore(blueScore - 5);
    }else {
      setRedScore(0);
    }
  };

  

  const getWinner = () => {
    switch (winner) {
      case "Red":
        Swal.fire({
          title: 'Gana el rojo!',
          imageUrl: 'img/taekondovs.png',
          background: 'red',
          color: 'black',
          imageWidth: 500,
          imageHeight: 400,
          imageAlt: 'Custom image',
        })
        return "Gana el rojo!";
        break;
      case "Blue":
        Swal.fire({
          title: 'Gana el azul!',
          imageUrl: 'img/taekondovs.png',
          background: 'blue',
          color: 'black',
          imageWidth: 500,
          imageHeight: 400,
          imageAlt: 'Custom image',
        })
        return "Gana el azul!";
        break;
      case "Tie":
        Swal.fire({
          title: 'Empate técnico!',
          imageUrl: 'img/taekondovs.png',
          color: 'black',
          imageWidth: 500,
          imageHeight: 400,
          imageAlt: 'Custom image',
        })
        return "Empate técnico!";
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6 flex-col sm:flex-row">
        <ScoreCounter
          color="red"
          score={redScore}
          faults={redFaults}
          onIncrement={handleRedIncrement}
          onDecrement={handleRedDecrement}
          onIncrement3={handleRedIncrement3}
          onDecrement3={handleRedDecrement3}
          onIncrement5={handleRedIncrement5}
          onDecrement5={handleRedDecrement5}
          incrementFaults={handleRedFault}
        />
        <ScoreCounter
          color="blue"
          score={blueScore}
          faults={blueFaults}
          onIncrement={handleBlueIncrement}
          onDecrement={handleBlueDecrement}
          onIncrement3={handleBlueIncrement3}
          onDecrement3={handleBlueDecrement3}
          onIncrement5={handleBlueIncrement5}
          onDecrement5={handleBlueDecrement5}
          incrementFaults={handleBlueFault}
        />
      </div>
      {winner ? (
        <div className="text-2xl font-bold mt-4 items-center text-center">
          {getWinner()}
          <br />
          <button
            className="mt-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-5 shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={handleRestart}
          >
            Reiniciar
          </button>
        </div>
      ) : (
        <button
          className="rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-5 shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
          onClick={handleTerminateClick}
        >
          Terminar pelea
        </button>
      )}
    </div>
  );
};

export default Fight;
