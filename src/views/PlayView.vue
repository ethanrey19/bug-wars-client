<template>
  <div class="board">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      tabindex="0"
      style="border: 3px solid white"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'PlayView',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const scale = 1;
    let tileSize = 16 * scale;
    let mapWidth = 11 * scale;
    let mapHeight = 11 * scale;
    const width: number = tileSize * mapWidth;
    const height: number = tileSize * mapHeight;
    // convert width and height to ref also if reactive

    let body = "" +
    "XXXXXXXXXXX\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "X000000000X\n" +
    "XXXXXXXXXXX";
     onMounted(() => {
      let element = canvasRef.value;
      if (element) {
        console.log('loading picture');
        const wallImage = new Image();
        const floorImage = new Image();
        wallImage.src = 'src/assets/terrain/wall.png';
        floorImage.src = 'src/assets/terrain/floor.png';
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

    return {
      canvasRef,
      width,
      height,
    };
  }
});
</script>
