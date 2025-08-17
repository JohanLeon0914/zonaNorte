import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

// Tipos para el historial
type Fighter = {
  name: string;
  wins: number;
  losses: number;
  totalMatches: number;
  lastMatch: string;
};

type Match = {
  id: string;
  date: string;
  redFighter: string;
  blueFighter: string;
  redScore: number;
  blueScore: number;
  redFaults: number;
  blueFaults: number;
  redAdvantages: number;
  blueAdvantages: number;
  winner: string;
  duration?: string;
};

type ScoreCounterProps = {
  color: "red" | "blue";
  score: number;
  faults: number;
  advantages: number;
  playerName: string;
  isNameSet: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrement2: () => void;
  onDecrement2: () => void;
  onIncrement3: () => void;
  onDecrement3: () => void;
  onIncrement5: () => void;
  onDecrement5: () => void;
  onAdvantageIncrement: () => void;
  onAdvantageDecrement: () => void;
  incrementFaults: () => void;
  onNameChange: (name: string) => void;
  onNameSubmit: () => void;
  registeredFighters: Fighter[];
  onFighterSelect: (name: string) => void;
};

const ScoreCounter = ({
  color,
  score,
  faults,
  advantages,
  playerName,
  isNameSet,
  onIncrement,
  onDecrement,
  onIncrement2,
  onDecrement2,
  onIncrement3,
  onDecrement3,
  onIncrement5,
  onDecrement5,
  onAdvantageIncrement,
  onAdvantageDecrement,
  incrementFaults,
  onNameChange,
  onNameSubmit,
  registeredFighters,
  onFighterSelect,
}: ScoreCounterProps) => {
  const bgColor = color === "red" ? "from-red-500 to-red-700" : "from-blue-500 to-blue-700";
  let colorTraducido = color === "red" ? "ROJO" : "AZUL";
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onNameSubmit();
    }
  };

  const displayName = playerName.trim() || colorTraducido;

  // Filtrar peleadores que coincidan con el input
  const filteredFighters = registeredFighters.filter(fighter =>
    fighter.name.toLowerCase().includes(playerName.toLowerCase()) && 
    playerName.length > 0 && 
    fighter.name.toLowerCase() !== playerName.toLowerCase() // No mostrar si ya está seleccionado exactamente
  );

  return (
    <div className={`relative mt-5 text-white rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${bgColor} shadow-xl ring-1 ring-white/10 w-full max-w-6xl`}>
      {/* Campo de nombre del peleador - solo se muestra si no se ha establecido el nombre */}
      {!isNameSet && (
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-2">Nombre del Peleador ({colorTraducido})</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Nombre del peleador ${colorTraducido.toLowerCase()}`}
            className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <p className="text-xs mt-1 opacity-70">Presiona Enter para confirmar</p>
          
          {/* Lista de autocompletado */}
          {filteredFighters.length > 0 && playerName.length > 0 && !isNameSet && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredFighters.map((fighter, index) => (
                <div
                  key={index}
                  onClick={() => onFighterSelect(fighter.name)}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0"
                >
                  <div className="font-semibold text-white">{fighter.name}</div>
                  <div className="text-xs text-gray-400">
                    {fighter.wins}W - {fighter.losses}L ({fighter.totalMatches} combates)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">{displayName.toUpperCase()}</h1>
      <div className="text-5xl sm:text-6xl font-black mb-4 drop-shadow">{score}</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">FALTAS {displayName.toUpperCase()}</h1>
      <div className="text-5xl sm:text-6xl font-black mb-4 drop-shadow">{faults}</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">VENTAJAS {displayName.toUpperCase()}</h1>
      <div className="text-5xl sm:text-6xl font-black mb-5 drop-shadow">{advantages}</div>
      
      {/* Primera fila: +1, -1, +2, -2 */}
      <div className="flex flex-wrap justify-center gap-3 mb-3">
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
          onClick={onIncrement2}
        >
          +2
        </button>
        <button
          className="rounded-xl bg-red-700 hover:bg-red-600 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onDecrement2}
        >
          -2
        </button>
      </div>

      {/* Segunda fila: +3, -3, +5, -5 */}
      <div className="flex flex-wrap justify-center gap-3 mb-3">
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
      </div>

      {/* Tercera fila: Ventaja, Falta */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className="rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={onAdvantageIncrement}
        >
          +Ventaja
        </button>
        <button
          className="rounded-xl bg-purple-800 hover:bg-purple-700 px-4 py-2.5 font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={onAdvantageDecrement}
        >
          -Ventaja
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
  const [redAdvantages, setRedAdvantages] = useState(0);
  const [blueAdvantages, setBlueAdvantages] = useState(0);
  const [redPlayerName, setRedPlayerName] = useState("");
  const [bluePlayerName, setBluePlayerName] = useState("");
  const [redNameSet, setRedNameSet] = useState(false);
  const [blueNameSet, setBlueNameSet] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [registeredFighters, setRegisteredFighters] = useState<Fighter[]>([]);
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [matchSaved, setMatchSaved] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedFighters = localStorage.getItem('jiujitsu_fighters');
    const savedMatches = localStorage.getItem('jiujitsu_matches');
    
    if (savedFighters) {
      setRegisteredFighters(JSON.parse(savedFighters));
    }
    
    if (savedMatches) {
      setMatchHistory(JSON.parse(savedMatches));
    }
  }, []);

  // Guardar peleador en localStorage
  const saveFighter = useCallback((name: string) => {
    // Leer directamente del localStorage para asegurar datos actualizados
    const savedFighters = localStorage.getItem('jiujitsu_fighters');
    let currentFighters: Fighter[] = savedFighters ? JSON.parse(savedFighters) : [];
    
    const existingFighter = currentFighters.find(f => f.name.toLowerCase() === name.toLowerCase());
    
    if (!existingFighter) {
      const newFighter: Fighter = {
        name: name,
        wins: 0,
        losses: 0,
        totalMatches: 0,
        lastMatch: new Date().toISOString()
      };
      
      currentFighters.push(newFighter);
      localStorage.setItem('jiujitsu_fighters', JSON.stringify(currentFighters));
      setRegisteredFighters(currentFighters);
    }
  }, []);

  // Actualizar estadísticas del peleador
  const updateFighterStats = useCallback((name: string, won: boolean) => {
    // Leer directamente del localStorage para asegurar datos actualizados
    const savedFighters = localStorage.getItem('jiujitsu_fighters');
    let currentFighters: Fighter[] = savedFighters ? JSON.parse(savedFighters) : [];
    
    // Buscar si el peleador ya existe
    const existingFighterIndex = currentFighters.findIndex(fighter => 
      fighter.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingFighterIndex >= 0) {
      // Actualizar peleador existente
      const currentFighter = currentFighters[existingFighterIndex];
      
      currentFighters[existingFighterIndex] = {
        ...currentFighter,
        wins: won ? currentFighter.wins + 1 : currentFighter.wins,
        losses: won ? currentFighter.losses : currentFighter.losses + 1,
        totalMatches: currentFighter.totalMatches + 1,
        lastMatch: new Date().toISOString()
      };
    } else {
      // Crear nuevo peleador
      const newFighter: Fighter = {
        name: name,
        wins: won ? 1 : 0,
        losses: won ? 0 : 1,
        totalMatches: 1,
        lastMatch: new Date().toISOString()
      };
      
      currentFighters.push(newFighter);
    }
    
    // Guardar en localStorage y actualizar estado
    localStorage.setItem('jiujitsu_fighters', JSON.stringify(currentFighters));
    setRegisteredFighters(currentFighters);
  }, []);

  // Guardar combate en historial
  const saveMatch = useCallback((winner: string, loser: string) => {
    const newMatch: Match = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      redFighter: redPlayerName || "Peleador Rojo",
      blueFighter: bluePlayerName || "Peleador Azul",
      redScore,
      blueScore,
      redFaults,
      blueFaults,
      redAdvantages,
      blueAdvantages,
      winner: winner === "Red" ? (redPlayerName || "Peleador Rojo") : (bluePlayerName || "Peleador Azul")
    };
    
    const updatedMatches = [newMatch, ...matchHistory];
    setMatchHistory(updatedMatches);
    localStorage.setItem('jiujitsu_matches', JSON.stringify(updatedMatches));
  }, [redPlayerName, bluePlayerName, redScore, blueScore, redFaults, blueFaults, redAdvantages, blueAdvantages, matchHistory]);

  // Event listener para Ctrl+Z
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        // Restaurar ambos inputs
        setRedNameSet(false);
        setBlueNameSet(false);
      }
    };

    // Agregar el event listener
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Efecto para manejar el guardado de datos cuando hay un ganador
  useEffect(() => {
    if (winner && !matchSaved) {
      const redName = redPlayerName.trim() || "Peleador Rojo";
      const blueName = bluePlayerName.trim() || "Peleador Azul";
      
      // Asegurar que ambos peleadores estén registrados
      saveFighter(redName);
      saveFighter(blueName);
      
      // Guardar combate y actualizar estadísticas solo si no es empate
      if (winner === "Red") {
        saveMatch("Red", "Blue");
        updateFighterStats(redName, true);
        updateFighterStats(blueName, false);
        setMatchSaved(true);
      } else if (winner === "Blue") {
        saveMatch("Blue", "Red");
        updateFighterStats(blueName, true);
        updateFighterStats(redName, false);
        setMatchSaved(true);
      }
      // Para empates no guardamos estadísticas pero marcamos como guardado
      else if (winner === "Tie") {
        setMatchSaved(true);
      }
    }
  }, [winner, redPlayerName, bluePlayerName, redScore, blueScore, redFaults, blueFaults, redAdvantages, blueAdvantages, matchSaved, saveFighter, updateFighterStats, saveMatch]);

  const handleTerminateClick = () => {
    if(redFaults >= 3) {
      setWinner("Blue");
    } else if(blueFaults >= 3) {
      setWinner("Red");
    } else if (redScore > blueScore) {
      setWinner("Red");
    } else if (blueScore > redScore) {
      setWinner("Blue");
    } else if(blueScore === redScore) {
      // Si hay empate en puntos, verificar ventajas
      if(redAdvantages > blueAdvantages) {
        setWinner("Red");
      } else if(blueAdvantages > redAdvantages) {
        setWinner("Blue");
      } else if(redFaults > blueFaults) {
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
    const newFaults = redFaults + 1;
    setRedFaults(newFaults);
    if (newFaults >= 3) {
      handleTerminateClick()
    }
  };

  const handleBlueFault = () => {
    const newFaults = blueFaults + 1;
    setBlueFaults(newFaults);
    if(newFaults >= 3) {
      handleTerminateClick()
    } 
  };

  const handleRedAdvantageIncrement = () => {
    setRedAdvantages(redAdvantages + 1);
  };

  const handleRedAdvantageDecrement = () => {
    if (redAdvantages > 0) {
      setRedAdvantages(redAdvantages - 1);
    }
  };

  const handleBlueAdvantageIncrement = () => {
    setBlueAdvantages(blueAdvantages + 1);
  };

  const handleBlueAdvantageDecrement = () => {
    if (blueAdvantages > 0) {
      setBlueAdvantages(blueAdvantages - 1);
    }
  };

  const handleRestart = () => {
    setBlueScore(0);
    setRedScore(0);
    setBlueFaults(0);
    setRedFaults(0);
    setRedAdvantages(0);
    setBlueAdvantages(0);
    setWinner(null);
    setRedNameSet(false);
    setBlueNameSet(false);
    setMatchSaved(false); // Resetear la bandera de guardado
  };

  const handleRedNameSubmit = () => {
    if (redPlayerName.trim()) {
      setRedNameSet(true);
      saveFighter(redPlayerName.trim());
    }
  };

  const handleBlueNameSubmit = () => {
    if (bluePlayerName.trim()) {
      setBlueNameSet(true);
      saveFighter(bluePlayerName.trim());
    }
  };

  const handleRedFighterSelect = (name: string) => {
    setRedPlayerName(name);
    setRedNameSet(true); // Auto-confirmar cuando se selecciona de la lista
  };

  const handleBlueFighterSelect = (name: string) => {
    setBluePlayerName(name);
    setBlueNameSet(true); // Auto-confirmar cuando se selecciona de la lista
  };

  const handleRedIncrement = () => {
    setRedScore(redScore + 1);
  };

  const handleRedDecrement = () => {
    if (redScore > 0) {
      setRedScore(redScore - 1);
    }
  };

  const handleRedIncrement2 = () => {
    setRedScore(redScore + 2);
  };

  const handleRedDecrement2 = () => {
    if (redScore >= 2) {
      setRedScore(redScore - 2);
    } else {
      setRedScore(0);
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

  const handleBlueIncrement2 = () => {
    setBlueScore(blueScore + 2);
  };

  const handleBlueDecrement2 = () => {
    if (blueScore >= 2) {
      setBlueScore(blueScore - 2);
    } else {
      setBlueScore(0);
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
    const redName = redPlayerName.trim() || "Peleador Rojo";
    const blueName = bluePlayerName.trim() || "Peleador Azul";
    
    switch (winner) {
      case "Red":
        Swal.fire({
          title: '',
          html: `
            <div class="victory-modal">
              <div class="victory-header">
                <div class="trophy-icon">🏆</div>
                <h1 class="victory-title">¡VICTORIA!</h1>
              </div>
              <div class="winner-section">
                <div class="winner-name">${redName}</div>
              </div>
              <div class="score-section">
                <div class="final-score">
                  <span class="score-red">${redScore}</span>
                  <span class="score-separator">-</span>
                  <span class="score-blue">${blueScore}</span>
                </div>
                <div class="score-label">Puntuación Final</div>
              </div>
              <div class="stats-section">
                <div class="stat-item">
                  <span class="stat-label">Faltas:</span>
                  <span class="stat-value">${redFaults} - ${blueFaults}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Ventajas:</span>
                  <span class="stat-value">${redAdvantages} - ${blueAdvantages}</span>
                </div>
              </div>
              <div class="victory-footer">
                <div class="victory-message">¡Excelente combate!</div>
              </div>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Nueva Pelea',
          confirmButtonColor: '#ef4444',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          backdrop: 'rgba(0, 0, 0, 0.8)',
          customClass: {
            popup: 'victory-popup',
            confirmButton: 'victory-confirm-btn'
          },
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut'
          }
        })
        return `¡Gana ${redName}!`;
        break;
      case "Blue":
        Swal.fire({
          title: '',
          html: `
            <div class="victory-modal">
              <div class="victory-header">
                <div class="trophy-icon">🏆</div>
                <h1 class="victory-title">¡VICTORIA!</h1>
              </div>
              <div class="winner-section">
                <div class="winner-name">${blueName}</div>
              </div>
              <div class="score-section">
                <div class="final-score">
                  <span class="score-red">${redScore}</span>
                  <span class="score-separator">-</span>
                  <span class="score-blue">${blueScore}</span>
                </div>
                <div class="score-label">Puntuación Final</div>
              </div>
              <div class="stats-section">
                <div class="stat-item">
                  <span class="stat-label">Faltas:</span>
                  <span class="stat-value">${redFaults} - ${blueFaults}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Ventajas:</span>
                  <span class="stat-value">${redAdvantages} - ${blueAdvantages}</span>
                </div>
              </div>
              <div class="victory-footer">
                <div class="victory-message">¡Excelente combate!</div>
              </div>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Nueva Pelea',
          confirmButtonColor: '#3b82f6',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          backdrop: 'rgba(0, 0, 0, 0.8)',
          customClass: {
            popup: 'victory-popup',
            confirmButton: 'victory-confirm-btn'
          },
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut'
          }
        })
        return `¡Gana ${blueName}!`;
        break;
      case "Tie":
        Swal.fire({
          title: '',
          html: `
            <div class="victory-modal tie-modal">
              <div class="victory-header">
                <div class="trophy-icon">🤝</div>
                <h1 class="victory-title">¡EMPATE!</h1>
              </div>
              <div class="winner-section">
                <div class="winner-name">Combate Técnico</div>
                <div class="winner-belt">Sin Ganador</div>
              </div>
              <div class="score-section">
                <div class="final-score">
                  <span class="score-red">${redScore}</span>
                  <span class="score-separator">-</span>
                  <span class="score-blue">${blueScore}</span>
                </div>
                <div class="score-label">Puntuación Final</div>
              </div>
              <div class="stats-section">
                <div class="stat-item">
                  <span class="stat-label">Faltas:</span>
                  <span class="stat-value">${redFaults} - ${blueFaults}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Ventajas:</span>
                  <span class="stat-value">${redAdvantages} - ${blueAdvantages}</span>
                </div>
              </div>
              <div class="victory-footer">
                <div class="victory-message">¡Gran nivel de ambos peleadores!</div>
              </div>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Nueva Pelea',
          confirmButtonColor: '#6b7280',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          backdrop: 'rgba(0, 0, 0, 0.8)',
          customClass: {
            popup: 'victory-popup',
            confirmButton: 'victory-confirm-btn'
          },
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut'
          }
        })
        return "¡Empate técnico!";
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-6 flex-col sm:flex-row w-full">
        <ScoreCounter
          color="red"
          score={redScore}
          faults={redFaults}
          advantages={redAdvantages}
          playerName={redPlayerName}
          isNameSet={redNameSet}
          onIncrement={handleRedIncrement}
          onDecrement={handleRedDecrement}
          onIncrement2={handleRedIncrement2}
          onDecrement2={handleRedDecrement2}
          onIncrement3={handleRedIncrement3}
          onDecrement3={handleRedDecrement3}
          onIncrement5={handleRedIncrement5}
          onDecrement5={handleRedDecrement5}
          onAdvantageIncrement={handleRedAdvantageIncrement}
          onAdvantageDecrement={handleRedAdvantageDecrement}
          incrementFaults={handleRedFault}
          onNameChange={setRedPlayerName}
          onNameSubmit={handleRedNameSubmit}
          registeredFighters={registeredFighters}
          onFighterSelect={handleRedFighterSelect}
        />
        <ScoreCounter
          color="blue"
          score={blueScore}
          faults={blueFaults}
          advantages={blueAdvantages}
          playerName={bluePlayerName}
          isNameSet={blueNameSet}
          onIncrement={handleBlueIncrement}
          onDecrement={handleBlueDecrement}
          onIncrement2={handleBlueIncrement2}
          onDecrement2={handleBlueDecrement2}
          onIncrement3={handleBlueIncrement3}
          onDecrement3={handleBlueDecrement3}
          onIncrement5={handleBlueIncrement5}
          onDecrement5={handleBlueDecrement5}
          onAdvantageIncrement={handleBlueAdvantageIncrement}
          onAdvantageDecrement={handleBlueAdvantageDecrement}
          incrementFaults={handleBlueFault}
          onNameChange={setBluePlayerName}
          onNameSubmit={handleBlueNameSubmit}
          registeredFighters={registeredFighters}
          onFighterSelect={handleBlueFighterSelect}
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
