import { createApp } from 'vue'
import * as od from 'zrender'
import elementPlus from 'element-plus'
import * as elementPlusIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import "./omnipotentDrawing/css/global.scss"
import "./omnipotentDrawing/css/variables.scss"

const app = createApp(App);
app.use(elementPlus).use(store).use(router);

//注册elementPlis的图标icon组件
for(const [key,component] of Object.entries(elementPlusIcons)){
    app.component(key,component);
}

app.mount('#app');

app.config.globalProperties.$od = od;


