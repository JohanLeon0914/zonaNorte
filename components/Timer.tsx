import Image from "next/image";
import { useState, useEffect } from "react";

type TimerProps = {
  initialSeconds: number;
};

const Timer = ({ initialSeconds }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
  
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
  
    if (seconds === 0 && intervalId) {
      clearInterval(intervalId);
    }
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [seconds, isRunning]);

  const handlePauseClick = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const handleIncreaseClick = () => {
    setSeconds((prevSeconds) => prevSeconds + 60);
  };

  const handleDecreaseClick = () => {
    if (seconds > 60) {
      setSeconds((prevSeconds) => prevSeconds - 60);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-center h-[100%] border border-white border-opacity-10 bg-gray-900 bg-opacity-40 backdrop-blur-xl shadow-2xl"
        style={{
          backgroundImage: 'url("/img/taekondo_logo.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black bg-opacity-20 via-black bg-opacity-30 to-black bg-opacity-60" />
        <div className="relative text-7xl sm:text-8xl font-extrabold mb-5 tracking-widest text-red-400 drop-shadow">{formatTime(seconds)}</div>
        <div className="relative flex flex-wrap justify-center gap-3">
                     <button
             className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-green-600 hover:bg-green-500 focus:ring-green-400"
             onClick={handlePauseClick}
           >
             {isRunning ? "Pausar" : "Reanudar"}
           </button>
           <button
             className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-blue-600 hover:bg-blue-500 focus:ring-blue-400"
             onClick={handleResetClick}
           >
             Reiniciar
           </button>
          <button
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-black shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-yellow-300 hover:bg-yellow-400 focus:ring-yellow-300"
            onClick={handleIncreaseClick}
          >
            +1 min
          </button>
          <button
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-red-600 hover:bg-red-500 focus:ring-red-400"
            onClick={handleDecreaseClick}
          >
            -1 min
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
