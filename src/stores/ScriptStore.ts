import { defineStore } from 'pinia';

export const useScriptStore = defineStore('script', {
  state: () => {
    return {
      scripts: [
        {
          scriptId: 1,
          name: 'Script One',
          body: 'Testing a Script',
          ownerId: 1,
        },
        {
          scriptId: 2,
          name: 'Script Two',
          body: 'Testing a Second Script',
          ownerId: 1,
        },
      ] as any[],
      script: {},
    };
  },
  getters: {},
  actions: {
    setAllScripts(scripts: any[]) {
      this.scripts = scripts;
    },
    setScript(script: any) {
      this.script = script;
    },
    updateScript(editedScript: any) {
      const index = this.scripts.findIndex((script) => script.scriptId === editedScript.scriptId);

      if (index !== -1) {
        this.scripts[index] = { ...this.scripts[index], ...editedScript };
      }
    },
  },
});
