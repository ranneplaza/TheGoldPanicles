<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Background wrapper with flexbox to center the card -->
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
                    <div class="text-center font-weight-black text-h6">Create an Account</div>
                  </template>

                  <v-card-subtitle class="text-center">
                    Join us and experience the truth
                  </v-card-subtitle>

                  <v-card-text class="pt-4">
                    <v-form fast-fail @submit.prevent>
                      <!-- Name Input -->
                      <v-text-field
                        label="Full Name"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <!-- Email Input -->
                      <v-text-field
                        label="Email"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <!-- Password Input -->
                      <v-text-field
                        label="Password"
                        type="password"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <!-- Confirm Password Input -->
                      <v-text-field
                        label="Confirm Password"
                        type="password"
                        color="amber-darken-2"
                        variant="solo-filled"
                      ></v-text-field>

                      <!-- Register Button -->
                      <v-btn class="mt-2" type="submit" block color="amber-darken-2" variant="flat">
                        Register
                      </v-btn>
                    </v-form>
                  </v-card-text>

                  <v-row justify="center" class="mt-3">
                    <v-col class="text-center">
                      <span>Already have an account? </span>
                      <RouterLink to="/login">
                        <span class="text-primary" style="cursor: pointer">Login</span>
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
