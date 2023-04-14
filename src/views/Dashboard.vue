<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row  justify="center">
        <v-col cols="8" sm="6">
          <v-card elevation="12" class="mt-12">
            <v-card-text class="text-center display-1">
              Olá, {{ user.name }} 
            </v-card-text>

            <v-layout row wrap justify-center>
              <v-flex xs10 md4 lg4 class="pa-3">
                <v-card class="blue accent-2" hover to="/dashboard/products">
                  <v-card-title class="white--text">
                    Produtos
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs10 md4 lg4 class="pa-3 mb-3">
                <v-card class="blue accent-2" hover to="/dashboard/orders">
                  <v-card-title class="white--text">
                    Ordens
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  async created() {
    new Promise((promise) => setTimeout(promise, 1000));
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
</style>
