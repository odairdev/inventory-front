<template>
  <v-app app>
    <v-main>
      <Header v-if="signed" />
      <router-view />
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
