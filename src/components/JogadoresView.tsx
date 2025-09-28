import React, { useState, useEffect } from 'react';
import { cartolaService } from '../services/CartolaService';
import type { Jogador } from '../types';
import { getCorPosicao, getNomePosicao } from '../types';
import './JogadoresView.css';

interface JogadoresViewProps {
  onBack: () => void;
}

const JogadoresView: React.FC<JogadoresViewProps> = ({ onBack }) => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarJogadores = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[DEBUG] Iniciando carregamento dos jogadores...');
      const jogadoresData = await cartolaService.buscarJogadores();
      setJogadores(jogadoresData);
      console.log('[DEBUG] Jogadores carregados com sucesso:', jogadoresData.length);
    } catch (err) {
      console.error('[DEBUG] Erro ao carregar jogadores:', err);
      setError('Erro ao carregar jogadores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarJogadores();
  }, []);

  return (
    <div className="jogadores-view">
      <header className="jogadores-header">
        <button className="btn btn-back" onClick={onBack}>
          ← Voltar
        </button>
        <h1>Jogadores</h1>
        <div></div> {/* Spacer para centralizar o título */}
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando jogadores...</p>
        </div>
      ) : (
        <div className="jogadores-list">
          {jogadores.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum jogador encontrado</p>
              <button className="btn btn-outline" onClick={carregarJogadores}>
                🔄 Tentar novamente
              </button>
            </div>
          ) : (
            jogadores.map((jogador) => (
              <div key={jogador.id} className="jogador-card">
                <div className="jogador-info">
                  <div className="jogador-posicao">
                    <div 
                      className="posicao-circle"
                      style={{ backgroundColor: getCorPosicao(jogador.posicaoId) }}
                    ></div>
                  </div>
                  <div className="jogador-details">
                    <h3 className="jogador-nome">{jogador.apelido}</h3>
                    <p className="jogador-posicao-nome">
                      Posição: {getNomePosicao(jogador.posicaoId)}
                    </p>
                    <p className={`jogador-pontuacao ${jogador.pontuacao < 0 ? 'negativa' : 'positiva'}`}>
                      Pontuação: {jogador.pontuacao.toFixed(2)}
                    </p>
                  </div>
                  {jogador.foto && (
                    <div className="jogador-foto">
                      <img 
                        src={jogador.foto} 
                        alt={jogador.apelido}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default JogadoresView;