import { describe, expect, it } from 'vitest';

import NewScript from './NewScript.vue';
import { shallowMount } from '@vue/test-utils';

describe('NewScript.vue', () => {
  it('renders NewScript component', () => {
    const wrapper = shallowMount(NewScript);
    expect(wrapper.findComponent(NewScript).exists()).toBe(true);
  });
});