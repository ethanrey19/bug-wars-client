import { defineStore } from 'pinia';
import scriptService from '../services/scriptService';
import type { Script } from '@/types';

export const useScriptStore = defineStore('script', {
  state: () => {
    return {
      scripts: [] as Script[],
      currentScript: JSON.parse(sessionStorage.getItem('script') || '{}') as Script,
    };
  },
  actions: {
    init() {
      scriptService
        .getAllScripts()
        .then((response) => {
          this.scripts = response.data;
        })
        .catch((error) => {
          console.error('Error fetching Scripts:', error);
        });
    },
    setScripts(scriptArray: Script[]) {
      this.scripts = scriptArray;
    },
    setCurrentScript(script: Script) {
      this.currentScript = script;
      sessionStorage.setItem('script', JSON.stringify(this.currentScript));
    },
    async addNewScript(script: Script) {
      this.scripts.push(script);
    },
    deleteScript(id: number) {
      for (let i = 0; i < this.scripts.length; i++) {
        if (this.scripts[i].scriptId === id) {
          this.scripts.splice(i, 1);
          return this.scripts;
        }
      }
      return this.scripts;
    },
  },
});
