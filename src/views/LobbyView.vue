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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameMapStore } from '@/stores/GameMapStore';

const gameMapStore = useGameMapStore();

const router = useRouter();

const selectedOptions = ref<PlayerSelection[]>([]);

const handleUpdateSelections = (newSelections: PlayerSelection[]) => {
  selectedOptions.value = newSelections;
};

const play = async () => {
  const selections = selectedOptions.value;

  const scripts = selections.map((selection) => scriptService.getScriptByName(selection.selection));
  const resolvedScripts = await Promise.all(scripts);
  const scriptIds: string[] = resolvedScripts.map(
    (resolvedScripts) => resolvedScripts.data.scriptId,
  );

  sendGameRequest(scriptIds);
};

async function sendGameRequest(scriptIds: string[]) {
  const currentMapIndex = localStorage.getItem('currentMapIndex');
  if (currentMapIndex) {
    const currentMap = gameMapStore.maps[parseInt(currentMapIndex, 10)];
    if (currentMap) {
      const gameRequest = {
        mapId: currentMap.id,
        scriptIds: scriptIds,
      };

      try {
        const response = await gameService.playGame(gameRequest);
        if (response.status === 200) {
          console.log('play response', response);
          router.push('/play');
        }
      } catch (error) {
        console.error('Error playing game:', error);
      }
    }
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
