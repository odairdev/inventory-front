import Vue from 'vue'
import axios from 'axios'

// axios.defaults.baseURL = 'https://curso-vue-ade35-default-rtdb.firebaseio.com/'

Vue.use({
  install(Vue) {
    // Vue.prototype.$http = axios
    Vue.prototype.$http = axios.create({
      baseURL: 'http://localhost:3333/',
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('@keener_inventory_token')
      }
    })
    
  }
})