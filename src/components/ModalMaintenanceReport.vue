<template>
  <ion-header>
    <ion-toolbar>
      <div @click="cancel" slot="start" class="button-wrapper">
        <ion-button color="danger">
          <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
        </ion-button>
      </div>
      <ion-title>Maintenance Report</ion-title>
      <div @click="confirm" slot="end" class="button-wrapper">
        <ion-button color="success">
          <ion-icon slot="icon-only" :icon="checkmarkCircleOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-input
        label-placement="stacked"
        label="Location"
        v-model="location"
        :clear-input="true"
        placeholder="Enter text">
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-input
        v-model="typeOfMaintenance"
        label-placement="stacked"
        readonly="true"
        label="Type of maintenance"
        placeholder="Make selection">
      </ion-input>
      <ion-button id="tom-picker">Select</ion-button>
      <ion-picker trigger="tom-picker" :columns="tomPickerColumns" :buttons="tomPickerButtons"></ion-picker>
    </ion-item>
    <ion-item>
      <ion-label slot="start" class="ion-text-wrap">Urgent action required?</ion-label>
      <ion-radio-group v-model="urgentAction">
        <ion-radio justify="end" value="yes">Yes</ion-radio>
        <ion-radio justify="end" value="no">No</ion-radio>
      </ion-radio-group>
    </ion-item>
    <ion-item>
      <ion-input
        v-model="costEstimation"
        label-placement="stacked"
        readonly="true"
        label="Cost estimation"
        placeholder="Make selection">
      </ion-input>
      <ion-button id="ce-picker">Select</ion-button>
      <ion-picker trigger="ce-picker" :columns="cePickerColumns" :buttons="cePickerButtons"></ion-picker>
    </ion-item>
  </ion-content>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonRadioGroup, IonRadio, IonPicker, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  const props = defineProps(['report']);
  const location = ref(props.report.reports.maintenanceReport.location);
  const typeOfMaintenance = ref(props.report.reports.maintenanceReport.typeOfMaintenance);
  const urgentAction = ref(props.report.reports.maintenanceReport.urgentAction);
  const costEstimation = ref(props.report.reports.maintenanceReport.costEstimation);

  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = async () => {
    // Dispatch action to Vuex
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

  const tomPickerColumns = [
    {
      name: 'maintenanceTypes',
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

  const cePickerColumns = [
    {
      name: 'costEstimations',
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