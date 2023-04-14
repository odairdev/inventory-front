<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row justify="center">
        <v-col cols="10" sm="5" md="10" lg="10">
          <v-card color="blue accent-2">
            <v-card-title class="white--text">Adicionar Ordem</v-card-title>
            <v-card>
              <v-container fill-height>
                <v-col cols="12" sm="12" md="6" lg="3">
                  <v-select
                    :items="products"
                    item-text="name"
                    item-value="id"
                    v-model="order.productId"
                    label="Produto"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="3">
                  <v-select
                    :items="[
                      { text: 'Entrada', value: 'in' },
                      { text: 'Saída', value: 'out' },
                    ]"
                    item-text="text"
                    item-value="value"
                    v-model="order.type"
                    label="Tipo"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="6" lg="4">
                  <v-text-field
                    label="Quantidade"
                    type="number"
                    class="px-2"
                    v-model.number="order.order_amount"
                    min="0"
                    max="999"
                    :error="order.order_amount < 0"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6" lg="2">
                  <v-btn
                    min-width="100%"
                    color="blue accent-2"
                    class="white--text"
                    @click="addOrder"
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
            :items="orders"
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
                    <span class="text-h5">Editar Ordem</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="[
                              { text: 'Entrada', value: 'in' },
                              { text: 'Saída', value: 'out' },
                            ]"
                            item-text="text"
                            item-value="value"
                            v-model="editedOrder.type"
                            label="Tipo"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model.number="editedOrder.order_amount"
                            label="Quantidade"
                            type="number"
                            min="0"
                            max="999"
                            :error="editedOrder.order_amount < 0"
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

            <template v-slot:[`item.type`]="{ item }">
              <v-chip :color="getColor(item.type)" dark>
                {{ item.type == "in" ? "Entrada" : "Saída" }}
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editProduct(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteOrder(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <p class="display-1 my-1">Nenhuma ordem cadastrada.</p>
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
    await this.initialize();
  },
  data() {
    return {
      dialog: false,
      order: {
        productId: "",
        type: "",
        order_amount: null,
      },
      editedOrder: {
        id: "",
        productId: "",
        type: "",
        order_amount: null,
      },
      products: [],
      orders: [],
      search: "",
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Produto",
          align: "start",
          sortable: false,
          value: "product.name",
        },
        {
          text: "Categoria",
          value: "product.category",
        },
        {
          text: "Quantidade",
          value: "order_amount",
        },
        {
          text: "Entrada/Saída",
          value: "type",
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
        this.order.productId.length <= 0 ||
        this.order.type.length <= 0 ||
        this.order.order_amount <= 0 ||
        !Number.isInteger(this.order.order_amount)
      );
    },
    invalidEditValues() {
      return (
        this.editedOrder.type.length <= 0 ||
        this.editedOrder.order_amount <= 0 ||
        !Number.isInteger(this.editedOrder.order_amount)
      );
    },
  },
  methods: {
    async addOrder() {
      try {
        await this.$http.post("inventory", this.order);
        alert("Ordem cadastrada com sucesso.");
        this.initialize();
      } catch (err) {
        console.log(err);
      }
    },
    editProduct(order) {
      this.dialog = true;
      this.editedOrder.id = order.id;
      this.editedOrder.productId = order.productId;
      this.editedOrder.type = order.type;
      this.editedOrder.order_amount = order.order_amount;
    },
    async deleteOrder(order) {
      try {
        if (
          confirm(
            `Deseja deletar a ordem de ${
              order.type == "in" ? "Entrada" : "Saída"
            } do produto '${order.product.name}'?`
          )
        ) {
          await this.$http.delete(`inventory/${order.id}`);
          this.initialize();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async saveEdit() {
      try {
        await this.$http.put("inventory", {
          id: this.editedOrder.id,
          type: this.editedOrder.type,
          order_amount: this.editedOrder.order_amount,
        });
        alert("Ordem editado com sucesso");
        this.dialog = false;
        this.initialize();
      } catch (err) {
        console.log(err);
      }
    },
    async initialize() {
      try {
        const response = await this.$http.get("products");
        this.products = response.data.products;
        const ordersResponse = await this.$http.get("inventory");
        this.orders = ordersResponse.data.orders;
        this.order = {
          productId: "",
          type: "",
          order_amount: null,
        };
      } catch (err) {
        console.log(err);
      }
    },
    getColor(value) {
      if (value == "in") return "green";
      else return "red";
    },
  },
};
</script>

<style></style>
