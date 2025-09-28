import axios from 'axios';
import type { Jogador, JogadorPontuado, Usuario, Jogo, JogadorCartolaDTO } from '../types';

class CartolaService {
  private baseURL = 'http://localhost:8080/api/jogadores';
  
  private api = axios.create({
    baseURL: this.baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async buscarJogadores(): Promise<Jogador[]> {
    try {
      console.log('[DEBUG] Buscando jogadores...');
      const response = await this.api.get<Jogador[]>('/cartola');
      console.log('[DEBUG] Jogadores recebidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Erro ao buscar jogadores:', error);
      throw new Error('Erro ao buscar jogadores');
    }
  }

  async buscarUsuarios(): Promise<Usuario[]> {
    try {
      console.log('[DEBUG] Buscando usuários...');
      const response = await this.api.get<Usuario[]>('/usuarios-teste');
      console.log('[DEBUG] Usuários recebidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }
  }

  async buscarJogosRodada(): Promise<Jogo[]> {
    try {
      console.log('[DEBUG] Buscando jogos da rodada...');
      const response = await this.api.get<Jogo[]>('/jogos-rodada');
      console.log('[DEBUG] Jogos recebidos:', response.data.length);
      console.log('[DEBUG] JSON recebido:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Erro ao buscar jogos:', error);
      throw new Error('Erro ao buscar jogos da rodada');
    }
  }

  async buscarPontuados(): Promise<JogadorPontuado[]> {
    try {
      console.log('[DEBUG] Buscando jogadores pontuados...');
      const response = await this.api.get<JogadorPontuado[]>('/pontuados');
      console.log('[DEBUG] Jogadores pontuados recebidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Erro ao buscar pontuados:', error);
      throw new Error('Erro ao buscar jogadores pontuados');
    }
  }

  async buscarPontuadosPersonalizados(): Promise<JogadorCartolaDTO[]> {
    try {
      console.log('[DEBUG] Buscando jogadores com pontuação personalizada...');
      const response = await this.api.get<JogadorCartolaDTO[]>('/pontuados');
      console.log('[DEBUG] Jogadores personalizados recebidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('[DEBUG] Erro ao buscar pontuados personalizados:', error);
      throw new Error('Erro ao buscar jogadores com pontuação personalizada');
    }
  }

  // Método para testar conexão com o backend
  async testarConexao(): Promise<boolean> {
    try {
      await this.api.get('/health');
      return true;
    } catch (error) {
      console.error('[DEBUG] Erro de conexão:', error);
      return false;
    }
  }
}

// Singleton instance
export const cartolaService = new CartolaService();
export default CartolaService;