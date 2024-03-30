import { test,describe,beforeEach,afterEach,vi} from 'vitest'
import { useGameMapStore } from '../../stores/GameMapStore'
import { createPinia, setActivePinia } from 'pinia';
import type { GameMap } from '@/models/game-map.interface';


describe('GameMapStore', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
    afterEach(()=>{
      sessionStorage.clear();
    })
    
    const mockMaps: GameMap[]  = [
        {id: 'fcf986ea-5b8b-453c-b10e-8b89e11afa4d', name: "Map 1", height: 3,width:3, body: "XXX\nX X\nXXX", imagePath: "src/assets/images/map-0.png"},
        {id: '64a2372b-3189-48df-9da7-fa6f8e4ab665', name: "Map 2", height: 4,width:4, body: "XXXX\nX  X\nX XX\nXXXX", imagePath: "src/assets/images/map-1.png"},
        {id: 'd8f78109-a536-4dac-bacb-aa3afcdeeef3', name: "Map 3", height: 2,width:2, body: "XX\nXX", imagePath: "src/assets/images/map-2.png"}

    ]

test('setMaps should set all maps', ({ expect }) => {
 const store = useGameMapStore();
 store.setMaps(mockMaps);
 expect(store.maps).toEqual(mockMaps);
})

test('setCurrentMap should set a single gameMap in store and sessionStorage', ({ expect }) => {
    const store = useGameMapStore();
    
  store.setCurrentMap(mockMaps[1]);

  expect(store.currentMap).toEqual(mockMaps[1]);
  expect(localStorage.getItem('gameMap')).toBe(JSON.stringify(mockMaps[1]));
});


})