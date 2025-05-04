<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title>Edit Profile</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <RouterLink to="/">
          <v-list-item>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

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
      <v-btn icon @click="drawer = !drawer" class="bg-black rounded-circle">
        <v-icon color="#FFD700">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="calendar-background" style="min-height: 100vh; overflow: hidden">
      <v-container>
        <v-row no-gutters>
          <v-col cols="8">
            <v-sheet elevation="1" class="ma-4 pa-4 calendar-sheet">
              <v-row align="center" justify="center" class="mb-4">
                <v-icon class="cursor-pointer px-2 mt-6" @click="prevMonth"
                  >mdi-chevron-left</v-icon
                >
                <span class="mt-6 font-weight-medium">{{ selectedMonth }}</span>
                <v-icon class="cursor-pointer px-2 mt-6" @click="nextMonth"
                  >mdi-chevron-right</v-icon
                >
              </v-row>

              <v-row class="justify-center mb-2">
                <v-col class="d-flex align-center" cols="auto">
                  <div
                    style="
                      width: 16px;
                      height: 16px;
                      background-color: #d4edaf;
                      border-radius: 4px;
                      margin-right: 8px;
                    "
                  ></div>
                  <span class="text-caption">Available</span>
                </v-col>
                <v-col class="d-flex align-center" cols="auto">
                  <div
                    style="
                      width: 16px;
                      height: 16px;
                      background-color: #f8caca;
                      border-radius: 4px;
                      margin-right: 8px;
                    "
                  ></div>
                  <span class="text-caption">Unavailable</span>
                </v-col>
                <v-col class="d-flex align-center" cols="auto">
                  <div
                    style="
                      width: 16px;
                      height: 16px;
                      background-color: #ffffff;
                      border: 1px solid #ccc;
                      border-radius: 4px;
                      margin-right: 8px;
                    "
                  ></div>
                  <span class="text-caption">Holiday</span>
                </v-col>
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

              <v-row v-for="(week, i) in calendar" :key="i" class="text-center" no-gutters>
                <v-col
                  v-for="(day, j) in week"
                  :key="`${i}-${j}`"
                  class="calendar-cell"
                  :class="[
                    getColor(day),
                    day && getColor(day) === 'bg-event-green' ? 'cursor-pointer' : '',
                  ]"
                  @click="day && openRequestForm(day)"
                >
                  <div class="calendar-day-number">{{ day }}</div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>

          <v-col cols="4" class="pa-4">
            <v-card class="mb-4 pa-3 text-center gold-card translucent-card" outlined>
              <v-card-title class="text-subtitle-2 font-weight-bold"
                >Current Date & Time</v-card-title
              >
              <v-card-text class="text-body-2">
                {{ formattedDateTime }}
              </v-card-text>
            </v-card>

            <v-btn
              block
              class="black-btn"
              :color="
                requestStatus === 'approved' ? 'green' : requestStatus === 'denied' ? 'red' : 'grey'
              "
              variant="outlined"
              @click="myRequestDialog = !myRequestDialog"
            >
              My Request
            </v-btn>

            <v-card v-if="myRequestDialog" class="mt-4 gold-card translucent-card" outlined>
              <v-card-title class="text-subtitle-1 font-weight-medium"
                >Request History</v-card-title
              >
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="requestHistory"
                  class="elevation-1"
                  hide-default-footer
                >
                  <template #item.status="{ item }">
                    <v-tooltip bottom v-if="item.status === 'denied'">
                      <template #activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                          :style="{
                            color: item.status === 'approved' ? 'green' : 'red',
                            cursor: 'pointer',
                          }"
                        >
                          {{ item.status }}
                        </span>
                      </template>
                      <span>Reason: {{ item.reason }}</span>
                    </v-tooltip>
                    <span v-else :style="{ color: item.status === 'approved' ? 'green' : 'grey' }">
                      {{ item.status }}
                    </span>
                  </template>
                </v-data-table>
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
              <v-card-title class="text-subtitle-1 font-weight-bold">Staffers</v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item v-for="(staff, i) in availableStaffers" :key="'a-' + i" class="py-2">
                    <v-list-item-avatar size="48">
                      <v-img
                        :src="`/img/profiles/${staff.name.replace(/\s+/g, '_').toLowerCase()}.jpg`"
                        alt="profile"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">{{
                        staff.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-grey">{{
                        staff.position
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon color="green" size="12">mdi-circle</v-icon>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider class="my-2" />

                  <v-list-item
                    v-for="(staff, i) in unavailableStaffers"
                    :key="'u-' + i"
                    class="py-2"
                  >
                    <v-list-item-avatar size="48">
                      <v-img
                        :src="`/img/profiles/${staff.name.replace(/\s+/g, '_').toLowerCase()}.jpg`"
                        alt="profile"
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">{{
                        staff.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="text-caption text-grey">{{
                        staff.position
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon color="red" size="12">mdi-circle</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="rounded-lg bg-gold text-black">
        <v-card-title class="text-h6 text-center mt-2">Request Form</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Date" :model-value="selectedDate?.toDateString()" readonly />
            <v-text-field label="Time" v-model="time" />
            <v-text-field label="Title" v-model="title" />
            <v-textarea label="Description" v-model="description" />

            <v-select
              v-model="selectedPerson"
              :items="staffMembers"
              item-title="name"
              item-value="id"
              label="Contact Person"
              class="mt-4"
            />

            <v-text-field
              v-if="selectedPerson"
              label="Phone Number"
              v-model="contactPhone"
              class="mt-4"
            />

            <v-text-field
              v-if="selectedPerson"
              label="Gmail Address"
              v-model="contactGmail"
              class="mt-4"
            />

            <div class="d-flex align-center mt-4">
              <v-icon @click="triggerFileUpload" class="me-2 cursor-pointer" color="black"
                >mdi-paperclip</v-icon
              >
              <span
                @click="triggerFileUpload"
                class="cursor-pointer text-decoration-underline text-black"
                >Attach file</span
              >
              <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" />
            </div>
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

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const currentDate = ref(new Date())
const selectedDate = ref(null)
const dialog = ref(false)
const myRequestDialog = ref(false)
const showStaffers = ref(false)
const drawer = ref(false)
const fileInput = ref(null)
const requestStatus = ref('approved')

// Live time/date logic
const liveTime = ref(new Date())
const formattedDateTime = computed(() =>
  liveTime.value.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }),
)
let interval
onMounted(() => {
  interval = setInterval(() => (liveTime.value = new Date()), 1000)
})
onUnmounted(() => {
  clearInterval(interval)
})

