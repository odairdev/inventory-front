<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row justify="center">
        <v-col cols="10" sm="5" md="10" lg="10">
          <v-card color="blue accent-2">
            <v-card-title class="white--text">Adicionar Produto</v-card-title>
            <v-card>
              <v-container fill-height>
                <v-col cols="12" sm="12" md="6" lg="3">
                  <v-text-field
                    label="Nome do Produto"
                    type="text"
                    class="px-2"
                    v-model="product.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="3">
                  <v-text-field
                    label="Categoria"
                    type="text"
                    class="px-2"
                    v-model="product.category"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    label="Quantidade"
                    type="number"
                    class="px-2"
                    v-model.number="product.amount"
                    min="0"
                    max="999"
                    :error="product.amount < 0"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6" lg="2">
                  <v-btn
                    min-width="100%"
                    color="blue accent-2"
                    class="white--text"
                    @click="addProduct"
                    :disabled="invalidInputValues"
                    >Adicionar</v-btn
                  >
                </v-col>
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
                label="Pesquisar"
                class="mx-4"
              ></v-text-field>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Editar Produto</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedProduct.name"
                            label="Nome do Produto"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedProduct.category"
                            label="Categoria"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model.number="editedProduct.amount"
                            label="Quantidade"
                            type="number"
                            min="0"
                            max="999"
                            :error="editedProduct.amount < 0"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveEdit"
                      :disabled="invalidEditValues"
                    >
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editProduct(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <p class="display-1 my-1">Nenhuma produto cadastrado.</p>
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
    this.initialize();
  },
  data() {
    return {
      dialog: false,
      product: {
        name: "",
        category: "",
        amount: null,
      },
      editedProduct: {
        id: '',
        name: "",
        category: "",
        amount: null,
      },
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
        this.product.name.length <= 0 ||
        this.product.category.length <= 0 ||
        this.product.amount <= 0 ||
        !Number.isInteger(this.product.amount)
      )
    },
    invalidEditValues() {
      return (
        this.editedProduct.name.length <= 0 ||
        this.editedProduct.category.length <= 0 ||
        this.editedProduct.amount <= 0 ||
        !Number.isInteger(this.editedProduct.amount)
      );
    },
  },
  methods: {
    async addProduct() {
      try {
        await this.$http.post("products", this.product);
        alert("Produto cadastrado com sucesso.");
        this.initialize();
      } catch (err) {
        console.log(err);
      }
    },
    editProduct(product) {
      this.dialog = true;
      this.editedProduct.id = product.id;
      this.editedProduct.name = product.name;
      this.editedProduct.category = product.category;
      this.editedProduct.amount = product.amount;
    },
    async deleteProduct(product) {
      try {
        if (confirm(`Deseja deletar o produto ${product.name}?`)) {
          await this.$http.delete(`products/${product.id}`);
          this.initialize();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async saveEdit() {
      try {
        console.log(this.editedProduct)
        await this.$http.put('products', this.editedProduct)
        alert('Produto editado com sucesso')
        this.dialog = false
        this.initialize()
      }catch(err) {
        console.log(err)
      }
    },
    async initialize() {
      try {
        const response = await this.$http.get("products");
        this.products = response.data.products;
        this.product = {
          name: "",
          category: "",
          amount: null,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
