<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const refVForm = ref()
const router = useRouter()

const formDataDefault = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const formData = ref({ ...formDataDefault })

const onSubmit = () => {
  alert('Form submitted: ' + JSON.stringify(formData.value))
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) {
      onSubmit()
      handleRegister()
    }
  })
}

const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    formData.value.password.trim() !== '' &&
    formData.value.confirmPassword.trim() !== '' &&
    formData.value.password === formData.value.confirmPassword
  )
})

const handleRegister = () => {
  if (isFormValid.value) {
    console.log('Registering', formData.value.name, formData.value.email, formData.value.password)
    router.push('/dashboard') // Redirect after successful registration
  } else {
    alert('Please fill in all fields correctly.')
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
                <!-- Optional welcome content -->
              </v-col>

              <!-- Right Column (Register Card) -->
              <v-col cols="6">
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="8" lg="6">
                      <v-card class="mx-auto translucent-card" width="400">
                        <!-- Logo -->
                        <v-img
                          src="/img/tgp_logo.jpg"
                          height="70"
                          width="70"
                          class="my-4 mx-auto rounded-circle"
                          cover
                        ></v-img>

                        <v-card-subtitle class="text-center"> Create an Account </v-card-subtitle>

                        <v-card-text class="pt-4">
                          <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
                            <v-text-field
                              v-model="formData.name"
                              label="Full Name"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="[requiredValidator]"
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.email"
                              label="Email"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="[requiredValidator, emailValidator]"
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.password"
                              label="Password"
                              type="password"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="[requiredValidator, passwordValidator]"
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.confirmPassword"
                              label="Confirm Password"
                              type="password"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :rules="[
                                requiredValidator,
                                (value) => confirmedValidator(value, formData.value.password),
                              ]"
                            ></v-text-field>

                            <RouterLink to="/dashboard">
                              <v-btn
                                class="mt-2"
                                type="submit"
                                block
                                color="amber-darken-2"
                                variant="flat"
                                :disabled="!isFormValid"
                              >
                                Register
                              </v-btn>
                            </RouterLink>
                          </v-form>
                        </v-card-text>

                        <v-row class="text-center mb-4">
                          <v-col class="text-center">
                            <span>Already have an account? </span>
                            <RouterLink to="/">
                              <span class="text-primary" style="cursor: pointer">Login</span>
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
  background-image: url('/img/12.png');
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
