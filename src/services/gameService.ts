import axios, { type AxiosResponse } from 'axios';
import type { GameRequest } from "@/types/index";

export default {
  async createNewScript(gameRequest: GameRequest) {
    return axios.post('/api/game/play', gameRequest);
  },
};
