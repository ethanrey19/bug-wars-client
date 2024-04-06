<template>
  <div id="canvasDiv">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      tabindex="0"
      style="border: 3px solid white"
      id = "mapCanvas"
    ></canvas>
    <canvas
      ref="canvasRefBug"
      :width="width"
      :height="height"
      tabindex="0"
      style="border: 3px solid white"
      id = "entityCanvas"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//   import { useGameMapStore } from '@/stores/GameMapStore';

//   const mapStore = useGameMapStore();
//   const currentMapIndex = localStorage.getItem('currentMapIndex');

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasRefBug = ref<HTMLCanvasElement | null>(null);
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
  let bugElement = canvasRefBug.value;
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
    }).then(() => { 
      setTimeout(() => {
        drawBugs(80, 16, 80, 144);
      }, 500)      
    }).then(() => {
      setTimeout(() => {
        drawBugs(80, 32, 96, 144);
      }, 1000)      
    }).then(() => {
      setTimeout(() => {
        drawBugs(64, 32, 96, 128);
      }, 1500) 
    }).then(() => {
      setTimeout(() => {
        drawBugs(64, 32, 112, 128);
      }, 2000) 
    }).then(() => {
      setTimeout(() => {
        drawBugs(80, 32, 112, 112);
      }, 2500) 
    }).then(() => {
      setTimeout(() => {
        drawBugs(64, 32, 112, 112);
      }, 3000) 
    }).then(() => {
      setTimeout(() => {
        drawBugs(48, 32, 128, 112);
      }, 3500)     
    }).then(() => {
      setTimeout(() => {
        drawBugs(48, 16, 144, 112);
      }, 4000) 
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
  
  async function drawBugs(redX: number, redY: number, blueX: number, blueY: number) {
    const contextBug = bugElement?.getContext('2d');
    contextBug?.clearRect(0, 0, width, height)
    contextBug?.drawImage(RedBugImage, redX, redY, tileSize, tileSize);
    contextBug?.drawImage(BlueBugImage, blueX, blueY, tileSize, tileSize);
}

});


</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

#map-name {
  margin-bottom: 5%;
}

#canvasDiv {
  position: relative;
  display: flex;
  justify-content: center;
}

#mapCanvas {
  position: absolute;
  z-index: 1;
}

#entityCanvas {
  position: absolute;
  z-index: 2;
}

</style>
