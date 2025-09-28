import React, { useState, useEffect } from 'react';
import { cartolaService } from '../services/CartolaService';
import type { Jogo } from '../types';
import './JogosView.css';

interface JogosViewProps {
  onShowJogadores: () => void;
  onShowPontuados: () => void;
}

const JogosView: React.FC<JogosViewProps> = ({ onShowJogadores, onShowPontuados }) => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarJogos = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[DEBUG] Iniciando carregamento dos jogos...');
      const jogosData = await cartolaService.buscarJogosRodada();
      setJogos(jogosData);
      console.log('[DEBUG] Jogos carregados com sucesso:', jogosData.length);
    } catch (err) {
      console.error('[DEBUG] Erro ao carregar jogos:', err);
      setError('Erro ao carregar jogos da rodada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

  return (
    <div className="jogos-view">
      <header className="jogos-header">
        <h1>Jogos da Rodada</h1>
        <div className="action-buttons">
          <button 
            className="btn btn-primary" 
            onClick={onShowJogadores}
          >
            👥 Jogadores
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={onShowPontuados}
          >
            ⭐ Pontuados
          </button>
        </div>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando jogos...</p>
        </div>
      ) : (
        <div className="jogos-list">
          {jogos.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum jogo encontrado para esta rodada</p>
              <button className="btn btn-outline" onClick={carregarJogos}>
                🔄 Tentar novamente
              </button>
            </div>
          ) : (
            jogos.map((jogo) => (
              <div key={jogo.partida_id} className="jogo-card">
                <div className="jogo-info">
                  <div className="teams">
                    <div className="team">
                      <img 
                        src={jogo.clube_casa.escudos["45x45"]} 
                        alt={jogo.clube_casa.nome}
                        className="escudo"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span className="team-name">{jogo.clube_casa.nome}</span>
                    </div>
                    <span className="vs">x</span>
                    <div className="team">
                      <img 
                        src={jogo.clube_visitante.escudos["45x45"]} 
                        alt={jogo.clube_visitante.nome}
                        className="escudo"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span className="team-name">{jogo.clube_visitante.nome}</span>
                    </div>
                  </div>
                  <div className="jogo-details">
                    <span className="horario">📅 {jogo.horario}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default JogosView;