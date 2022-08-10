import { createApp } from 'vue'
import * as od from 'zrender'
import App from './App.vue'
import router from './router'
import store from './store'
import "./components/css/global.scss"

const app = createApp(App).use(store).use(router);

app.mount('#app');

app.config.globalProperties.$od = od;


