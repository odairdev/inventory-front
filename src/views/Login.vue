<template>
  <v-app app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step" :value="1">
                <v-window-item value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 blue--text text--accent-2"
                        >
                          Conecte-se ao Keener Inventory
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn fab color="blue" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn fab color="blue" class="ml-2" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn fab color="blue" class="ml-2" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center ml-4 mt-4">
                          Faça login utilizando seu email e senha
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="blue accent-2"
                            v-model="email"
                          />
                          <v-text-field
                            label="Senha"
                            id="password"
                            prepend-icon="lock"
                            type="password"
                            color="blue accent-2"
                            v-model="password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-3">
                        <v-btn
                          rounded
                          class="blue accent-2"
                          dark
                          @click.prevent="signIn"
                          >Entrar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="blue accent-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Olá, Visitante!</h1>
                        <h4 class="text-center mt-1">
                          Registre-se utilizando seu email e comece a utilizar o sistema
                        </h4>
                      </v-card-text>
                      <div class="text-center mb-2">
                        <v-btn rounded outlined dark @click="toSignUp"
                          >Registrar</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue accent-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Seja Bem-vindo !</h1>
                        <h4 class="text-center">
                          Se já possui uma conta, por favor clique no botão abaixo
                        </h4>
                      </v-card-text>
                      <div class="text-center mb-3">
                        <v-btn rounded outlined dark @click="toLogin">
                          Entrar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 blue--text text--accent-2"
                        >
                          Criar Conta
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="blue" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="blue" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="blue" outlined @click="noFunctionalButton">
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">
                          Utilize um email valido para registro
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Nome"
                            name="name"
                            prepend-icon="person"
                            type="text"
                            color="blue accent-2"
                            v-model="name"
                          >
                          </v-text-field>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="blue accent-2"
                            v-model="email"
                          >
                          </v-text-field>
                          <v-text-field
                            label="Senha"
                            name="Senha"
                            prepend-icon="lock"
                            color="blue accent-2"
                            type="password"
                            v-model="password"
                          >
                          </v-text-field>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="blue accent-2 mb-3"
                          dark
                          @click.prevent="signup"
                          >Registrar</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      name: "",
    };
  },
  props: {
    source: { type: String },
  },
  methods: {
    async signIn() {
      const user = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", user);
      } catch (err) {
      }

    },
    async signup() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      try {
        await this.$http.post("users", user);
        alert("Usuário criado com sucesso");
        this.password = ''
        this.step = 1;
      } catch (err) {
        const errorMessage =
          err.response.data.error.errors || "Email já em uso";
        alert(errorMessage);
      }
    },

    toSignUp() {
      this.step++;
      (this.email = ""), (this.password = "");
    },
    toLogin() {
      this.step--;
      (this.name = ""), (this.email = ""), (this.password = "");
    },

    noFunctionalButton() {
      alert('Funcionalidade ainda não disponivel.')
    }
  },
};
</script>

<style></style>
