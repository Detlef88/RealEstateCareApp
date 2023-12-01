<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true" aria-label="Open Tasks Page">
      <!-- Header and introductory text -->
      <h1 aria-label="Open Tasks Page Heading">Scheduled Tasks</h1>
      <p aria-label="Open Tasks Page Description">Here you'll find all your scheduled tasks.</p>
      <p aria-label="Open Tasks Page Note">The main task of the report will be marked with:
        <span>
          <ion-badge id="example-badge" color="warning" aria-label="Example Badge">
            <ion-icon :icon="createOutline" aria-hidden="true"></ion-icon>
          </ion-badge>
        </span>
      .</p>

      <!-- Accordion group to display reports -->
      <ion-accordion-group aria-label="Accordion Group of Open Reports">
        <!-- Loop through open reports and display each in an accordion -->
        <ion-accordion
          v-for="report of openReports"
          :key="report.id"
          aria-label="Report Accordion">
          <!-- Header of the accordion item -->
          <ion-item slot="header" aria-label="Report Header">
            <ion-icon slot="start" :icon="homeOutline" aria-hidden="true"></ion-icon>
            <!-- Display report details -->
            <ion-label aria-label="Report Details">
              <span>{{ report.name }}</span><br>
              <span style="font-size: xx-small;">{{ report.address }}</span><br>
              <span style="font-size: xx-small;">{{ report.postalCode }} {{ report.city }}</span>
            </ion-label>
          </ion-item>

          <!-- Content of the accordion item -->
          <div class="ion-padding" slot="content" aria-label="Report Content">
            <!-- Buttons to open different modal forms -->
            <report-button
              v-for="taskType in Object.keys(report.reports)"
              :key="taskType"
              :report-data="report"
              :task-type="taskType" />

            <!-- Button to mark the report as completed -->
            <ion-button class="completed" shape="round" @click="completeReport(report.id)" expand="block" aria-label="Complete Report Button">
              <ion-icon slot="start" :icon="checkmarkCircleOutline" aria-hidden="true"></ion-icon>
              <ion-label>Mark as completed</ion-label>
            </ion-button>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonBadge, IonLabel, IonButton } from '@ionic/vue';
  import { homeOutline, checkmarkCircleOutline, createOutline } from 'ionicons/icons';
  import ReportButton from '@/components/ReportButton.vue';
  import { computed } from 'vue';
  import store from '@/store';

  // 
  const openReports = computed(() => store.getters.openReports);

  // Function to mark a report as completed
  const completeReport = (reportId) => {
    store.dispatch('completeReport', reportId);
  };
</script>

<style scoped>
  .ion-page {
    align-items: center;
  }
  ion-content {
    max-inline-size: 840px;
  }
    p + p {
    font-size: small;
  }
  #example-badge {
    inline-size: 16px;
    block-size: 16px;
    --padding-top: 2px;
    --padding-end: 3px;
    --padding-bottom: 3px;
    --padding-start: 3px;
  }
  #example-badge ion-icon {
    inline-size: 10px;
    block-size: 10px;
  }
  ion-item,
  ion-button {
    --color: rgba(0, 170, 162);
  }
  ion-button {
    --background: var(--ion-color-light)
  }
  ion-button.completed {
    --color: var(--ion-color-light);
    --background: var(--ion-color-success);
  }

</style>
