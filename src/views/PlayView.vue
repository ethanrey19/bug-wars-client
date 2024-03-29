<template>
  <div class="board" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <!-- <h1 id="map-name" class="Large-Headline-Text">GameMap</h1> -->
    <div id="currentMapName"></div>
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      tabindex="0"
      style="border: 3px solid white;"
    ></canvas>
    <PlayerScriptSelector/>
    <button v-show="false">Play Again</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PlayerScriptSelector from '@/components/PlayerScriptSelector.vue';
import { useGameMapStore } from '@/stores/GameMapStore';

const mapStore = useGameMapStore();

const map = mapStore.getCurrentMap();
console.log("map", map);


const currentMapName = document.getElementById('currentMapName');
  if (currentMapName !== null) {
    currentMapName.textContent = String(map.name);
  } else {
    console.error("Element with id 'currentMapName' not found!");
  }

const canvasRef = ref<HTMLCanvasElement | null>(null);
const scale = 1;
let tileSize = 16 * scale;
let mapWidth = 11 * scale;
let mapHeight = 11 * scale;
const width: number = tileSize * mapWidth;
const height: number = tileSize * mapHeight;

let body = "" +
    "XXXXXXXXXXX\n" +
    "X000010000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X200000004X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000030000X\n" +
    "XXXXXXXXXXX";

    onMounted(() => {
      let element = canvasRef.value;
      if (element) {
        console.log('loading picture');
        const wallImage = new Image();
        const floorImage = new Image();
        const RedBugImage = new Image();
        const BlueBugImage = new Image();
        const GreenBugImage = new Image();
        const YellowBugImage = new Image();
        wallImage.src = 'src/assets/terrain/wall.png';
        floorImage.src = 'src/assets/terrain/floor.png';
        RedBugImage.src = 'src/assets/imgs/RedBug.png';
        BlueBugImage.src = 'src/assets/imgs/BlueBug.png';
        GreenBugImage.src = 'src/assets/imgs/GreenBug.png';
        YellowBugImage.src = 'src/assets/imgs/YellowBug.png';
        const context = element.getContext('2d');
        wallImage.onload = function() {
            floorImage.onload = function() {
                let x = 0;
                let y = 0;
                for(let i = 0; i < body.length;i++){
                    let char = body.charAt(i);
                    if(char == 'X'){
                      context?.drawImage(wallImage, x, y, tileSize * scale, tileSize * scale);
                      x += tileSize;
                    }else if (char == '0'){
                      context?.drawImage(floorImage, x, y,tileSize * scale,tileSize * scale);
                      x += tileSize;
                    }else if (char == '1'){
                      context?.drawImage(RedBugImage, x, y, tileSize * scale, tileSize * scale);
                      x += tileSize;
                    }else if (char == '2'){
                      context?.drawImage(BlueBugImage, x, y, tileSize * scale, tileSize * scale);
                      x += tileSize;
                    }else if (char == '3'){
                      context?.drawImage(GreenBugImage, x, y, tileSize * scale, tileSize * scale);
                      x += tileSize;
                    }else if (char == '4'){
                      context?.drawImage(YellowBugImage, x, y, tileSize * scale, tileSize * scale);
                      x += tileSize;
                    }else {
                        y+= tileSize;
                        x=0;
                    }
                }
            }
        }
      }
      console.log(body);
    });

</script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';

#map-name {
  margin-bottom: 5%;
}
</style>
