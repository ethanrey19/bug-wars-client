
import { describe, expect, it,vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AllScriptsViewVue from '@/views/AllScriptsView.vue'
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const mockRouter = {
  push: vi.fn(),
  resolve: vi.fn().mockImplementation((to) => ({ href: to })),
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual("vue-router")
  return {
    ...actual,
  resolve: vi.fn(),
  useRouter: () => {return mockRouter},
  RouterLink: {
      template: '<div><slot></slot></div>',
    }, 
 }});

describe('AllScriptsView.vue', () => {
 it('renders properly', async () => {
   const pinia = createPinia();
   const app = createApp(AllScriptsViewVue);
   app.use(pinia);
   
   const wrapper = mount(AllScriptsViewVue,{
    global: {
     
      mocks: {
        $router: mockRouter,
      },
    },
  });
   expect(wrapper.text());
 });
});