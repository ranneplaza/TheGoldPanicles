<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const selectedMonth = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }),
)

const getColor = (day) => {
  const greenDays = ['1', '3', '4', '7', '25', '26', '27', '28', '29']
  const redDays = ['5', '6', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22']
  if (greenDays.includes(day.toString())) return 'green'
  if (redDays.includes(day.toString())) return 'red'
  return 'grey'
}

// Generate calendar grid for the current month
const calendar = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const weeks = []
  let week = new Array(firstDay).fill('')

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }

  if (week.length) {
    while (week.length < 7) week.push('')
    weeks.push(week)
  }

  return weeks
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
}
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
          <!-- Left Calendar Layout -->
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-4 pa-4">
              <v-row class="text-center">
                <v-col
                  v-for="day in ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']"
                  :key="day"
                >
                  <strong>{{ day }}</strong>
                </v-col>
              </v-row>

              <v-row v-for="(week, i) in calendar" :key="i" class="text-center">
                <v-col
                  v-for="(day, j) in week"
                  :key="i + '-' + j"
                  :class="[
                    'pa-4',
                    day ? `bg-${getColor(day)} text-white font-weight-bold` : 'bg-grey-lighten-2',
                  ]"
                >
                  {{ day }}
                </v-col>
              </v-row>

              <!-- Navigation -->
              <v-row align="center" justify="center" class="mt-4">
                <v-btn icon @click="prevMonth">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <span class="mx-4 font-weight-medium">{{ selectedMonth }}</span>
                <v-btn icon @click="nextMonth">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </v-sheet>
          </v-col>

          <!-- Right Buttons -->
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

<style scoped>
.bg-red {
  background-color: #e53935 !important;
}
.bg-green {
  background-color: #43a047 !important;
}
</style>
