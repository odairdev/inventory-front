<template>
  <v-app app>
    <v-main>
      <Header v-if="signed" />
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: { Header },
  name: "App",
  created() {
    this.$store.dispatch("getUser");
  },
  computed: {
    signed() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style>
	@keyframes slide-in {
		from { transform: translateY(-30px); opacity: 0;}
		to { transform: translateY(0px); opacity: 1;}
	}

	@keyframes slide-out {
		from { transform: translateY(0px); opacity: 1;}
		tp { transform: translateY(-30px); opacity: 0;}
	}

	.slide-enter-active {
		animation: slide-in 0.3s ease
	}

	.slide-leave-active {
		animation: slide-out 0.3s ease;
	}
</style>
