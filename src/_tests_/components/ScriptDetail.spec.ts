import { mount, shallowMount } from '@vue/test-utils'
import ScriptDetail from '@/views/ScriptDetailView.vue'
import { useScriptStore } from '@/stores/ScriptStore'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Script } from '@/types'
import { forEachChild } from 'typescript'


let testScript: Script;
let store;
const pinia = createPinia();
describe('ScriptDetail', () => {
  beforeEach(() => {
    testScript = {
        scriptId: '32900556-e043-4693-90c6-65cf220d27a3',
        name: 'Script One',
        body: 'Testing a Script',
      };

    setActivePinia(pinia);    
  });

 it('renders script details', async () => {
 store = useScriptStore()

 store.setCurrentScript(testScript);

 const wrapper = shallowMount(ScriptDetail)

 await wrapper.vm.$nextTick() // Wait for Vue to update the DOM
 const scriptName = wrapper.findAll('.Large-Headline-Text');
 const scriptBody = wrapper.findAll('.script-body-container');
 expect(scriptName[0].text()).toBe(testScript.name);
 expect(scriptBody[0].text()).toBe(testScript.body);
 })
})
