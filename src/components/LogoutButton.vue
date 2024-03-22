<template>
  <button class="login-logout-button" type="button" @click="logout">LOGOUT</button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped></style>
