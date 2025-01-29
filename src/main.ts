import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import components from './primeComponents.ts';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import router from './router';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
// library.add([faFaceSmile]);

const app = createApp(App);
// app.component('font-awesome-icon', FontAwesomeIcon);

components.forEach(({ name, component }) => {
  app.component(name, component);
});

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(router);
app.mount('#app');
