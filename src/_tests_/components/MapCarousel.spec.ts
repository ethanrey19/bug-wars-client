import MapCarousel from '@/components/MapCarousel.vue';
import { useGameMapStore } from '@/stores/GameMapStore';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia'
import { describe, expect, it} from 'vitest';

describe('MapCarousel.vue', () => {

    
      it('renders gameMaps properly', () => {
        const pinia = createPinia()
        const store = useGameMapStore(pinia)
        store.setMaps( [{id: '32900556-e043-4693-90c6-65cf220d27a3', name: "Map 1", height: 3,width:3, body: "XXX\nX X\nXXX", imagePath: "src/assets/images/map-0.png"},
        {id: '1c4ae26c-d983-4827-897a-bd99ea60d329', name: "Map 2", height: 4,width:4, body: "XXXX\nX  X\nX XX\nXXXX", imagePath: "src/assets/images/map-1.png"},
        {id: '2980c080-6d2f-4986-8120-bf42e570117d', name: "Map 3", height: 2,width:2, body: "XX\nXX", imagePath: "src/assets/images/map-2.png"}]);
       const wrapper = mount(MapCarousel,{ global: {
        plugins: [pinia],
      },});
       expect(wrapper.findComponent(MapCarousel).exists()).toBe(true);
     });
    })