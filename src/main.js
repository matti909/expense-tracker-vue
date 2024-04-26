import { createApp } from 'vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import App from './App.vue'
import './assets/style.css'

const app = createApp(App)
app.use(ToastPlugin)
app.mount('#app')
