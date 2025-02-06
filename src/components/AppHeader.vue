<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '../stores/user';
import type { ComputedRef } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
// const showLinks = computed((): boolean => !!userStore.userId); // ???

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
  show: ComputedRef<boolean>;
}

const items = ref<IMenuItem[]>([
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
    show: computed((): boolean => !!userStore.userId),
  },
  {
    label: 'Список задач',
    icon: 'pi pi-list',
    path: '/list',
    show: computed((): boolean => !!userStore.userId),
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/stat',
    show: computed((): boolean => !!userStore.userId),
  },
]);

const signOutHandler = async (): Promise<void> => {
  await signOut(getAuth());
  router.push('/auth');
};
</script>

<template>
  <header class="header">
    <app-menu-bar :model="items" class="menu">
      <template #item="{ item, props }">
        <template v-if="item.show">
          <router-link :to="item.path" class="menu__link" v-bind="props.action">
            <span :class="item.icon" class="p-menuitem-icon" />
            <span class="ml-2">{{ item.label }}</span>
          </router-link>
        </template>
      </template>
      <template #end>
        <div class="menu__link menu__link--end menu-exit" v-if="userStore.userId" @click="signOutHandler">
          <span class="pi pi-angle-right p-menuitem-icon" />
          <span class="ml-2">Выход</span>
        </div>
        <router-link to="/auth" class="menu__link menu__link--end p-menubar-item-link" v-else>
          <span class="pi pi-user p-menuitem-icon" />
          <span class="ml-2">Авторизация</span>
        </router-link>
      </template>
    </app-menu-bar>
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
.menu__link--end {
  padding: 8px 12px;
}
.menu-exit {
  cursor: pointer;
}
</style>
