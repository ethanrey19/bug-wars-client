import axios from 'axios';
import type { GameRequest } from '@/types/index';

export default {
  async playGame(gameRequest: GameRequest) {
    return axios.post('/api/game/play', gameRequest);
  },
};
