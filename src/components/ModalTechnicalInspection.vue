<template>
  <ion-header>
    <ion-toolbar>
      <div @click="cancel" slot="start" class="button-wrapper">
        <ion-button color="danger">
          <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
        </ion-button>
      </div>
      <ion-title>Technical Inspection</ion-title>
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
        v-model="typeOfInstallation"
        label-placement="stacked"
        readonly="true"
        label="Type of installation"
        placeholder="Make selection">
      </ion-input>
      <ion-button id="toi-picker">Select</ion-button>
      <ion-picker trigger="toi-picker" :columns="toiPickerColumns" :buttons="toiPickerButtons"></ion-picker>
    </ion-item>
    <ion-item>
      <ion-input
        label-placement="stacked"
        label="Reported malfunctions"
        v-model="reportedMalfunctions"
        :clear-input="true"
        placeholder="Enter text">
      </ion-input>
    </ion-item>
    <ion-item>
      <router-link to="/library" @click="confirm" class="router-link">
        <ion-button class="router-link-button">
          <ion-icon slot="start" :icon="documentTextOutline"></ion-icon>
          <ion-label>Testprocedure</ion-label>
        </ion-button>
      </router-link>
    </ion-item>
    <ion-item>
      <ion-label slot="start" class="ion-text-wrap">Approved?</ion-label>
      <ion-radio-group v-model="approved">
        <ion-radio justify="end" value="yes">Yes</ion-radio>
        <ion-radio justify="end" value="no">No</ion-radio>
      </ion-radio-group>
    </ion-item>
    <ion-item>
      <ion-textarea
        v-model="comments"
        label-placement="stacked"
        label="Comments"
        :auto-grow="true"
        rows="8"
        placeholder="Enter text">
      </ion-textarea>
    </ion-item>
  </ion-content>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonRadioGroup, IonRadio, IonPicker, IonTextarea, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline, documentTextOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  const props = defineProps(['report']);
  const location = ref(props.report.reports.technicalInspection.location);
  const typeOfInstallation = ref(props.report.reports.technicalInspection.typeOfInstallation);
  const reportedMalfunctions = ref(props.report.reports.technicalInspection.reportedMalfunctions);
  const approved = ref(props.report.reports.technicalInspection.approved);
  const comments = ref(props.report.reports.technicalInspection.comments);

  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = async () => {
    // Dispatch action to Vuex
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