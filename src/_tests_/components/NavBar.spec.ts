import { mount, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NavBar from '@/components/NavBar.vue';
import { createPinia, setActivePinia } from 'pinia';
import type { Router } from 'vue-router';
import HamburgerMenu from '@/components/HamburgerMenu.vue';


const pinia = createPinia();
let mockRouter: Router;


describe('NavBar', () => {
    beforeEach(() => {
        setActivePinia(pinia); 
        
        mockRouter = {
          push: vi.fn(),
          resolve: vi.fn().mockImplementation((to) => ({ href: to })),
        } as any as Router;
      });

  it('renders login button properly', () => {
    vi.mock('vue-router', async () => {
      const actual = await vi.importActual('vue-router');
      return {
        ...actual,
        useRouter: () => {return mockRouter},
      };
    });

    const wrapper = shallowMount(NavBar);
    expect(wrapper.find('.login-logout-button').exists()).toBe(true);
  });

  it('navigates to correct routes on login button click', async () => {
    const routerPush = vi.fn();
    const wrapper = shallowMount(NavBar, {
      global: {
        mocks: {          
          router: { push: routerPush },
        },
      },
    });
  
   await wrapper.find('.login-logout-button').trigger('click');
   expect(routerPush).toHaveBeenCalledWith('/login');
  });
});
