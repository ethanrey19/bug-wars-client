<template>
  <div class="wrapper">
    <div class="grid-container">
    <nav>
      <button class="nav-button" @click="prevMap">
        <img class="icon" src="../assets/icons/left-chevron.svg" />
      </button>
    </nav>

    <div class="map-container">
      <img class="map-image" ref="mapImage" />
    </div>

    <nav>
      <button class="nav-button" @click="nextMap">
        <img class="icon" src="../assets/icons/right-chevron.svg" />
      </button>
    </nav>
  </div>
  <div class="Body-Text" id="currentMapName"></div>
  </div>
</template>

<script setup lang="ts">
import { useGameMapStore } from '@/stores/GameMapStore';
import { computed, onMounted, ref, watch } from 'vue';

const mapStore = useGameMapStore();
const currentIndex = ref(0);

onMounted(() => {
 mapStore.init();
 const persistedIndex = sessionStorage.getItem('currentMapIndex');
 if (persistedIndex) {
    currentIndex.value = parseInt(persistedIndex, 10);
 }
});

const maps = computed(() => {
 return mapStore.maps;
});

const currentMap = computed(() => {
 return maps.value[currentIndex.value];
});

function nextMap() {
 currentIndex.value = (currentIndex.value + 1) % maps.value.length;
 sessionStorage.setItem('currentMapIndex', currentIndex.value.toString());
}

function prevMap() {
 currentIndex.value = (currentIndex.value - 1 + maps.value.length) % maps.value.length;
 sessionStorage.setItem('currentMapIndex', currentIndex.value.toString());
}

function setMapDetails() {
 const map = maps.value[currentIndex.value];

 const mapImage = document.querySelector('.map-image');
 if (typeof map.imagePath === 'string') {
    if (mapImage instanceof HTMLImageElement) {
      mapImage.src = map.imagePath;
    }
 }
 const currentMapName = document.getElementById('currentMapName');
 if (currentMapName !== null) {
    currentMapName.textContent = String(map.name);
 } else {
    console.error("Element with id 'currentMapName' not found!");
 }
}

watch(currentMap, () => {
 setMapDetails();
});
</script>


<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

.wrapper {
  margin-bottom: 40px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: px $MobileEdgeInset;
  margin-bottom: 8px;
}
.map-container {
  grid-column: span 2;
  position: relative;
  width: 100%;
}
.map-image {
  width: 200%;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: $Black;
  border-color: $Black;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
img > button {
  height: 24px;
  width: 24px;
}
.map-image {
  width: 100%;
  object-fit: cover;
}
.aspect-ratio-container {
  position: relative;
  width: 100%;
}
.Body-Text {
  text-align: center;
}
</style>
