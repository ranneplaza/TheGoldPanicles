<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center">
    <v-responsive class="rounded">
      <v-app>
        <!-- Top bar without border -->
        <v-app-bar color="amber-darken-2" class="px-3" flat>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12" md="6" lg="4">
                <v-card class="mx-auto" width="100%">
                  <!-- Rounded Logo -->
                  <v-img
                    src="/img/tgp_logo.jpg"
                    height="120"
                    width="120"
                    class="my-4 mx-auto rounded-circle"
                    cover
                  ></v-img>

                  <template v-slot:title>
                    <div class="text-center font-weight-black text-h6">Welcome to TGP</div>
                  </template>

                  <v-card-subtitle class="text-center">
                    We never flinched in serving you the Truth
                  </v-card-subtitle>

                  <v-card-text class="pt-4">
                    <v-form fast-fail @submit.prevent>
                      <v-text-field
                        label="Email"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <v-text-field
                        label="Password"
                        type="password"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <RouterLink to="/dashboard">
                        <v-btn
                          class="mt-2"
                          type="submit"
                          block
                          color="amber-darken-2"
                          variant="flat"
                        >
                          Login
                        </v-btn>
                      </RouterLink>

                      <div class="text-center my-4 text-subtitle-2">
                        ------------------------- or continue -------------------------
                      </div>
                      <div class="d-flex justify-center gap-4 mb-4">
                        <v-btn icon color="red" variant="text">
                          <v-icon size="28">mdi-google</v-icon>
                        </v-btn>
                        <v-btn icon color="blue-darken-3" variant="text">
                          <v-icon size="28">mdi-facebook</v-icon>
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>

                  <!-- Sign up text -->
                  <v-row justify="center" class="mt-3">
                    <v-col class="text-center">
                      <span>Don't have an account? </span>
                      <RouterLink to="/register">
                        <span class="text-primary" style="cursor: pointer">Sign up</span>
                      </RouterLink>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

          <v-footer class="d-flex justify-center text-center" color="amber-darken-2" border app>
            © 2025 - TGP | All Rights Reserved
          </v-footer>
        </v-main>
      </v-app>
    </v-responsive>
  </div>
</template>
