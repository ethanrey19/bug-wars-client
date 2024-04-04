<template>
  <div>
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      tabindex="0"
      style="border: 3px solid white"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//   import { useGameMapStore } from '@/stores/GameMapStore';

//   const mapStore = useGameMapStore();
//   const currentMapIndex = localStorage.getItem('currentMapIndex');

const canvasRef = ref<HTMLCanvasElement | null>(null);
const tileSize = 16;
const mapWidth = 11;
const mapHeight = 11;
const width: number = tileSize * mapWidth;
const height: number = tileSize * mapHeight;

let body =
  '' +
  'XXXXXXXXXXX\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'X000000000X\n' +
  'XXXXXXXXXXX';

onMounted(() => {
  let element = canvasRef.value;
  const wallImage = new Image();
  const floorImage = new Image();
  const RedBugImage = new Image();
  const BlueBugImage = new Image();
  const GreenBugImage = new Image();
  const YellowBugImage = new Image();

  // load images
  const imagePromises = [
    new Promise((resolve, reject) => {
      wallImage.onload = () => resolve(wallImage);
      wallImage.onerror = reject;
      wallImage.src = 'src/assets/terrain/wall.png';
    }),
    new Promise((resolve, reject) => {
      floorImage.onload = () => resolve(floorImage);
      floorImage.onerror = reject;
      floorImage.src = 'src/assets/terrain/floor.png';
    }),
    new Promise((resolve, reject) => {
      RedBugImage.onload = () => resolve(RedBugImage);
      RedBugImage.onerror = reject;
      RedBugImage.src = 'src/assets/imgs/RedBug.png';
    }),
    new Promise((resolve, reject) => {
      BlueBugImage.onload = () => resolve(BlueBugImage);
      BlueBugImage.onerror = reject;
      BlueBugImage.src = 'src/assets/imgs/BlueBug.png';
    }),
    new Promise((resolve, reject) => {
      GreenBugImage.onload = () => resolve(GreenBugImage);
      GreenBugImage.onerror = reject;
      GreenBugImage.src = 'src/assets/imgs/GreenBug.png';
    }),
    new Promise((resolve, reject) => {
      YellowBugImage.onload = () => resolve(YellowBugImage);
      YellowBugImage.onerror = reject;
      YellowBugImage.src = 'src/assets/imgs/YellowBug.png';
    }),
  ];

  Promise.all(imagePromises)
    .then(() => {
      drawMap();
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });

  async function drawMap() {
    const context = element?.getContext('2d');
    let x = 0;
    let y = 0;
    for (let i = 0; i < body.length; i++) {
      let char = body.charAt(i);
      if (char == 'X') {
        context?.drawImage(wallImage, x, y, tileSize, tileSize);
        x += tileSize;
      } else if (char == '0') {
        context?.drawImage(floorImage, x, y, tileSize, tileSize);
        x += tileSize;
      } else {
        y += tileSize;
        x = 0;
      }
    }
  }


});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

#map-name {
  margin-bottom: 5%;
}
</style>
