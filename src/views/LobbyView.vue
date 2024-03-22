<template>
  <div class="lobby-page">
    <h2 class="Large-Headline-Text">LOBBY</h2>
    <MapCarousel />
    <PlayerScriptSelector @update-selections="handleUpdateSelections" />
    <div class="button-section">
      <button class="primary-button" @click.prevent="play">Play</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapCarousel from '@/components/MapCarousel.vue';
import PlayerScriptSelector from '@/components/PlayerScriptSelector.vue';
import { PlayerSelection } from '@/models/player-selection.interface';
import scriptService from '@/services/scriptService';
import { ref } from 'vue';

const selectedOptions = ref<PlayerSelection[]>([]);

const handleUpdateSelections = (newSelections: PlayerSelection[]) => {
  selectedOptions.value = newSelections;
};

const play = () => {
  const selections = selectedOptions.value;
  let scripts = getScripts(selections);

  console.log(scripts);
};

function getScripts(selections: any[]) {
  let scripts: any[] = [];
  for (let i = 0; i < selections.length; i++) {
    scriptService.getScriptByName(selections.at(i).selection).then((data: { data: any }) => {
      scripts[i] = data.data;
    });
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.lobby-page {
  margin: 0 $MobileEdgeInset;
}
.Large-Headline-Text {
  text-align: center;
  margin: 0;
  margin-bottom: 80px;
}
.primary-button {
  margin-top: 40px;
}
</style>
