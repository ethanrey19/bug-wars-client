<template>
  <div class="script-detail-page">
    <h2 class="Large-Headline-Text">{{ script.name }}</h2>
    <div class="script-body-container Small-Body-Text">
      {{ script.body }}
    </div>
   <div class="container">
      <UpdateScript/>   
      <DeleteScript />
  </div>
  </div>
</template>




<script setup lang="ts">
import { useScriptStore } from '@/stores/ScriptStore';
import { computed, onUnmounted } from 'vue';
import UpdateScript from '@/components/UpdateScript.vue';
import DeleteScript from '@/components/DeleteScript.vue';
const scriptStore = useScriptStore();
const script = computed(() => {
  return scriptStore.currentScript;
});
onUnmounted(() => {
  scriptStore.setCurrentScript({
    scriptId: 0,
    name: "",
    body: "",
});
});
</script>

<style lang="scss" scoped>

@import '@/assets/styles/styles.scss';
.script-detail-page {
  margin: 0 $MobileEdgeInset;
}

.Large-Headline-Text {
  text-align: center;
  margin: 0;
  margin-bottom: 80px;
}

.script-body-container {
  margin-top: 80px;
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid $Gray;
  background-color: $Dark-Gray;
  word-wrap: break-word;
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

* {
  text-transform: uppercase;
}

</style>