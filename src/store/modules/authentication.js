import Vue from 'vue'
import router from '../../router/index'

export default {
  state: {
    user: null
  },
  mutations: {
    async login(state, user) {
      try {
        const response = await Vue.prototype.$http.post("auth", user);
        const {id, name, email} = response.data.user
        const token = response.data.token;
        state.user = {
          id,
          name,
          email
        }

        const loggedUser = JSON.stringify(response.data.user);

        localStorage.setItem("@keener_inventory_token", token);
        localStorage.setItem("@keener_inventory_user", loggedUser);

        router.push('/dashboard')

      } catch (err) {
        const errorMessage = err.response.data.error;
        alert(errorMessage);
      }
    },

    getUser(state) {
      const storagedUser = localStorage.getItem("@keener_inventory_user")

      if(storagedUser) {
        state.user = JSON.parse(storagedUser)
      } else {
        state.user = null
      }
    },

    signOut(state) {
      localStorage.removeItem("@keener_inventory_token")
      localStorage.removeItem("@keener_inventory_user");
      state.user = null
    }
  },
  actions: {
    async login(context, payload) {
      context.commit('login', payload)
    },
    getUser(context) {
      context.commit('getUser')
    },
    signOut(context) {
      context.commit('signOut')
    }
  },
  getters: {
      user(state) {
        return state.user
      }
  }
}