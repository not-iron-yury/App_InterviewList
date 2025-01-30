import { createApp } from 'vue';
import './style.css';
import '/node_modules/primeflex/primeflex.css';

import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import components from './primeComponents.ts';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();

components.forEach(({ name, component }) => {
  app.component(name, component);
});

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(router);
app.use(pinia);
app.mount('#app');
