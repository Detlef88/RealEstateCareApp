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
        aria-label="Maintenance Report Title">
        Maintenance Report
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
    <ion-item>
      <!-- Input for location -->
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
      <!-- Input for Type of Maintenance -->
      <ion-input
        v-model="typeOfMaintenance"
        label-placement="stacked"
        readonly="true"
        label="Type of maintenance"
        placeholder="Make selection"
        aria-label="Type of Maintenance Input">
      </ion-input>
      <ion-button
        id="tom-picker">
        Select
      </ion-button>
      <ion-picker
        trigger="tom-picker"
        :columns="tomPickerColumns"
        :buttons="tomPickerButtons"
        aria-label="Type of Maintenance Picker Modal">
      </ion-picker>
    </ion-item>
    <ion-item>
      <!-- Input for Urgent Action -->
      <ion-label
        slot="start"
        class="ion-text-wrap"
        aria-label="Urgent Action Label">
        Urgent action required?
      </ion-label>
      <ion-radio-group
        v-model="urgentAction"
        aria-label="Urgent Action Radio Group">
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
      <!-- Input for Cost Estimation -->
      <ion-input
        v-model="costEstimation"
        label-placement="stacked"
        readonly="true"
        label="Cost estimation"
        placeholder="Make selection"
        aria-label="Cost Estimation Input">
      </ion-input>
      <ion-button
        id="ce-picker"
        aria-label="Cost Estimation Picker">
        Select
      </ion-button>
      <ion-picker
        trigger="ce-picker"
        :columns="cePickerColumns"
        :buttons="cePickerButtons"
        aria-label="Cost Estimation Picker Modal">
      </ion-picker>
    </ion-item>
  </ion-content>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonRadioGroup, IonRadio, IonPicker, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  // Props from parent component
  const props = defineProps(['report']);

  // References to form field values
  const location = ref(props.report.reports.maintenanceReport.location);
  const typeOfMaintenance = ref(props.report.reports.maintenanceReport.typeOfMaintenance);
  const urgentAction = ref(props.report.reports.maintenanceReport.urgentAction);
  const costEstimation = ref(props.report.reports.maintenanceReport.costEstimation);

  // Cancel function to dismiss the modal
  const cancel = () => modalController.dismiss(null, 'cancel');
  
  // Confirm function to update the report and dismiss the modal
  const confirm = async () => {
    await store.dispatch('updateReport', {
      id: props.report.id,
      modalType: 'maintenanceReport',
      reports: {
        maintenanceReport: {
          location: location.value,
          typeOfMaintenance: typeOfMaintenance.value,
          urgentAction: urgentAction.value,
          costEstimation: costEstimation.value
        }
      }
    });

    // Dismiss the modal on successful update
    modalController.dismiss(null, 'confirm');
  };

  // Configuration for the picker component (Type of Maintenance selection)
  const tomPickerColumns = [
    {
      name: 'maintenanceTypes',
      // Columns with options
      options: [
        {
          text: 'Painting',
          value: 'Painting',
        },
        {
          text: 'Wood rot',
          value: 'Wood rot',
        },
        {
          text: 'Electricity',
          value: 'Electricity',
        },
        {
          text: 'Piping',
          value: 'Piping',
        },
        {
          text: 'Glazing',
          value: 'Glazing',
        }
      ],
    },
  ];

  // Buttons for picker modal (Type of Maintenance selection)
  const tomPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        typeOfMaintenance.value = value.maintenanceTypes.value;
      },
    },
  ];

  // Configuration for the picker component (Cost Estimation selection)
  const cePickerColumns = [
    {
      name: 'costEstimations',
      // Columns with options
      options: [
        {
          text: '0-500',
          value: '0-500',
        },
        {
          text: '500-1500',
          value: '500-1500',
        },
        {
          text: '1500+',
          value: '1500+',
        }
      ],
    },
  ];

  // Buttons for picker modal (Cost Estimation selection)
  const cePickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        costEstimation.value = value.costEstimations.value;
      },
    },
  ];
</script>

<style scoped>
  ion-title {
    text-align: center;
  }
  ion-radio-group {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
  }
</style>