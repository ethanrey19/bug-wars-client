import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import UpdateScript from '@/components/UpdateScript.vue';
import ScriptConsole from '@/components/ScriptConsole.vue';
import { useScriptStore } from '@/stores/ScriptStore';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { type AxiosResponse } from 'axios';
import scriptService from '@/services/scriptService';
import type { Script } from '@/types';

let wrapper;
let store;
let mockResponse: AxiosResponse<any, any>;
let mockScript: Script;
vi.mock('@/services/scriptService');
const pinia = createPinia();

describe('UpdateScript.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(pinia);
  });

  it('renders properly', () => {
    store = useScriptStore(pinia);
    wrapper = mount(UpdateScript);
    expect(wrapper.findComponent(UpdateScript).exists()).toBe(true);
  });

  it('saves updated scripts', async () => {
    store = useScriptStore(pinia);
    mockScript = {
      scriptId: '32900556-e043-4693-90c6-65cf220d27a3',
      name: 'Test Script',
      body: 'Hello world!',
    };
    store.setCurrentScript(mockScript);

    wrapper = mount(UpdateScript);

    const createButton = wrapper.find('button');
    const mockScriptRequest = { name: 'Test2Script2', body: 'Goodbye world!' };

    mockResponse = {
      status: 202,
      data: {
        script_id: '32900556-e043-4693-90c6-65cf220d27a3',
        name: 'Test2Script2',
        body: 'Goodbye world!',
      },
      statusText: '',
      headers: {},
      config: {} as any,
    };

    vi.mocked(scriptService.updateScript).mockResolvedValue(mockResponse);
    await createButton.trigger('click');
    await wrapper.vm.$nextTick();

    // Find the ScriptConsole component
    const scriptConsoleWrapper = wrapper.getComponent(ScriptConsole);

    // Find the inputs within the ScriptConsole component
    const scriptNameInput = scriptConsoleWrapper.find('input');
    const scriptBodyTextarea = scriptConsoleWrapper.find('textarea');
    const submitButton = scriptConsoleWrapper.find('#save-button');

    await scriptNameInput.setValue(mockScriptRequest.name);
    await scriptBodyTextarea.setValue(mockScriptRequest.body);
    
    await submitButton.trigger('submit.prevent');


    expect(scriptService.updateScript).toHaveBeenLastCalledWith(
      mockScriptRequest,
      mockScript.scriptId.toString(),
    );
  });
});
