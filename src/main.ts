import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'reflect-metadata'

import App from '@/framework/UI/App.vue'
import router from '@/framework/UI/router'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import './framework/UI/assets/layout/index.scss'
import './framework/UI/assets/main.css'

import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/themes/soho-light/theme.css'
// import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/themes/fluent-light/theme.css'
import '/node_modules/primeflex/primeflex.css'
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'

// import css
import 'vue3-emoji-picker/css'
const app = createApp(App)

app.use(createPinia())
app.use(router).component("EmojiPicker",EmojiPicker)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

app.mount('#app')
