<template>
  <v-toolbar class="blue accent-2 white--text">
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>Keener</span>
      <span class="font-weight-light">Inventory</span>
    </v-toolbar-title>
    <v-toolbar-items v-if="!isMobileOrSm">
      <v-btn class="white--text" text to="/dashboard" exact>Inicio</v-btn>
      <v-btn class="white--text" text to="/dashboard/products">Produtos</v-btn>
      <v-btn class="white--text" text to="/dashboard/orders">Ordens</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="!isMobileOrSm">
      <v-btn class="white--text" text @click="logOut" exact>Sair</v-btn>
    </v-toolbar-items>

    <v-menu offset-y v-if="isMobileOrSm">
        <template v-slot:activator="{on}">
          <v-btn text color="blue accent-2" v-on="on"><v-icon color="white">fa-solid fa-bars</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-item >
            <v-list-item-title @click="mobileButtonAction('/dashboard')">Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title @click="mobileButtonAction('/dashboard/products')">Produtos</v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title @click="mobileButtonAction('/dashboard/orders')">Ordens</v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title @click="logOut">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logOut() {
      if (confirm("Deseja sair?") === true) {
        this.$store.dispatch("signOut");
        this.$router.push("/");
      } else {
        return;
      }
    },
    mobileButtonAction(to) {
      if(to == this.$route.path) {
        return
      }
      this.$router.push(to)
    }
  },

  computed: {
   isMobileOrSm() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
   }
}
};
</script>

<style></style>
