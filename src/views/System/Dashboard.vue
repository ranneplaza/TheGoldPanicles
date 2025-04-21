<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const selectedDate = ref(null)
const dialog = ref(false)

const selectedMonth = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }),
)

const greenDays = ['1', '3', '4', '7', '25', '26', '27', '28', '29']
const redDays = ['5', '6', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22']

const getColor = (day) => {
  if (greenDays.includes(day.toString())) return 'green'
  if (redDays.includes(day.toString())) return 'red'
  return ''
}

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

const openRequestForm = (day) => {
  if (greenDays.includes(day.toString())) {
    selectedDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      day,
    )
    dialog.value = true
  }
}

const requestStatus = ref('denied') // can be: 'approved', 'denied', or 'pending'
const denialReason = ref('Insufficient details provided in the form.')
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar flat elevation="0">
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
          <!-- Calendar -->
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-4 pa-2" style="min-height: 700px">
              <v-row class="text-center font-weight-bold" no-gutters>
                <v-col
                  v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                  :key="day"
                  class="py-2"
                >
                  {{ day }}
                </v-col>
              </v-row>

              <v-row v-for="(week, i) in calendar" :key="i" class="text-center" no-gutters>
                <v-col
                  v-for="(day, j) in week"
                  :key="i + '-' + j"
                  class="calendar-cell"
                  :class="[
                    day ? `bg-${getColor(day)} text-white font-weight-bold` : 'bg-grey-lighten-2',
                    day && getColor(day) === 'green' ? 'cursor-pointer' : '',
                  ]"
                  @click="day && openRequestForm(day)"
                >
                  <div class="calendar-day-number">
                    {{ day }}
                  </div>
                </v-col>
              </v-row>

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

          <!-- Sidebar Buttons -->
          <v-col cols="3" class="pa-4">
            <!-- My Request Button -->
            <v-btn
              block
              :color="
                requestStatus === 'approved' ? 'green' : requestStatus === 'denied' ? 'red' : 'grey'
              "
              variant="outlined"
            >
              My Request
            </v-btn>

            <!-- Show reason if denied -->
            <div v-if="requestStatus === 'denied'" class="mt-2 text-red">
              Reason: {{ denialReason }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Dialog Form -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">Request Form</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Date" :model-value="selectedDate?.toDateString()" readonly />
            <v-text-field label="Title" />
            <v-textarea label="Description" />
            <v-text-field label="Location" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Footer -->
    <v-footer class="d-flex justify-center text-center" border app>
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

.cursor-pointer {
  cursor: pointer;
}

.calendar-cell {
  border: 1px solid #e0e0e0;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
  position: relative;
  background-color: white;
}

.calendar-day-number {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
