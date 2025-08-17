import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
  winner: string;
  duration?: string;
};

const History = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'fighters' | 'matches'>('fighters');
  const [editingFighter, setEditingFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    const savedFighters = localStorage.getItem('jiujitsu_fighters');
    const savedMatches = localStorage.getItem('jiujitsu_matches');
    
    if (savedFighters) {
      setFighters(JSON.parse(savedFighters));
    }
    
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWinRate = (wins: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };

  const clearHistory = () => {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('jiujitsu_fighters');
      localStorage.removeItem('jiujitsu_matches');
      setFighters([]);
      setMatches([]);
    }
  };

  const editFighter = (fighter: Fighter) => {
    setEditingFighter(fighter);
  };

  const saveFighterEdit = (updatedFighter: Fighter) => {
    const updatedFighters = fighters.map(f => 
      f.name === updatedFighter.name ? updatedFighter : f
    );
    
    setFighters(updatedFighters);
    localStorage.setItem('jiujitsu_fighters', JSON.stringify(updatedFighters));
    setEditingFighter(null);
  };

  const deleteFighter = (fighterName: string) => {
    Swal.fire({
      title: '¿Eliminar peleador?',
      text: `¿Estás seguro de que quieres eliminar a ${fighterName}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFighters = fighters.filter(f => f.name !== fighterName);
        setFighters(updatedFighters);
        localStorage.setItem('jiujitsu_fighters', JSON.stringify(updatedFighters));
        
        Swal.fire(
          'Eliminado',
          `${fighterName} ha sido eliminado del historial.`,
          'success'
        );
      }
    });
  };

  const addVictory = (fighter: Fighter) => {
    const updatedFighter = {
      ...fighter,
      wins: fighter.wins + 1,
      totalMatches: fighter.totalMatches + 1,
      lastMatch: new Date().toISOString()
    };
    saveFighterEdit(updatedFighter);
  };

  const addLoss = (fighter: Fighter) => {
    const updatedFighter = {
      ...fighter,
      losses: fighter.losses + 1,
      totalMatches: fighter.totalMatches + 1,
      lastMatch: new Date().toISOString()
    };
    saveFighterEdit(updatedFighter);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Historial de Combates</h1>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Borrar Historial
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('fighters')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'fighters'
                ? 'text-yellow-400 border-b-2 border-yellow-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Peleadores ({fighters.length})
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'matches'
                ? 'text-yellow-400 border-b-2 border-yellow-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Combates ({matches.length})
          </button>
        </div>

        {/* Contenido de las tabs */}
        {activeTab === 'fighters' && (
          <div className="space-y-4">
            {fighters.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg">No hay peleadores registrados</p>
                <p className="text-sm">Los peleadores aparecerán aquí después de su primer combate</p>
              </div>
            ) : (
              fighters
                .sort((a, b) => b.totalMatches - a.totalMatches)
                .map((fighter, index) => (
                  <div
                    key={fighter.name}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{fighter.name}</h3>
                          <p className="text-gray-400 text-sm">
                            Último combate: {formatDate(fighter.lastMatch)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {fighter.wins}W - {fighter.losses}L
                        </div>
                        <div className="text-sm text-gray-400">
                          {fighter.totalMatches} combates • {getWinRate(fighter.wins, fighter.totalMatches)}% victorias
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {/* Botones de acción rápida */}
                        <button
                          onClick={() => addVictory(fighter)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-colors"
                          title="Agregar victoria"
                        >
                          +W
                        </button>
                        <button
                          onClick={() => addLoss(fighter)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition-colors"
                          title="Agregar derrota"
                        >
                          +L
                        </button>
                        <button
                          onClick={() => editFighter(fighter)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-colors"
                          title="Editar estadísticas"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteFighter(fighter.name)}
                          className="px-3 py-1 bg-red-800 hover:bg-red-900 text-white rounded text-sm font-semibold transition-colors"
                          title="Eliminar peleador"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-4">
            {matches.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg">No hay combates registrados</p>
                <p className="text-sm">Los combates aparecerán aquí después de completar una pelea</p>
              </div>
            ) : (
              matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="text-sm text-gray-400">
                          {formatDate(match.date)}
                        </div>
                        <div className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                          ID: {match.id.slice(-6)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className={`font-semibold ${match.winner === match.redFighter ? 'text-yellow-400' : 'text-white'}`}>
                            {match.redFighter}
                          </span>
                          <span className="text-gray-400">({match.redScore})</span>
                        </div>
                        <span className="text-gray-500 font-bold">VS</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${match.winner === match.blueFighter ? 'text-yellow-400' : 'text-white'}`}>
                            {match.blueFighter}
                          </span>
                          <span className="text-gray-400">({match.blueScore})</span>
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">
                        Ganador: {match.winner}
                      </div>
                      <div className="text-sm text-gray-400">
                        Faltas: {match.redFaults} - {match.blueFaults}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal de edición de peleador */}
      {editingFighter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Editar {editingFighter.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Victorias</label>
                <input
                  type="number"
                  min="0"
                  value={editingFighter.wins}
                  onChange={(e) => setEditingFighter({
                    ...editingFighter,
                    wins: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Derrotas</label>
                <input
                  type="number"
                  min="0"
                  value={editingFighter.losses}
                  onChange={(e) => setEditingFighter({
                    ...editingFighter,
                    losses: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Total de Combates</label>
                <input
                  type="number"
                  min="0"
                  value={editingFighter.totalMatches}
                  onChange={(e) => setEditingFighter({
                    ...editingFighter,
                    totalMatches: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
              
              <div className="text-sm text-gray-400">
                Porcentaje de victorias: {getWinRate(editingFighter.wins, editingFighter.totalMatches)}%
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => saveFighterEdit(editingFighter)}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingFighter(null)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
