<script setup>
import { ref } from 'vue'

const requests = ref([
  { description: 'Description', statusCheck: false, statusX: false },
  { description: '', statusCheck: false, statusX: false },
  { description: '', statusCheck: false, statusX: false },
  { description: '', statusCheck: false, statusX: false },
  { description: '', statusCheck: false, statusX: false },
])
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="amber-darken-2" flat elevation="0">
      <v-toolbar-title class="text-white d-flex align-center">
        <v-img src="/img/tgp_logo.jpg" height="40" width="40" class="mr-2 rounded-circle" />
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
          <!-- Table Section -->
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-4" style="height: 100%">
              <table style="width: 100%; border-collapse: collapse">
                <thead>
                  <tr style="background-color: #ccc; border: 2px solid black">
                    <th style="border: 2px solid black; padding: 12px; text-align: center">
                      Request
                    </th>
                    <th style="border: 2px solid black; padding: 12px; text-align: center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(req, index) in requests"
                    :key="index"
                    style="background-color: #ddd; border: 2px solid black"
                  >
                    <td style="border: 2px solid black; padding: 12px">{{ req.description }}</td>
                    <td style="border: 2px solid black; padding: 12px; text-align: center">
                      <v-btn
                        icon
                        @click="req.statusCheck = !req.statusCheck"
                        :color="req.statusCheck ? 'green' : ''"
                        variant="text"
                      >
                        <v-icon>{{
                          req.statusCheck ? 'mdi-check-bold' : 'mdi-checkbox-blank-outline'
                        }}</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        @click="req.statusX = !req.statusX"
                        :color="req.statusX ? 'red' : ''"
                        variant="text"
                      >
                        <v-icon>{{
                          req.statusX ? 'mdi-close-thick' : 'mdi-checkbox-blank-outline'
                        }}</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-sheet>
          </v-col>

          <!-- Sidebar -->
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
