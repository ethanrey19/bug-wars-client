import { defineStore } from 'pinia';
import gameMapService from '@/services/gameMapService';
import type { GameMap } from '@/models/game-map.interface';

export const useGameMapStore = defineStore('gameMap', {
 state: () => {
    return {
      maps: JSON.parse(sessionStorage.getItem('gameMaps') || '[]') as GameMap[],
      currentMap: JSON.parse(sessionStorage.getItem('gameMap') || '{}') as GameMap,
    };
 },
 actions: {
    init() {
      gameMapService
        .getAllMaps()
        .then((response) => {
          this.maps = response.data;
          sessionStorage.setItem('gameMaps', JSON.stringify(this.maps));
        })
        .catch((error) => {
          console.error('Error fetching Game maps:', error);
        });
    },

    setMaps(mapArray: GameMap[]) {
      this.maps = mapArray;
      sessionStorage.setItem('gameMaps', JSON.stringify(this.maps));
    },
    setCurrentMap(map: GameMap) {
      this.currentMap = map;
      try {
        sessionStorage.setItem('gameMap', JSON.stringify(this.currentMap));
        console.log(this.currentMap);
      } catch (error) {
        console.error('Error setting currentMap in sessionStorage:', error);
      }
    },

    getCurrentMap() {
      return this.currentMap;
    }
 },
});
