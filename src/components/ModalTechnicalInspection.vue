<template>
  <!-- Header with cancel and confirm buttons -->
  <ion-header
    aria-label="Page Header">
    <ion-toolbar>
      <!-- Cancel button -->
      <div
        @click="cancel"
        slot="start"
        class="button-wrapper"
        aria-label="Cancel Button">
        <ion-button
          color="danger">
          <ion-icon
            slot="icon-only"
            :icon="closeCircleOutline"
            aria-hidden="true">
          </ion-icon>
        </ion-button>
      </div>
      <ion-title
        aria-label="Technical Inspection Title">
        Technical Inspection
      </ion-title>
      <!-- Confirm button -->
      <div
        @click="confirm"
        slot="end"
        class="button-wrapper"
        aria-label="Confirm Button">
        <ion-button
          color="success">
          <ion-icon
            slot="icon-only"
            :icon="checkmarkCircleOutline"
            aria-hidden="true">
          </ion-icon>
        </ion-button>
      </div>
    </ion-toolbar>
  </ion-header>

  <ion-content
    class="ion-padding">
    <!-- Input for location -->
    <ion-item>
      <ion-input
        label-placement="stacked"
        label="Location"
        v-model="location"
        :clear-input="true"
        placeholder="Enter text"
        aria-label="Location Input">
      </ion-input>
    </ion-item>
    <ion-item>
      <!-- Input for Type of Installation -->
      <ion-input
        v-model="typeOfInstallation"
        label-placement="stacked"
        readonly="true"
        label="Type of installation"
        placeholder="Make selection"
        aria-label="Type of Installation Input">
      </ion-input>
      <ion-button
        id="toi-picker"
        aria-label="Type of Installation Picker">
        Select
      </ion-button>
      <ion-picker
        trigger="toi-picker"
        :columns="toiPickerColumns"
        :buttons="toiPickerButtons"
        aria-label="Type of Installation Picker Modal">
      </ion-picker>
    </ion-item>
    <ion-item>
      <!-- Input for Reported Malfunctions -->
      <ion-input
        v-model="reportedMalfunctions"
        label-placement="stacked"
        label="Reported malfunctions"
        :clear-input="true"
        placeholder="Enter text"
        aria-label="Reported Malfunctions Textarea">
      </ion-input>
    </ion-item>
    <ion-item>
      <!-- Router link to Test Procedure -->
      <router-link
        to="/library"
        @click="confirm"
        class="router-link">
        <ion-button
          class="router-link-button">
          <ion-icon
            slot="start"
            :icon="documentTextOutline"
            aria-hidden="true">
          </ion-icon>
          <ion-label>
            Testprocedure
          </ion-label>
        </ion-button>
      </router-link>
    </ion-item>
    <ion-item>
      <!-- Input for Approved -->
      <ion-label
        slot="start"
        class="ion-text-wrap"
        aria-label="Approved Label">
        Approved?
      </ion-label>
      <ion-radio-group
        v-model="approved"
        aria-label="Approved Radio Group">
        <ion-radio
          justify="end"
          value="yes"
          aria-label="Yes Option">
          Yes
        </ion-radio>
        <ion-radio
          justify="end"
          value="no"
          aria-label="No Option">
          No
        </ion-radio>
      </ion-radio-group>
    </ion-item>
    <ion-item>
      <!-- Input for comments -->
      <ion-textarea
        v-model="comments"
        label-placement="stacked"
        label="Comments"
        :auto-grow="true"
        rows="8"
        placeholder="Enter text"
        aria-label="Comments Input">
      </ion-textarea>
    </ion-item>
  </ion-content>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonRadioGroup, IonRadio, IonPicker, IonTextarea, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline, documentTextOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  // Props from parent component
  const props = defineProps(['report']);

  // References to form field values
  const location = ref(props.report.reports.technicalInspection.location);
  const typeOfInstallation = ref(props.report.reports.technicalInspection.typeOfInstallation);
  const reportedMalfunctions = ref(props.report.reports.technicalInspection.reportedMalfunctions);
  const approved = ref(props.report.reports.technicalInspection.approved);
  const comments = ref(props.report.reports.technicalInspection.comments);

  // Cancel function to dismiss the modal
  const cancel = () => modalController.dismiss(null, 'cancel');
  
  // Confirm function to update the report and dismiss the modal
  const confirm = async () => {
    await store.dispatch('updateReport', {
      id: props.report.id,
      modalType: 'technicalInspection',
      reports: {
        technicalInspection: {
          location: location.value,
          typeOfInstallation: typeOfInstallation.value,
          reportedMalfunctions: reportedMalfunctions.value,
          approved: approved.value,
          comments: comments.value,
        }
      }
    });

    // Dismiss the modal on successful update
    modalController.dismiss(null, 'confirm');
  };

  // Configuration for the picker component (Type of Installation selection)
  const toiPickerColumns = [
    {
      name: 'installationTypes',
      options: [
        {
          text: 'Cooling',
          value: 'Cooling',
        },
        {
          text: 'Heating',
          value: 'Heating',
        },
        {
          text: 'Air ventilation',
          value: 'Air ventilation',
        },
        {
          text: 'Electricity',
          value: 'Electricity',
        },
        {
          text: 'Security',
          value: 'Security',
        }
      ],
    },
  ];

  // Buttons for picker modal (Type of Installation selection)
  const toiPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        typeOfInstallation.value = value.installationTypes.value;
      },
    },
  ];
</script>

<style scoped>
  ion-title {
    text-align: center;
  }
  .router-link {
    width: 100%;
  }
  ion-button.router-link-button {
    width: 100%;
    margin: auto;
  }
  ion-radio-group {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
  }
</style>