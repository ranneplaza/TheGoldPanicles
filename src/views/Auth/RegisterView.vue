<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const refVForm = ref()
const router = useRouter()

const formDataDefault = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const formData = ref({ ...formDataDefault })

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formAction = ref({ ...formActionDefault })

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        fullname: formData.value.name,
      },
    },
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account'
    refVForm.value?.reset()
    router.replace('/dashboard') // Redirect only if signup succeeded
  }

  formAction.value.formProcess = false
}

const isFormValid = computed(() => {
  return (
    requiredValidator(formData.value.name) === true &&
    requiredValidator(formData.value.email) === true &&
    emailValidator(formData.value.email) === true &&
    requiredValidator(formData.value.password) === true &&
    passwordValidator(formData.value.password) === true &&
    requiredValidator(formData.value.confirmPassword) === true &&
    confirmedValidator(formData.value.confirmPassword, formData.value.password) === true
  )
})

const onFormSubmit = () => {
  refVForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      await onSubmit()
    }
  })
}
</script>

<template>
  <v-alert
    v-if="formAction.formSuccessMessage"
    :text="formAction.formSuccessMessage"
    title="Success!"
    type="success"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>
  <v-alert
    v-if="formAction.formErrorMessage"
    :text="formAction.formErrorMessage"
    title="Ooops!"
    type="error"
    variant="tonal"
    density="compact"
    border="start"
    closable
  ></v-alert>

  <div>
    <v-responsive class="rounded">
      <v-app>
        <v-app-bar class="px-3 transparent-bar" flat elevation="0">
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-main class="login-background">
          <v-container>
            <v-row>

              <v-col>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="8" lg="6">
                      <v-card class="mx-auto translucent-card" width="400">
                        <v-img
                          src="/img/tgp_logo.jpg"
                          height="70"
                          width="70"
                          class="my-4 mx-auto rounded-circle"
                          cover
                        ></v-img>

                        <v-card-subtitle class="text-center"> Create an Account </v-card-subtitle>

                        <v-card-text class="pt-4">
                          <v-form
                            ref="refVForm"
                            fast-fail
                            lazy-validation
                            @submit.prevent="onFormSubmit"
                          >
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
                              :type="showPassword ? 'text' : 'password'"
                              label="Password"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              @click:append-inner="showPassword = !showPassword"
                              :rules="[requiredValidator, passwordValidator]"
                            ></v-text-field>

                            <v-text-field
                              v-model="formData.confirmPassword"
                              :type="showConfirmPassword ? 'text' : 'password'"
                              label="Confirm Password"
                              color="amber-darken-2"
                              variant="solo-filled"
                              required
                              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              @click:append-inner="showConfirmPassword = !showConfirmPassword"
                              :rules="[
                                requiredValidator,
                                (value) => confirmedValidator(value, formData.password),
                              ]"
                            ></v-text-field>

                            <v-btn
                              class="mt-2"
                              type="submit"
                              block
                              color="amber-darken-2"
                              variant="flat"
                              :disabled="formAction.formProcess"
                              :loading="formAction.formProcess"
                            >
                              Register
                            </v-btn>
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
          © {{ new Date().getFullYear() }}  TGP | All Rights Reserved
        </v-footer>
      </v-app>
    </v-responsive>
  </div>
</template>

<style scoped>
.login-background {
  background-color: black;
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
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(5px);
  border-radius: 10px;
}
</style>
