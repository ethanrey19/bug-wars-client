<template>
  <div
    class="board"
    style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <h1 id="map-name" class="Large-Headline-Text">{{ mapName }}</h1>
    <CanvasComponent />
    <button v-show="false">Play Again</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import { useGameMapStore } from '@/stores/GameMapStore';

const mapStore = useGameMapStore();
const currentMapIndex = sessionStorage.getItem('currentMapIndex');

let mapName = 'Example Name';

const currentMap = computed(() => {
  if (currentMapIndex) {
    return mapStore.maps[parseInt(currentMapIndex, 10)];
  }
  return null;
});

function updateCurrentMapName() {
  if (currentMap.value) {
    mapName = currentMap.value.name;
  } else {
    console.error("Element with id 'currentMapName' not found!");
  }
}

updateCurrentMapName();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

#map-name {
  margin-bottom: 5%;
}
</style>
