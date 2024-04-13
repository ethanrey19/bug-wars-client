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
const bugPlayers = [];
let bugPositions = [5, 1, 5, 9, 1, 5, 9, 5];
let bugDirections = ["SOUTH", "NORTH", "EAST", "WEST"]

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
  const context = element?.getContext('2d');
  const contextBug = bugElement?.getContext('2d');
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
      bugPlayers.push(RedBugImage);
    }),
    new Promise((resolve, reject) => {
      BlueBugImage.onload = () => resolve(BlueBugImage);
      BlueBugImage.onerror = reject;
      BlueBugImage.src = 'src/assets/imgs/BlueBug.png';
      bugPlayers.push(BlueBugImage);
    }),
    new Promise((resolve, reject) => {
      GreenBugImage.onload = () => resolve(GreenBugImage);
      GreenBugImage.onerror = reject;
      GreenBugImage.src = 'src/assets/imgs/GreenBug.png';
      bugPlayers.push(GreenBugImage);
    }),
    new Promise((resolve, reject) => {
      YellowBugImage.onload = () => resolve(YellowBugImage);
      YellowBugImage.onerror = reject;
      YellowBugImage.src = 'src/assets/imgs/YellowBug.png';
      bugPlayers.push(YellowBugImage);
    }),
  ];

  Promise.all(imagePromises)
    .then(() => {
      drawMap();
    }).then(() => { 
      setTimeout(() => {
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 500)      
    }).then(() => {
      setTimeout(() => {
        bugPositions = [6, 1, 6, 9, 1, 4, 8, 5];
        bugDirections = ["SOUTH", "NORTH", "EAST", "WEST"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 1000)      
    }).then(() => {
      setTimeout(() => {
        bugPositions = [6, 1, 6, 8, 2, 4, 7, 5];
        bugDirections = ["WEST", "NORTH", "EAST", "WEST"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 1500) 
    }).then(() => {
      setTimeout(() => {
        bugPositions = [6, 2, 6, 9, 1, 4, 7, 5];
        bugDirections = ["WEST", "EAST", "EAST", "NORTH"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 2000) 
    }).then(() => {
      setTimeout(() => {
        bugPositions = [6, 3, 6, 9, 2, 4, 6, 5];
        bugDirections = ["WEST", "EAST", "EAST", "NORTH"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 2500) 
    }).then(() => {
      setTimeout(() => {
        bugPositions = [6, 3, 5, 9, 2, 4, 6, 5];
        bugDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 3000) 
    }).then(() => {
      setTimeout(() => {
        bugPositions = [5, 3, 4, 9, 3, 4, 5, 5];
        bugDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 3500)     
    }).then(() => {
      setTimeout(() => {
        bugPositions = [4, 3, 4, 8, 3, 5, 6, 5];
        bugDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
        drawAllBugs(bugPlayers, bugPositions, bugDirections);
      }, 4000) 
    })
    .catch((error) => {
    console.error('Error loading images:', error);
    });

  async function drawMap() {
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
  
  async function drawBug(contextBug, image, x, y, bugDirection) {
    x *= 16;
    y *= 16;
    contextBug.save();
    if (bugDirection == "EAST") {
      contextBug.translate(x, y);
      contextBug.rotate((90 * Math.PI) / 180);
      contextBug.drawImage(image, 0, -16, tileSize, tileSize);
    } else if (bugDirection == "SOUTH") {
      contextBug.translate(x, y);
      contextBug.rotate((180 * Math.PI) / 180);
      contextBug.drawImage(image, -16, -16, tileSize, tileSize);
    } else if (bugDirection == "WEST") {
      contextBug.translate(x, y);
      contextBug.rotate((270 * Math.PI) / 180);
      contextBug.drawImage(image, -16, 0, tileSize, tileSize);
    } else if (bugDirection == "NORTH") {
      contextBug.drawImage(image, x, y, tileSize, tileSize);
    }
    contextBug.restore();
  }

  async function drawAllBugs(bugPlayers, bugPositions, bugDirections) {
    contextBug.clearRect(0, 0, width, height);
    let j = 0;
    for (let i = 0; i < bugPlayers.length; i++) {
      drawBug(contextBug, bugPlayers[i], bugPositions[j], bugPositions[j+1], bugDirections[i])
      j += 2;
    }

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
