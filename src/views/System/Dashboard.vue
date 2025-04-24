<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const selectedDate = ref(null)
const dialog = ref(false)
const myRequestDialog = ref(false)
const showStaffers = ref(false)

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
const requestHistory = ref([
  { date: 'April 5, 2025', status: 'denied' },
  { date: 'April 7, 2025', status: 'approved' },
])

const availableStaffers = ref(['Annie Batumbakal', 'Ruffamae Quinto', 'John Paulo Nase'])
const unavailableStaffers = ref(['Stellvester Ajero', 'Rico Blanco'])
</script>

<template>
  <v-app>
    <v-app-bar flat elevation="0" class="bg-gold text-black">
      <v-toolbar-title class="text-black d-flex align-center">
        <v-img
          src="/img/tgp_logo.jpg"
          alt="Logo"
          height="40"
          width="40"
          class="mr-2 rounded-circle"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-avatar color="gold" size="32" class="mr-4">
        <span class="text-black font-weight-bold">CL</span>
      </v-avatar>
    </v-app-bar>

    <v-main class="calendar-background" style="min-height: 100vh; overflow: hidden;">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="9">
            <v-sheet elevation="1" class="ma-2 pa-2 calendar-sheet">
              <v-row align="center" justify="center" class="mb-4">
                <v-icon class="cursor-pointer px-2" @click="prevMonth">mdi-chevron-left</v-icon>
                <span class="mx-4 font-weight-medium">{{ selectedMonth }}</span>
                <v-icon class="cursor-pointer px-2" @click="nextMonth">mdi-chevron-right</v-icon>
              </v-row>

              <v-row class="text-center font-weight-bold" no-gutters>
                <v-col
                  v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                  :key="day"
                  class="py-2"
                >
                  {{ day }}
                </v-col>
              </v-row>

              <v-row
                v-for="(week, i) in calendar"
                :key="i"
                class="text-center"
                no-gutters
              >
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
                  <div class="calendar-day-number">{{ day }}</div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="3" class="pa-4">
            <v-btn
              block
              class="black-btn"
              :color="requestStatus === 'approved' ? 'green' : requestStatus === 'denied' ? 'red' : 'grey'"
              variant="outlined"
              @click="myRequestDialog = !myRequestDialog"
            >
              My Request
            </v-btn>

            <v-card v-if="myRequestDialog" class="mt-4 gold-card translucent-card" outlined>
              <v-card-title class="text-subtitle-1 font-weight-medium">Request History</v-card-title>
              <v-card-text>
                <ul class="pl-4">
                  <li
                    v-for="(entry, index) in requestHistory"
                    :key="index"
                  >
                    {{ entry.date }} -
                    <span :style="{ color: entry.status === 'approved' ? 'green' : 'red' }">
                      {{ entry.status }}
                    </span>
                  </li>
                </ul>
              </v-card-text>
            </v-card>

            <v-btn
              block
              class="black-btn mt-4"
              color="indigo"
              variant="outlined"
              @click="showStaffers = !showStaffers"
            >
              Staffers
            </v-btn>

            <v-card v-if="showStaffers" class="mt-2 gold-card translucent-card" outlined>
              <v-card-title class="text-subtitle-1 text-success">Available</v-card-title>
              <v-card-text>
                <ul class="pl-4">
                  <li
                    v-for="(staff, i) in availableStaffers"
                    :key="`a-${i}`"
                    class="d-flex align-center justify-between mb-2"
                  >
                    <div class="d-flex align-center">
                      <v-avatar size="24" class="mr-2">
                        <v-img :src="`/img/profiles/${staff.replace(/\s+/g, '_').toLowerCase()}.jpg`" alt="profile" />
                      </v-avatar>
                      {{ staff }}
                    </div>
                    <span
                      class="ml-2"
                      style="width: 10px; height: 10px; background-color: green; border-radius: 50%; display: inline-block;"
                    ></span>
                  </li>
                </ul>
              </v-card-text>

              <v-divider />

              <v-card-title class="text-subtitle-1 text-error">Unavailable</v-card-title>
              <v-card-text>
                <ul class="pl-4">
                  <li
                    v-for="(staff, i) in unavailableStaffers"
                    :key="`u-${i}`"
                    class="d-flex align-center justify-between mb-2"
                  >
                    <div class="d-flex align-center">
                      <v-avatar size="24" class="mr-2">
                        <v-img :src="`/img/profiles/${staff.replace(/\s+/g, '_').toLowerCase()}.jpg`" alt="profile" />
                      </v-avatar>
                      {{ staff }}
                    </div>
                    <span
                      class="ml-2"
                      style="width: 10px; height: 10px; background-color: red; border-radius: 50%; display: inline-block;"
                    ></span>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="bg-gold text-black">
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

    <v-footer class="d-flex justify-center text-center bg-gold text-black" border app>
      © {{ new Date().getFullYear() }} - TGP | All Rights Reserved
    </v-footer>
  </v-app>
</template>

<style scoped>
.calendar-background {
  background-image: url('/public/img/favicon.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 300px;
  color: #000000;
}

.calendar-sheet {
  background-color: #fff3b0;
  color: #000;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.bg-event-green {
  background-color: #d4edaf !important;
  color: #0b3f00 !important;
}

.bg-event-red {
  background-color: #f8caca !important;
  color: #5c0000 !important;
}

.bg-default {
  background-color: #fffbe6;
  color: #000;
}

.cursor-pointer {
  cursor: pointer;
}

.calendar-cell {
  border: 1px solid #000;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
  position: relative;
  transition: background-color 0.3s ease;
  border-radius: 6px;
  background-color: #fff3b0;
  color: #000;
}

.calendar-day-number {
  font-size: 1.1rem;
  font-weight: 600;
}

.black-btn {
  background-color: #000 !important;
  color: #ffd700 !important;
  border: 1px solid #ffd700 !important;
}

.black-btn:hover {
  background-color: #ffd700 !important;
  color: #000 !important;
}

.gold-card {
  background-color: #fff3b0 !important;
  color: #000 !important;
}

</style>


