<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  {
    label: 'Авторизация',
    icon: 'pi pi-user',
    path: '/auth',
  },
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
  },
  {
    label: 'Список задач',
    icon: 'pi pi-list',
    path: '/list',
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/stat',
  },
  // {
  //   label: 'Выход',
  //   icon: 'pi pi-angle-right',
  // },
]);
</script>

<template>
  <header class="header">
    <menu-bar :model="items" class="menu">
      <template #item="{ item, props }">
        <router-link :to="item.path" class="menu__link" v-bind="props.action">
          <span :class="item.icon" class="p-menuitem-icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
    </menu-bar>
  </header>
</template>

<style scoped>
.header {
  padding: 30px 0;
}
.menu__link {
  display: flex;
  align-items: center;
}
.menu-exit {
  cursor: pointer;
}
</style>
