import { mount } from '@vue/test-utils';
import AllScripts from '@/components/AllScripts.vue';
import { useScriptStore } from '@/stores/ScriptStore';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Script } from '@/types';
import type { AxiosResponse } from 'axios';
import type { Router } from 'vue-router';
import scriptService from '@/services/scriptService';

vi.mock('@/services/scriptService');

let TEST_SCRIPTS: Script[] = [];
let mockResponse: AxiosResponse<any,any>;
let store;
let mockRouter: Router;
const pinia = createPinia();

describe('AllScripts', () => {
  beforeEach(() => {
    TEST_SCRIPTS = [
      {
        scriptId: 1,
        name: 'Script One',
        body: 'Testing a Script',
      },
      {
        scriptId: 2,
        name: 'Script Two',
        body: 'Testing a Second Script',
      },
    ];

    mockResponse = {
      data: TEST_SCRIPTS,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    }

    setActivePinia(pinia);

    mockRouter = {
      push: vi.fn(),
      resolve: vi.fn().mockImplementation((to) => ({ href: to })),
    } as any as Router;

    
  });

  it('renders scripts and routes user with correct Script ID', async () => {
    vi.mock('vue-router', async () => {
      const actual = await vi.importActual('vue-router');
      return {
        ...actual,
        useRouter: () => {return mockRouter},
      };
    });

    vi.mocked(scriptService.getAllScripts).mockResolvedValue(mockResponse)

    store = useScriptStore();
    store.setScripts(TEST_SCRIPTS);

    const wrapper = mount(AllScripts, {
      global: {
        plugins: [pinia],
        mocks: {
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(store.scripts.length).toBe(2);
    const scriptNameElements = wrapper.findAll('.Headline-Text');

    expect(wrapper.findAll('.Headline-Text').length).toBe(2)
    expect(scriptNameElements[0].text()).toBe('Script One');
    expect(scriptNameElements[1].text()).toBe('Script Two');

    //After triggering the click event
    await wrapper.findAll('.Headline-Text')[0].trigger('click');
    await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM

    //Now check if the push method has been called
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'script-detail', params: { id: 1 } });
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
