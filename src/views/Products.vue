<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row justify="center">
        <v-col cols="10" sm="5" md="10" lg="10">
          <v-card color="blue accent-2">
            <v-card-title class="white--text">Adicionar Produto</v-card-title>
            <v-card>
              <v-container fill-height>
                <v-text-field
                  label="Nome do Produto"
                  type="text"
                  class="px-2"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  label="Categoria"
                  type="text"
                  class="px-2"
                  v-model="category"
                ></v-text-field>
                <v-text-field
                  label="Quantidade"
                  type="number"
                  class="px-2"
                  v-model.number="amount"
                  min="0"
                  max="999"
                  :error="amount < 0"
                ></v-text-field>
                <v-btn
                  color="blue accent-2"
                  class="white--text"
                  @click="addProduct"
                  :disabled="invalidInputValues"
                  >Adicionar</v-btn
                >
              </v-container>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="10" lg="10">
          <v-data-table
            :headers="headers"
            :items="products"
            item-key="id"
            :search="search"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search (UPPER CASE ONLY)"
                class="mx-4"
              ></v-text-field>

            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  async created() {
    this.initialize()
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false, //TRansformar em objeto
      name: "",
      category: "",
      amount: null,
      products: [],
      search: "",
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Nome",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Categoria",
          value: "category",
        },
        {
          text: "Quantidade",
          value: "amount",
        },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
        },
      ];
    },
    invalidInputValues() {
      return (
        this.name.length <= 0 ||
        this.category.length <= 0 ||
        this.amount <= 0 ||
        !Number.isInteger(this.amount)
      );
    },
  },
  methods: {
    async addProduct() {
      const newProduct = {
        name: this.name,
        category: this.category,
        amount: this.amount,
      };

      try {
        await this.$http.post("products", newProduct);
        alert("Produto cadastrado com sucesso.");
        this.initialize()
      } catch (err) {
        console.log(err);
      }
    },
    async initialize() {
      try {
        const response = await this.$http.get("products");
        this.products = response.data.products;
        this.name = ''
        this.category = ''
        this.amount = null
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
