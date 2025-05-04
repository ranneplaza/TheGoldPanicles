<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formActionDefault, supabase } from '@/utils/supabase'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'

const router = useRouter()

// Default form state
const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const showPassword = ref(false)
const formRef = ref()

// Validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => emailValidator(v) || 'Invalid email format',
]

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => passwordValidator(v) || 'Password must be at least 6 characters',
]

// Submit logic
const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Logged In.'
    router.replace('/dashboard')
  }

  formRef.value?.reset()
  formAction.value.formProcess = false
}

// Validate and handle form submit
const handleLogin = () => {
  formRef.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <div>
    <v-responsive class="rounded">
      <v-app>
        <!-- App Bar -->
        <v-app-bar class="px-3 transparent-bar" flat elevation="0">
          <v-spacer></v-spacer>
        </v-app-bar>

        <!-- Main content -->
        <v-main class="login-background">
          <v-container>
            <v-row>
              <v-col cols="6"><!-- Optional content --></v-col>

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
                          class="my-4 mx-auto"
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
                              v-model="formData.email"
                              label="Email"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="emailRules"
                              prepend-inner-icon="mdi-email"
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.password"
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
                              :loading="formAction.formProcess"
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
