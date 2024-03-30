import { vi, describe, expect, it, beforeEach, afterEach } from 'vitest';
import GameMapService from '../../services/gameMapService';
import type { GameMap } from '@/models/game-map.interface';

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
        {id: 'fcf986ea-5b8b-453c-b10e-8b89e11afa4d', name: "Map 1", height: 3,width:3, body: "XXX\nX X\nXXX", imagePath: "src/assets/images/map-0.png"},
        {id: '64a2372b-3189-48df-9da7-fa6f8e4ab665', name: "Map 2", height: 4,width:4, body: "XXXX\nX  X\nX XX\nXXXX", imagePath: "src/assets/images/map-1.png"},
        {id: 'd8f78109-a536-4dac-bacb-aa3afcdeeef3', name: "Map 3", height: 2,width:2, body: "XX\nXX", imagePath: "src/assets/images/map-2.png"}

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