const greenDays = ['1', '3', '4', '7', '25', '26', '27', '28', '29']
const redDays = ['5', '6', '8', '11', '12', '13', '14', '15', '18', '19', '20', '21', '22']
const whiteDays = ['10', '16', '23', '30']

const selectedMonth = computed(() =>
  currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }),
)

const getColor = (day) => {
  if (whiteDays.includes(day.toString())) return 'bg-event-white'
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

const triggerFileUpload = () => fileInput.value?.click()
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) console.log('File uploaded:', file.name)
}

const time = ref('')
const title = ref('')
const description = ref('')
const selectedPerson = ref(null)
const contactPhone = ref('')
const contactGmail = ref('')
const staffMembers = ref([
  {
    id: 1,
    name: 'Annie Batumbakal',
    phone: '',
    gmail: '',
  },
  {
    id: 2,
    name: 'Ruffamae Quinto',
    phone: '',
    gmail: '',
  },
  {
    id: 3,
    name: 'John Paulo Nase',
    phone: '',
    gmail: '',
  },
])

import { watch } from 'vue'

watch(selectedPerson, (newId) => {
  const selected = staffMembers.value.find((s) => s.id === newId)
  if (selected) {
    contactPhone.value = selected.phone
    contactGmail.value = selected.gmail
  } else {
    contactPhone.value = ''
    contactGmail.value = ''
  }
})

const headers = [
  { text: 'Event', value: 'event', align: 'start' },
  { text: 'Date Requested', value: 'date' },
  { text: 'Status', value: 'status' },
]

const requestHistory = ref([
  { event: 'Interview with Artist A', date: 'April 5, 2025', status: 'approved', reason: '' },
  {
    event: 'Coverage for Sportsfest',
    date: 'April 7, 2025',
    status: 'denied',
    reason: 'Overlapping schedule with another request',
  },
  { event: 'Photography for Exhibit B', date: 'April 9, 2025', status: 'approved', reason: '' },
])

const availableStaffers = ref([
  { name: 'Annie Batumbakal', position: 'Writer' },
  { name: 'Ruffamae Quinto', position: 'Photographer' },
  { name: 'John Paulo Nase', position: 'Editor' },
])

const unavailableStaffers = ref([
  { name: 'Stellvester Ajero', position: 'Videographer' },
  { name: 'Rico Blanco', position: 'Layout Artist' },
])
</script>

<style scoped>
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
.bg-event-white {
  background-color: #ffffff !important;
  color: #000000 !important;
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
