<template>
  <div class="board">
    <h1 id="map-name" class="Large-Headline-Text">{{ mapName }}</h1>
    <CanvasComponent :key="componentKey" />
  </div>
  <div class="buttons">
    <PlayerScriptSelector @update-selections="handleUpdateSelections" />
    <button class="primary-button" v-if="gameFinished==true" @click.prevent="playAgain">Play Again</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import PlayerScriptSelector from '@/components/PlayerScriptSelector.vue';
import { useGameMapStore } from '@/stores/GameMapStore';

const mapStore = useGameMapStore();
const currentMapIndex = sessionStorage.getItem('currentMapIndex');
let gameFinished = true;
let mapName = 'Example Name';
const componentKey = ref(0);

const currentMap = computed(() => {
  if (currentMapIndex) {
    return mapStore.maps[parseInt(currentMapIndex, 10)];
  }
  return null;
});

function playAgain() {
  componentKey.value += 1;
}

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

.board {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
}

.primary-button {
  height: 64px;
  width: 40%;
  font-size: 18px;
  margin: 5% 5%
}

</style>
