import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

auth.onAuthStateChanged(user => {
  if (user) {
    const detectedUser = {
      email: user.email,
      uid: user.uid
    }
    store.commit('setUser', detectedUser)
  } else {
    store.commit('setUser', null)
  }

  Vue.use(Vuelidate)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

