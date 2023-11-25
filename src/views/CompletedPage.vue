<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <!-- Header and introductory text -->
      <h1>Completed Tasks</h1>
      <p>Here you'll find all your completed tasks.</p>
      <p>The main task of the report is be marked with:
        <span>
          <ion-badge id="example-badge" color="warning">
            <ion-icon :icon="createOutline" aria-hidden="true"></ion-icon>
          </ion-badge>
        </span>
      . When you are finished editing, make sure to save all changes.</p>
      
      <!-- Accordion group to display reports -->
      <ion-accordion-group ref="accordionGroup">
        <!-- Loop through closed reports and display each in an accordion -->
        <ion-accordion
          v-for="report of closedReports"
          :key="report.id">
          <!-- Header of the accordion item -->
          <ion-item slot="header">
            <ion-icon slot="start" :icon="homeOutline" aria-hidden="true"></ion-icon>
            <!-- Display report details -->
            <ion-label>
              <span>{{ report.name }}</span><br>
              <span style="font-size: xx-small;">{{ report.address }}</span><br>
              <span style="font-size: xx-small;">{{ report.postalCode }} {{ report.city }}</span>
            </ion-label>
          </ion-item>
          <!-- Content of the accordion item -->
          <div class="ion-padding" slot="content">
            <ion-list>
              <ion-item-group
                v-for="taskType in Object.keys(report.reports)"
                :key="taskType"
                :report-data="report"
                :task-type="taskType">
                <ion-item-divider>
                  <ion-label>{{ getLabel(taskType) }}</ion-label>
                </ion-item-divider>
                <ion-item
                  v-for="(reportInput, inputKey) in report.reports[taskType]"
                  :key="inputKey">
                  <ion-input
                    label-placement="stacked"
                    :label="getLabel(inputKey)"
                    v-model="report.reports[taskType][inputKey]"
                    disabled="true">
                  </ion-input>
                  
                </ion-item>
                  <!-- Buttons to open different modal forms -->
                  <report-button
                    :key="taskType"
                    :report-data="report"
                    :task-type="taskType" />
                
              </ion-item-group>
            </ion-list>
            <!-- Button to mark the report as completed -->
            <ion-button class="save" shape="round" @click="saveReport(report.id)" expand="block">
              <ion-icon slot="start" :icon="arrowDownCircleOutline"></ion-icon>
              <ion-label>Save all changes</ion-label>
            </ion-button>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonBadge, IonLabel, IonButton, IonList, IonItemGroup, IonItemDivider, IonInput } from '@ionic/vue';
  import { createOutline, homeOutline, arrowDownCircleOutline } from 'ionicons/icons';
  import { ref, computed } from 'vue';
  import ReportButton from '@/components/ReportButton.vue';
  import store from '@/store';

  // 
  const closedReports = computed(() => store.getters.closedReports);
  
  let accordionGroup = ref(null);

  // Function to mark a report as completed
  const saveReport = (reportId) => {
    store.dispatch('completeReport', reportId);
    accordionGroup.value.$el.value = undefined;
  };

  // Function to turn camelCase into an appropriate label name
  const getLabel = (input) => {
    // Split camelCase string into words
    const words = input.split(/(?=[A-Z])/);

    // Capitalize each word and join them with a space
    const result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return result;
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
  ion-accordion > ion-item,
  ion-button,
  ion-item-divider {
    --color: rgba(0, 170, 162);
  }
  ion-accordion > ion-item,
  ion-button {
    --background: var(--ion-color-light)
  }
  ion-item-divider {
    --background: var(--ion-color-dark-shade)
  }
  ion-button.save {
    --color: var(--ion-color-light);
    --background: var(--ion-color-success);
  }

</style>