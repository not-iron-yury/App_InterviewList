<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const isLoading = ref<boolean>(true);

onMounted(() => {
  onAuthStateChanged(getAuth(), user => {
    if (user) {
      userStore.userId = user.uid;
    } else {
      userStore.userId = '';
    }
    isLoading.value = false;
  });
});
</script>

<template>
  <app-spiner v-if="isLoading" class="spiner" />
  <div class="container" v-else>
    <app-header />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1290px; /* 1260px*/
  width: 100%;
}
.spiner {
  display: flex;
  place-items: center;
  height: 100vh;
}
</style>
