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
        className="rounded-lg p-4 text-center h-[100%] bg-white"
        style={{
          backgroundImage: 'url("/img/taekondo_logo.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-6xl font-bold mb-4 text-red-700">{formatTime(seconds)}</div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePauseClick}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleResetClick}
          >
            Reset
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleIncreaseClick}
          >
            +1 min
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
