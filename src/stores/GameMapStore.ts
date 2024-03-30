import { defineStore } from 'pinia';
import gameMapService from '@/services/gameMapService';
import type { GameMap } from '@/models/game-map.interface';

export const useGameMapStore = defineStore('gameMap', {
 state: () => {
    return {
      maps: JSON.parse(localStorage.getItem('gameMaps') || '[]') as GameMap[],
      currentMap: JSON.parse(localStorage.getItem('gameMap') || '{}') as GameMap,
    };
 },
 actions: {
    init() {
      gameMapService
        .getAllMaps()
        .then((response) => {
          this.maps = response.data;
          localStorage.setItem('gameMaps', JSON.stringify(this.maps));
        })
        .catch((error) => {
          console.error('Error fetching Game maps:', error);
        });
    },

    setMaps(mapArray: GameMap[]) {
      this.maps = mapArray;
      localStorage.setItem('gameMaps', JSON.stringify(this.maps));
    },
    setCurrentMap(map: GameMap) {
      this.currentMap = map;
      try {
        localStorage.setItem('gameMap', JSON.stringify(this.currentMap));
        console.log(this.currentMap);
      } catch (error) {
        console.error('Error setting currentMap in localStorage:', error);
      }
    },

    getCurrentMap() {
      return this.currentMap;
    }
 },
});
