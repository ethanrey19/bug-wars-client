import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import ScriptDetailView from '@/views/ScriptDetailView.vue';
import { createPinia, setActivePinia } from 'pinia';


const pinia = createPinia();

describe('ScriptDetailView', () => {
  beforeEach(() => {
    setActivePinia(pinia);
  });

  it('renders properly', () => {
    const wrapper = shallowMount(ScriptDetailView);
    expect(wrapper.findComponent(ScriptDetailView).exists()).toBe(true);
  });
});
