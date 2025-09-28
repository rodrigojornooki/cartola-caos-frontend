import React, { useState, useEffect } from 'react';
import { cartolaService } from '../services/CartolaService';
import type { JogadorCartolaDTO } from '../types';
import { getCorPosicao, getNomePosicao } from '../types';
import './PontuadosView.css';

interface PontuadosViewProps {
  onBack: () => void;
}

const PontuadosView: React.FC<PontuadosViewProps> = ({ onBack }) => {
  const [pontuados, setPontuados] = useState<JogadorCartolaDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarPontuados = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('[DEBUG] Iniciando carregamento dos pontuados personalizados...');
      const pontuadosData = await cartolaService.buscarPontuadosPersonalizados();
      setPontuados(pontuadosData);
      console.log('[DEBUG] Pontuados personalizados carregados com sucesso:', pontuadosData.length);
    } catch (err) {
      console.error('[DEBUG] Erro ao carregar pontuados:', err);
      setError('Erro ao carregar jogadores pontuados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPontuados();
  }, []);

  return (
    <div className="pontuados-view">
      <header className="pontuados-header">
        <button className="btn btn-back" onClick={onBack}>
          ← Voltar
        </button>
        <h1>Pontuação Personalizada</h1>
        <div></div> {/* Spacer para centralizar o título */}
      </header>

      <div className="pontuados-info">
        <p>🔥 Sistema de pontuação personalizado que premia ações negativas!</p>
        <p>📊 Quanto pior o jogador, maior a pontuação no nosso sistema</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando pontuados...</p>
        </div>
      ) : (
        <div className="pontuados-list">
          {pontuados.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum jogador pontuado encontrado</p>
              <button className="btn btn-outline" onClick={carregarPontuados}>
                🔄 Tentar novamente
              </button>
            </div>
          ) : (
            pontuados
              .sort((a, b) => b.pontuacao - a.pontuacao) // Ordena por pontuação personalizada (maior primeiro)
              .map((pontuado) => (
              <div key={`${pontuado.apelido}-${pontuado.clubeId}`} className="pontuado-card">
                <div className="pontuado-info">
                  <div className="pontuado-posicao">
                    <div 
                      className="posicao-circle"
                      style={{ backgroundColor: getCorPosicao(pontuado.posicaoId) }}
                    ></div>
                  </div>
                  <div className="pontuado-foto">
                    <img 
                      src={pontuado.foto} 
                      alt={pontuado.apelido}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-player.png';
                      }}
                    />
                  </div>
                  <div className="pontuado-details">
                    <h3 className="pontuado-nome">{pontuado.apelido}</h3>
                    <p className="pontuado-posicao-nome">
                      {getNomePosicao(pontuado.posicaoId)}
                    </p>
                    
                    <div className="pontuacoes-container">
                      <div className="pontuacao-personalizada">
                        <span className="label">💥 Pontuação Caos:</span>
                        <span className={`pontuacao-valor personalizada ${pontuado.pontuacao < 0 ? 'negativa' : 'positiva'}`}>
                          {pontuado.pontuacao.toFixed(2)} pts
                        </span>
                      </div>
                      
                      {pontuado.pontuacao > 0 && (
                        <div className="pontuacao-explicacao">
                          <span className="explicacao-text">
                            🎯 Este jogador teve ações negativas que geraram pontos no sistema Caos!
                          </span>
                        </div>
                      )}
                      
                      {pontuado.pontuacao < 0 && (
                        <div className="pontuacao-explicacao">
                          <span className="explicacao-text">
                            😔 Jogador teve ações positivas demais para o sistema Caos
                          </span>
                        </div>
                      )}
                      
                      {pontuado.pontuacao === 0 && (
                        <div className="pontuacao-explicacao">
                          <span className="explicacao-text">
                            😐 Jogador neutro - sem ações relevantes para o sistema
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ranking-position">
                    <span className="position-number">
                      #{pontuados.findIndex(p => p.apelido === pontuado.apelido) + 1}
                    </span>
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

export default PontuadosView;