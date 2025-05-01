<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed, onUnmounted } from 'vue'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { isAuthenticated } from '@/utils/supabase'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const router = useRouter()

const isLoggedIn = ref(false)

const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

onUnmounted(() => {
  getLoggedStatus()
})

// Rules for Vuetify text fields
const emailRules = [(v) => requiredValidator(v), (v) => emailValidator(v)]
const passwordRules = [(v) => requiredValidator(v), (v) => passwordValidator(v)]

// Form reference
const formRef = ref(null)

// Enable button only when inputs are filled and valid
const isFormValid = computed(() => {
  return (
    requiredValidator(email.value) === true &&
    emailValidator(email.value) === true &&
    requiredValidator(password.value) === true &&
    passwordValidator(password.value) === true
  )
})

// Handle login
const handleLogin = () => {
  if (formRef.value?.validate()) {
    console.log('Logging in with', email.value, password.value)
    router.push('/dashboard')
  } else {
    alert('Please fill in valid credentials.')
  }
}
</script>

<template>
  <div>
    <v-responsive class="rounded">
      <v-app>
        <!-- Top bar -->
        <v-app-bar class="px-3 transparent-bar" flat elevation="0">
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-main class="login-background">
          <v-container>
            <v-row>
              <!-- Left Column -->
              <v-col cols="6">
                <!-- Optional content -->
              </v-col>

              <!-- Right Column (Login Card) -->
              <v-col cols="6">
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="6" lg="4">
                      <v-card class="mx-auto translucent-card" width="400">
                        <!-- Logo -->
                        <v-img
                          src="/img/tgp_logo.jpg"
                          height="70"
                          width="70"
                          class="my-4 mx-auto rounded-circle"
                          style="border-radius: 50%"
                          cover
                        ></v-img>

                        <v-card-text class="pt-4">
                          <v-form
                            ref="formRef"
                            fast-fail
                            lazy-validation
                            @submit.prevent="handleLogin"
                          >
                            <v-text-field
                              v-model="email"
                              label="Email"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="emailRules"
                              prepend-inner-icon="mdi-email"
                            ></v-text-field>

                            <v-text-field
                              v-model="password"
                              :type="showPassword ? 'text' : 'password'"
                              label="Password"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="passwordRules"
                              prepend-inner-icon="mdi-lock"
                              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              @click:append-inner="showPassword = !showPassword"
                            ></v-text-field>

                            <v-btn
                              class="mt-2"
                              type="submit"
                              block
                              color="amber-darken-2"
                              variant="flat"
                              :disabled="!isFormValid"
                            >
                              Login
                            </v-btn>

                            <!-- Divider -->
                            <div class="d-flex align-center my-4">
                              <v-divider class="flex-grow-1"></v-divider>
                              <span class="mx-4 text-subtitle-2">OR</span>
                              <v-divider class="flex-grow-1"></v-divider>
                            </div>

                            <!-- Social Buttons -->
                            <div class="d-flex justify-center gap-4">
                              <v-btn icon color="red" variant="text">
                                <v-icon size="28">mdi-google</v-icon>
                              </v-btn>
                              <v-btn icon color="blue-darken-3" variant="text">
                                <v-icon size="28">mdi-facebook</v-icon>
                              </v-btn>
                            </div>
                          </v-form>
                        </v-card-text>

                        <!-- Register link -->
                        <v-row class="text-center mb-4">
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
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer class="footer-transparent d-flex justify-center text-center" app>
          © 2025 - TGP | All Rights Reserved
        </v-footer>
      </v-app>
    </v-responsive>
  </div>
</template>

<style scoped>
.login-background {
  background-image: url('/public/img/12.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.footer-transparent {
  background-color: transparent !important;
  color: white !important;
}

.transparent-bar {
  background-color: transparent !important;
  color: white !important;
}

.translucent-card {
  background-color: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(5px);
  border-radius: 20px;
}
</style>
