<template>
  <div id="hero">
    <button class="play-button" @click="$router.push('/lobby')">PLAY</button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/assets/styles/styles.scss';
#hero {
  background-image: url('../assets/images/hero-image-mobile.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  //   background-position: center;
  height: 100vh;
  width: 100vw;
  position: absolute; // Position the div absolutely
  top: 60px; // Align the div to the top edge of the parent element
  display: flex; // Use Flexbox for layout
  justify-content: center; // Horizontally center the content
  align-items: flex-start; // Vertically center the content
  padding-top: 60px;
  z-index: 1;

  // overflow: hidden; // Ensure no overflow content is visible
}

</style>
