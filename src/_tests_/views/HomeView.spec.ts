import { mount } from '@vue/test-utils';
import { describe, expect, it,vi } from 'vitest';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
 it('renders properly', () => {
   const wrapper = mount(HomeView);
  expect(wrapper.find('.homepage').exists()).toBe(true);
 });

 it('navigates to correct routes on button click', async () => {
   const routerPush = vi.fn();
   const wrapper = mount(HomeView, {
     global: {
       mocks: {
         $router: { push: routerPush },
       },
     },
   });

  await wrapper.find('.play-button').trigger('click');
  expect(routerPush).toHaveBeenCalledWith('/lobby');

 });
});


