<template>
  <div class="counter">
    <div>Count: {{ count }}</div>
    <button type="button" @click="increment">Increment</button>
  </div>
</template>
<script setup lang="ts">
import { useCounter } from '@/composables/counter';

const { count, increment } = useCounter();
</script>

<style scoped>
.counter {
  border: 1px solid black;
  padding: 10px;
}
</style>
