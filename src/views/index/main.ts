import { createApp } from "vue";
import App from './App.vue'

// 引入Pinia
import { createPinia } from 'pinia'

// 引入全局样式
import '../../styles'

const app = createApp(App)

// 挂载Pinia
app.use(createPinia())
// 挂载组件
app.mount('#app');