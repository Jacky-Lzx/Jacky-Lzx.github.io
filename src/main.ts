// import './assets/main.css'
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/reset.css';

import 'animate.css';

// 滚动动画
// importing AOS css style globally
// tslint:disable-next-line:no-var-requires
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    once: true, // 只展示一次动画
    offset: 50,
    delay: 100,
    duration: 1000,
});

// ES6
import VueTyper from 'vue3-typer'
import "vue3-typer/dist/vue-typer.css"
// Global
// const VueTyper = window.VueTyper.default
import './styles/typer.scss';

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {createPinia} from 'pinia'

import VueSmoothScroll from 'v-smooth-scroll'

const pinia = createPinia()
const app = createApp(App)


app.use(Antd)
app.use(router)
app.use(pinia)
app.use(VueSmoothScroll)
app.use(VueTyper)
app.use(VueAxios, axios)

app.mount('#app')
