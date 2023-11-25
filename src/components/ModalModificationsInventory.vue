<template>
  <ion-header>
    <ion-toolbar>
      <div @click="cancel" slot="start" class="button-wrapper">
        <ion-button color="danger">
          <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
        </ion-button>
      </div>
      <ion-title>Modifications Inventory</ion-title>
      <div @click="confirm" slot="end" class="button-wrapper">
        <ion-button color="success">
          <ion-icon slot="icon-only" :icon="checkmarkCircleOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <router-link to="/library" @click="confirm" class="router-link">
        <ion-button class="router-link-button">
          <ion-icon slot="start" :icon="documentTextOutline"></ion-icon>
          <ion-label>Existing modifications</ion-label>
        </ion-button>
      </router-link>
    </ion-item>
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
        v-model="executedBy"
        label-placement="stacked"
        readonly="true"
        label="Executed by"
        placeholder="Make selection">
      </ion-input>
      <ion-button id="eb-picker">Select</ion-button>
      <ion-picker trigger="eb-picker" :columns="ebPickerColumns" :buttons="ebPickerButtons"></ion-picker>
    </ion-item>
    <ion-item>
      <ion-textarea
        v-model="description"
        label-placement="stacked"
        label="Description"
        :auto-grow="true"
        rows="8"
        placeholder="Enter text">
      </ion-textarea>
    </ion-item>
    <ion-item>
      <ion-input
        v-model="requiredAction"
        label-placement="stacked"
        readonly="true"
        label="Required action"
        placeholder="Make selection">
      </ion-input>
      <ion-button id="ra-picker">Select</ion-button>
      <ion-picker trigger="ra-picker" :columns="raPickerColumns" :buttons="raPickerButtons"></ion-picker>
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
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonPicker, IonTextarea, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline, documentTextOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  const props = defineProps(['report']);
  const location = ref(props.report.reports.modificationsInventory.location);
  const executedBy = ref(props.report.reports.modificationsInventory.executedBy);
  const description = ref(props.report.reports.modificationsInventory.description);
  const requiredAction = ref(props.report.reports.modificationsInventory.requiredAction);
  const comments = ref(props.report.reports.modificationsInventory.comments);


  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = async () => {
    // Dispatch action to Vuex
    await store.dispatch('updateReport', {
      id: props.report.id,
      modalType: 'modificationsInventory',
      reports: {
        modificationsInventory: {
          location: location.value,
          executedBy: executedBy.value,
          description: description.value,
          requiredAction: requiredAction.value,
          comments: comments.value
        }
      }
    });

    // Dismiss the modal on successful update
    modalController.dismiss(null, 'confirm');
  };

  const ebPickerColumns = [
    {
      name: 'executionTypes',
      options: [
        {
          text: 'Tenant',
          value: 'Tenant',
        },
        {
          text: 'Contractor',
          value: 'Contractor',
        },
        {
          text: 'Unknown',
          value: 'Unknown',
        }
      ],
    },
  ];

  const ebPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        executedBy.value = value.executionTypes.value;
      },
    },
  ];

  const raPickerColumns = [
    {
      name: 'actionTypes',
      options: [
        {
          text: 'Accept',
          value: 'Accept',
        },
        {
          text: 'Inspection',
          value: 'Inspection',
        },
        {
          text: 'Removal',
          value: 'Removal',
        },
        {
          text: 'Adjust and approve',
          value: 'Adjust and approve',
        }
      ],
    },
  ];

  const raPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        requiredAction.value = value.actionTypes.value;
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
</style>