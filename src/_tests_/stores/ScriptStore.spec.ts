import { test,describe,beforeEach,afterEach,vi} from 'vitest'
import { useScriptStore } from '../../stores/ScriptStore'
import { createPinia, setActivePinia } from 'pinia';

describe('ScriptStore', () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });
    afterEach(()=>{
      sessionStorage.clear();
    })
    
    const mockScripts = [
      {
        scriptId: '32900556-e043-4693-90c6-65cf220d27a3',
        name: 'Script One',
        body: 'Testing One Script',
      },
      {
        scriptId: '1c4ae26c-d983-4827-897a-bd99ea60d329',
        name: 'Script Two',
        body: 'Testing a Second Script',
      },
    ]

test('setScripts should set all scripts', ({ expect }) => {
 const store = useScriptStore()
 store.setScripts(mockScripts);
 expect(store.scripts).toEqual(mockScripts)
})

test('setScript should set a single script in store and sessionStorage', ({ expect }) => {
  const store = useScriptStore();
  store.setCurrentScript(mockScripts[1]);

  expect(store.currentScript).toEqual(mockScripts[1]);
  expect(sessionStorage.getItem('script')).toBe(JSON.stringify(mockScripts[1]))
});

test('addNewScript should add a new script to scripts', ({ expect }) => {
  const store = useScriptStore()
  store.setScripts(mockScripts);

  const newScript = {
    scriptId: '2980c080-6d2f-4986-8120-bf42e570117d', 
    name: "New Script", 
    body:"Testing a New Script"
  };

  store.addNewScript(newScript);
  expect(store.scripts.length).toEqual(3);
  expect(store.scripts[2]).toEqual(newScript);
  store.scripts.pop();
  
});

test('deleteScript should return new array containing scripts without script with parameter ID', async ({ expect }) => {
  const store = useScriptStore();

  store.setScripts(mockScripts);

  store.deleteScript('1c4ae26c-d983-4827-897a-bd99ea60d329');
 
  expect(store.scripts.length).toEqual(1);
  expect(store.scripts[0].scriptId).toEqual('32900556-e043-4693-90c6-65cf220d27a3');
});

})