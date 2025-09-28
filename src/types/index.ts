export interface Jogador {
  id: number;
  apelido: string;
  pontuacao: number;
  posicaoId: number;
  clubeId: number;
  foto?: string;
}

export interface JogadorPontuado {
  id: number;
  apelido: string;
  foto: string;
  pontuacao: number; // Pontuação do Cartola original
  pontuacaoPersonalizada?: number; // Pontuação do seu sistema
  posicaoId: number;
  clubeId: number;
  entrouEmCampo: boolean;
  scout?: { [key: string]: number };
}

export interface JogadorCartolaDTO {
  id: number;
  apelido: string;
  foto: string;
  pontuacao: number; // Esta é a pontuação personalizada do seu backend
  posicaoId: number;
  clubeId: number;
}

export interface Usuario {
  id: number;
  nome: string;
  time: string;
  pontuacaoTotal: number;
}

export interface Clube {
  id: number;
  nome: string;
  escudos: {
    "60x60": string;
    "45x45": string;
    "30x30": string;
  };
}

export interface Jogo {
  partida_id: number;
  clube_casa: Clube;
  clube_visitante: Clube;
  horario: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Constantes para posições (similar ao iOS)
export const PosicaoId = {
  GOLEIRO: 1,
  LATERAL: 2,
  ZAGUEIRO: 3,
  MEIA: 4,
  ATACANTE: 5,
  TECNICO: 6
} as const;

// Helper para cores das posições
export const getCorPosicao = (posicaoId: number): string => {
  switch (posicaoId) {
    case PosicaoId.GOLEIRO:
      return '#007AFF'; // Azul
    case PosicaoId.LATERAL:
      return '#34C759'; // Verde
    case PosicaoId.ZAGUEIRO:
      return '#FF9500'; // Laranja
    case PosicaoId.MEIA:
      return '#AF52DE'; // Roxo
    case PosicaoId.ATACANTE:
      return '#FF3B30'; // Vermelho
    case PosicaoId.TECNICO:
      return '#8E8E93'; // Cinza
    default:
      return '#8E8E93';
  }
};

export const getNomePosicao = (posicaoId: number): string => {
  switch (posicaoId) {
    case PosicaoId.GOLEIRO:
      return 'Goleiro';
    case PosicaoId.LATERAL:
      return 'Lateral';
    case PosicaoId.ZAGUEIRO:
      return 'Zagueiro';
    case PosicaoId.MEIA:
      return 'Meia';
    case PosicaoId.ATACANTE:
      return 'Atacante';
    case PosicaoId.TECNICO:
      return 'Técnico';
    default:
      return 'Desconhecido';
  }
};