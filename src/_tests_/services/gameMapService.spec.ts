import { vi, describe, expect, it, beforeEach, afterEach } from 'vitest';
import GameMapService from '../../services/gameMapService';
import axios from 'axios';
import type { GameMap } from '@/models/game-map.interface';
import gameMapService from '../../services/gameMapService';

describe('gameMapService', () => {


  const { mockAxiosGet } = vi.hoisted(() => {
    return { mockAxiosGet: vi.fn() };
  });



  beforeEach(async () => {
    vi.mock('axios', async () => {
      const actual = await vi.importActual('axios');
      return {
        ...actual,
        default: {
          get: mockAxiosGet,

        },
      };
    });
  });


  it('should get all maps', async () => {
    const maps: GameMap[]  = [
        {id: 1, name: "Map 1", height: 3,width:3, body: "XXX\nX X\nXXX", imagePath: "src/assets/images/map-0.png"},
        {id: 2, name: "Map 2", height: 4,width:4, body: "XXXX\nX  X\nX XX\nXXXX", imagePath: "src/assets/images/map-1.png"},
        {id: 3, name: "Map 3", height: 2,width:2, body: "XX\nXX", imagePath: "src/assets/images/map-2.png"}

    ]
    const response = { data: maps, status: 200, statusText: '', headers: {}, config: {} as any };
    mockAxiosGet.mockResolvedValue(response);
   
    const result = await GameMapService.getAllMaps();
    expect(result).toBe(response);
    expect(mockAxiosGet).toHaveBeenCalledWith('/api/maps');
   });
   
   

  afterEach(() => {
    mockAxiosGet.mockReset();
  });
});