<script setup>
import { ref } from 'vue'

const selectedMonth = ref('2024 November')
const eventName = ref('')
const eventDescription = ref('')
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="amber-darken-2" flat elevation="0">
      <v-toolbar-title class="text-white d-flex align-center">
        <v-img
          src="/img/tgp_logo.jpg"
          alt="Logo"
          height="40"
          width="40"
          class="mr-2 rounded-circle"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar color="white" size="32" class="mr-4">
        <span class="text-black font-weight-bold">CL</span>
      </v-avatar>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-white">
      <v-container fluid>
        <v-row no-gutters>
          <!-- Left Side Schedule Layout -->
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-4 pa-4">
              <!-- Header -->
              <v-row class="text-center font-weight-bold border-b">
                <v-col cols="4">Thursday</v-col>
                <v-col cols="4">9:00 A.M</v-col>
                <v-col cols="4">8:00 P.M</v-col>
              </v-row>

              <!-- Form section -->
              <v-row class="pa-4">
                <v-col cols="12">
                  <v-text-field
                    v-model="eventName"
                    placeholder="Event Name"
                    variant="outlined"
                    hide-details
                  />
                  <v-textarea
                    v-model="eventDescription"
                    placeholder="Event Description"
                    rows="2"
                    variant="outlined"
                    hide-details
                  />
                  <v-file-input
                    label="Attached Activity Design"
                    prepend-icon="mdi-paperclip"
                    hide-details
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-btn color="amber-darken-2" class="text-white">Submit request</v-btn>
                </v-col>
              </v-row>

              <!-- Footer navigation -->
              <v-row align="center" justify="center" class="mt-4">
                <v-btn icon>
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <span class="mx-4 font-weight-medium">{{ selectedMonth }}</span>
                <v-btn icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </v-sheet>
          </v-col>

          <!-- Right Side Buttons -->
          <v-col cols="3" class="pa-4">
            <v-btn block variant="outlined" class="mb-4">Calendar</v-btn>
            <v-btn block variant="outlined">My request</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer class="d-flex justify-center text-center" color="amber-darken-2" border app>
      © 2025 - TGP | All Rights Reserved
    </v-footer>
  </v-app>
</template>
