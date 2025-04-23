<template>
  <router-view />
  <v-app>
    <v-app-bar flat color="white" class="border-bottom px-4">
      <v-row align="center" class="w-100">
        <v-col cols="auto">
          <v-img
            src="/img/tgp_logo.jpg"
            alt="TGP Logo"
            height="40"
            width="40"
            cover
            rounded="circle"
            class="cursor-pointer"
            @click="scrollToTop"
          />
        </v-col>
        <v-col class="d-flex align-center">
          <div class="font-weight-bold text-h6">TheGoldPanicles</div>
          <div class="ml-2 text-caption text-grey-darken-1">
            The Official Student Publication of Caraga State University - Main Campus
          </div>
        </v-col>
        <v-spacer />
        <v-btn variant="text" class="text-black font-weight-bold" @click="scrollToTop">HOME</v-btn>
        <v-btn variant="text" class="text-black font-weight-bold" @click="scrollToAbout"
          >ABOUT</v-btn
        >
        <v-btn variant="text" class="text-black font-weight-bold" @click="scrollToCoverage"
          >COVERAGE</v-btn
        >
        <v-btn variant="text" class="text-black font-weight-bold" @click="scrollToTeam">TEAM</v-btn>
        <RouterLink to="/login">
          <v-btn color="grey-darken-2" class="ml-2 text-white">Get Started</v-btn>
        </RouterLink>
      </v-row>
    </v-app-bar>

    <v-main class="d-flex flex-column" style="min-height: 100vh">
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12" class="text-center text-caption font-italic yellow-bar">
            “We never flinched in serving you the truth”
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <!-- Latest Section -->
          <v-col cols="8">
            <v-card class="pa-4" style="height: 500px; background-color: #fff">
              <h3 class="text-black font-weight-bold mb-3">LATEST</h3>
              <v-sheet height="100%" outlined class="d-flex align-center justify-center">
                <v-img src="/img/logo_icon.png" contain width="60" />
              </v-sheet>
            </v-card>
          </v-col>

          <!-- Side Cards -->
          <v-col cols="4">
            <v-card
              class="pa-4 mb-4 text-white text-h6 font-weight-bold"
              style="background-color: #2b2b2b"
            >
              Request for <br />coverage
              <v-icon size="30" class="mt-3">mdi-arrow-right</v-icon>
            </v-card>

            <v-row>
              <v-col cols="6">
                <v-sheet class="bg-grey-darken-3" height="150px" />
              </v-col>
              <v-col cols="6">
                <v-sheet class="bg-grey-darken-3" height="150px" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <!-- ABOUT US SECTION -->
      <v-container
        ref="aboutSection"
        fluid
        class="pa-0 mt-10"
        style="background-color: #f5f5f5; min-height: 100vh; position: relative"
      >
        <v-row class="fill-height d-flex align-center justify-center">
          <!-- IMAGE FRAME SECTION -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-sheet
              elevation="2"
              rounded="lg"
              class="pa-2"
              style="
                width: 100%;
                max-width: 300px;
                height: 400px;
                background-color: white;
                border: 2px dashed #ccc;
              "
            >
              <v-img
                src="/img/sample_about_photo.jpg"
                alt="About Image"
                height="100%"
                cover
                class="rounded-lg"
              />
            </v-sheet>
          </v-col>

          <!-- TEXT SECTION -->
          <v-col cols="12" md="6" offset-md="1" class="pa-10">
            <h2 class="font-weight-bold mb-6">About us</h2>
            <v-sheet
              elevation="0"
              rounded="lg"
              class="pa-6"
              style="background-color: #ffffff; max-width: 500px; margin: auto"
            >
              <div class="text-body-1 text-justify">
                The Gold Panicles is the Official Student Publication of Caraga State University
                (CSU) - Main Campus. Its founding, movement, and goals are protected by RA 7079, or
                the Campus Journalism Act of 1991. The office serves as the equalizing press of the
                campus, ensuring a just checks-and-balance system in student governance, activities,
                and beyond. It is independent by function and administration from other student
                organizations. It does not actively promote political, religious parties, and other
                ideologies.
                <br /><br />
                The official domicile of the office is within the premises of CSU - Main Campus,
                Butuan City. The office serves as the official student publication of CSU, anchored
                on the principles of the freedom of the press. The office is by the students, for
                the students, and through the students.
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- COVERAGE SECTION -->
      <v-container
        ref="coverageSection"
        fluid
        class="pa-0 mt-10"
        style="background-color: #f5f5f5; min-height: 100vh; position: relative"
      >
        <!-- Top-left logo -->
        <v-img
          src="/img/logo_icon.png"
          alt="TGP Logo"
          max-width="60"
          class="position-absolute"
          style="top: 20px; left: 20px"
        />

        <!-- Bottom-left rice graphic -->
        <v-img
          src="/img/rice_icon.png"
          alt="Rice Icon"
          max-width="100"
          class="position-absolute"
          style="bottom: 20px; left: 20px"
        />

        <v-row class="fill-height d-flex align-center justify-center text-center">
          <v-col cols="12" md="8">
            <h2 class="font-weight-bold mb-6">What <span style="color: #fbbc05">WE</span> do</h2>

            <v-sheet elevation="0" rounded="lg" class="pa-8" style="background-color: white">
              <div class="text-body-1 text-justify" style="line-height: 1.6">
                The Gold Panicles reserves all rights in the textual, graphical, and other contents
                appearing in this magazine. Redistribution is prohibited without expressed written
                permission from the Editorial Board. In compiling, and presenting the contents of
                this magazine, the GP has used its best endeavors to ensure that the information is
                correct and current at the time of publication but assumes no responsibility for any
                error or defect herein.
                <br /><br />
                The issue may inadvertently contain technical inaccuracies or typographical errors.
                Further, references to any specific commercial products, process, or services by
                trade name, trademark, and manufacturer or otherwise do not necessarily constitute
                or imply endorsement or recommendation. The views and opinions of authors expressed
                herein should not be used for advertising or product endorsement purposes.
                <br /><br />
                The designs employed in this publication and the presentation of material thereto do
                not imply the expression of any opinion whatsoever on the part of the GP concerning
                the legal status of any institution, area or territory, or of its authorities, or
                concerning the delimitation of its frontiers.
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- TEAM SECTION -->
      <v-container
        ref="teamSection"
        fluid
        class="pa-0 mt-10"
        style="background-color: #fff; min-height: 100vh; position: relative"
      >
        <!-- Top Title -->
        <v-row justify="center" class="pt-10">
          <v-col cols="12" class="text-center">
            <h3 class="font-weight-bold">THE GOLD PANICLES</h3>
            <div>Executives and Editorial Board</div>
          </v-col>
        </v-row>

        <!-- Org Chart -->
        <div class="org-chart">
          <div class="level">
            <div class="org-node"></div>
          </div>

          <div class="level">
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
          </div>

          <div class="level">
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
            <div class="org-node"></div>
          </div>
        </div>
      </v-container>
    </v-main>

    <!-- Fixed Footer -->
    <v-footer
      color="#ffd700"
      padless
      absolute
      class="text-center py-1"
      style="width: 100%; bottom: 0; position: fixed"
    >
      <v-col>© 2025 TGP | All Rights Reserved</v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const aboutSection = ref(null)
const coverageSection = ref(null)
const teamSection = ref(null)

function scrollToAbout() {
  if (aboutSection.value?.$el) {
    aboutSection.value.$el.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToCoverage() {
  if (coverageSection.value?.$el) {
    coverageSection.value.$el.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTeam() {
  if (teamSection.value?.$el) {
    teamSection.value.$el.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.yellow-bar {
  background-color: #ffd700;
  padding: 6px 0;
  border-radius: 4px;
}

.cursor-pointer {
  cursor: pointer;
}

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
}

.level {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.org-node {
  width: 60px;
  height: 60px;
  background-color: #ffe08a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/img/person_icon.png');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
