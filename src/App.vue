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
      console.log(user);
      userStore.userId = user.uid;
    } else {
      userStore.userId = '';
    }
    isLoading.value = false;
  });
});
</script>

<template>
  <div class="container">
    <app-header />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1230px; /* 1200px*/
  width: 100%;
}
</style>
