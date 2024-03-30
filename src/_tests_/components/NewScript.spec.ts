import { describe, expect, it, vi, beforeEach} from 'vitest';
import NewScript from '@/components/NewScript.vue';
import ScriptConsole from '@/components/ScriptConsole.vue';
import { useScriptStore } from '@/stores/ScriptStore';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { type AxiosResponse } from 'axios';
import scriptService from '@/services/scriptService';


let wrapper;
vi.mock('@/services/scriptService');
const pinia = createPinia();
let store;
let mockResponse: AxiosResponse<any, any>;
let mockScriptRequest;

describe('NewScript.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(pinia);
  });

  it('renders properly', () => {
    wrapper = mount(NewScript);
    expect(wrapper.findComponent(NewScript).exists()).toBe(true);
  });

  it('saves editor script', async () => {
    store = useScriptStore();
    wrapper = mount(NewScript);
    const createButton = wrapper.find('.primary-button');
    mockScriptRequest = { name: 'Test Script', body: 'Hello world!' };
    mockResponse = {
      status: 201,
      data: {
        script_id: 1,
        name: 'Test Script',
        body: 'Hello world!',
      },
      statusText: '',
      headers: {},
      config: {} as any,
    };

    vi.mocked(scriptService.createNewScript).mockResolvedValue(mockResponse);
    await createButton.trigger('click');
    await wrapper.vm.$nextTick();
    // Find the ScriptConsole component
    const scriptConsoleWrapper = wrapper.getComponent(ScriptConsole);


    // Find the inputs within the ScriptConsole component
    const scriptNameInput = scriptConsoleWrapper.find('input');
    const scriptBodyTextarea = scriptConsoleWrapper.find('textarea');
    const submitButton = scriptConsoleWrapper.find('button');

    await scriptNameInput.setValue(mockScriptRequest.name);
    await scriptBodyTextarea.setValue(mockScriptRequest.body);

    await submitButton.trigger('submit.prevent');


    expect(store.scripts).toEqual([mockResponse.data]);

  });
});
