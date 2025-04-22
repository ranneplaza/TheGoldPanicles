<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const selectedDate = ref(null)
const dialog = ref(false)
const myRequestDialog = ref(false)

const selectedMonth = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }),
)

const greenDays = ['1', '3', '4', '7', '25', '26', '27', '28', '29']
const redDays = ['5', '6', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22']

const getColor = (day) => {
  if (greenDays.includes(day.toString())) return 'bg-event-green'
  if (redDays.includes(day.toString())) return 'bg-event-red'
  return 'bg-default'
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

const requestStatus = ref('denied')
const denialReason = ref('Insufficient details provided in the form.')

const requestHistory = ref([
  { date: 'April 5, 2025', status: 'denied' },
  { date: 'April 7, 2025', status: 'approved' },
])
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
    <v-main class="calendar-background">
      <v-container fluid>
        <v-row no-gutters>
          <!-- Calendar -->
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-4 pa-2 calendar-sheet">
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
                    day ? getColor(day) : 'bg-grey-lighten-3',
                    day && getColor(day) === 'bg-event-green' ? 'cursor-pointer' : '',
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
            <v-btn
              block
              :color="
                requestStatus === 'approved' ? 'green' : requestStatus === 'denied' ? 'red' : 'grey'
              "
              variant="outlined"
              @click="myRequestDialog = true"
            >
              My Request
            </v-btn>
            <div v-if="requestStatus === 'denied'" class="mt-2 text-red">
              Reason: {{ denialReason }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Request Form Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">Request Form</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Date" :model-value="selectedDate?.toDateString()" readonly />
            <v-text-field label="Time" />
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

    <!-- My Request Status Dialog -->
    <v-dialog v-model="myRequestDialog" max-width="500px">
      <v-card>
        <v-card-title>Status History</v-card-title>
        <v-card-text>
          <v-simple-table class="grey lighten-3">
            <thead>
              <tr>
                <th>Sent request</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(entry, index) in requestHistory" :key="index">
                <td>{{ entry.date }}</td>
                <td>
                  <v-icon :color="entry.status === 'approved' ? 'green' : 'red'" small>
                    mdi-checkbox-blank-circle
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="myRequestDialog = false">Close</v-btn>
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
.calendar-sheet {
  min-height: 700px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.calendar-background {
  background: url('/public/img/favicon.png') center center no-repeat;
  background-size: 300px;
  background-color: #f4f4f400;
}

.bg-event-red {
  background-color: #ffcdd2 !important;
  color: #b71c1c !important;
}

.bg-event-green {
  background-color: #c8e6c9 !important;
  color: #1b5e20 !important;
}

.bg-default {
  background-color: #f9f9f9;
  color: #333;
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
  transition: background-color 0.3s ease;
  border-radius: 6px;
}

.calendar-day-number {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
