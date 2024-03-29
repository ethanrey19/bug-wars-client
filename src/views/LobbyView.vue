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

const play = async () => {
 const selections = selectedOptions.value;

 const scripts = selections.map(selection => 
    scriptService.getScriptByName(selection.selection)
 );
 const resolvedScripts = await Promise.all(scripts);
 const scriptIds = resolvedScripts.map(resolvedScripts => resolvedScripts.data.scriptId);

 

 console.log(resolvedScripts);
 console.log(scriptIds);
};
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
