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
import gameService from '@/services/gameService';
import scriptService from '@/services/scriptService';
import type { GameRequest } from '@/types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameMapStore } from '@/stores/GameMapStore';

const gameMapStore = useGameMapStore();
const currentMap = gameMapStore.currentMap;

const router = useRouter();

const selectedOptions = ref<PlayerSelection[]>([]);

const handleUpdateSelections = (newSelections: PlayerSelection[]) => {
  selectedOptions.value = newSelections;
};

const play = async () => {
  const selections = selectedOptions.value;

  const scripts = selections.map((selection) => scriptService.getScriptByName(selection.selection));
  const resolvedScripts = await Promise.all(scripts);
  const scriptIds:string[] = resolvedScripts.map((resolvedScripts) => resolvedScripts.data.scriptId);

  const gameRequest: GameRequest = {
    mapId: 'fcf986ea-5b8b-453c-b10e-8b89e11afa4d',
    scriptIds: scriptIds,
  };

  gameService.playGame(gameRequest).then((response) => {
    if (response.status === 200) {
      console.log('play reponse', response);
      console.log(currentMap);
      
      router.push('/play');
    }
  });
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
