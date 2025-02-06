import { createApp } from 'vue';
import './style.css';
import '/node_modules/primeflex/primeflex.css';

import App from './App.vue';
import router from './router/index.ts';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import components from './primeComponents.ts';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'vue-tasklist-f1fd2.firebaseapp.com',
  projectId: 'vue-tasklist-f1fd2',
  storageBucket: 'vue-tasklist-f1fd2.firebasestorage.app',
  messagingSenderId: '33847076911',
  appId: '1:33847076911:web:8349e8674235918b73feda',
};
initializeApp(firebaseConfig);

const app = createApp(App);

components.forEach(({ name, component }) => {
  app.component(name, component);
});

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);
app.use(router);
app.use(createPinia());
app.mount('#app');
