import { createApp } from 'vue';

import App from './App.vue';
import './styles/main.scss';
import { router } from './router/index';
import 'componentsrichlibrary/dist/UiButton/UiButton.css';
import 'componentsrichlibrary/dist/UiInput/UiInput.css';
import 'componentsrichlibrary/dist/UiSelect/UiSelect.css';
import 'componentsrichlibrary/dist/UiField/UiField.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
