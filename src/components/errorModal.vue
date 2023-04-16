<template>
  <v-dialog
    v-model="active"
    max-width="500px"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="text-h5">Erro</v-card-title>

      <v-card-text class="red--text lighten-1" >{{ message }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeError">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: true, default: false },
    message: {type: String}
  },
  methods: {
    closeError() {
      this.$emit('closeDialog')
    }
  }
};
</script>

<style></style>
