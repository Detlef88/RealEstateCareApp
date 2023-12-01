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
        aria-label="Modifications Inventory Title">
        Modifications Inventory
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
    <ion-item
      aria-label="Existing Modifications Link">
      <!-- Router link to Existing Modifications -->
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
            Existing modifications
          </ion-label>
        </ion-button>
      </router-link>
    </ion-item>
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
      <!-- Input for Executed By -->
      <ion-input
        v-model="executedBy"
        label-placement="stacked"
        readonly="true"
        label="Executed by"
        placeholder="Make selection"
        aria-label="Executed By Input">
      </ion-input>
      <ion-button
        id="eb-picker"
        aria-label="Executed By Picker">
        Select
      </ion-button>
      <ion-picker
        trigger="eb-picker"
        :columns="ebPickerColumns"
        :buttons="ebPickerButtons"
        aria-label="Executed By Picker Modal">
      </ion-picker>
    </ion-item>
    <ion-item>
      <!-- Input for description -->
      <ion-textarea
        v-model="description"
        label-placement="stacked"
        label="Description"
        :auto-grow="true"
        rows="8"
        placeholder="Enter text"
        aria-label="Description Input">
      </ion-textarea>
    </ion-item>
    <ion-item>
      <!-- Input for Required Action -->
      <ion-input
        v-model="requiredAction"
        label-placement="stacked"
        readonly="true"
        label="Required action"
        placeholder="Make selection"
        aria-label="Required Action Input">
      </ion-input>
      <ion-button
        id="ra-picker"
        aria-label="Required Action Picker">
        Select
      </ion-button>
      <ion-picker
        trigger="ra-picker"
        :columns="raPickerColumns"
        :buttons="raPickerButtons"
        aria-label="Required Action Picker Modal">
      </ion-picker>
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
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonPicker, IonTextarea, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline, documentTextOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  // Props from parent component
  const props = defineProps(['report']);

  // References to form field values
  const location = ref(props.report.reports.modificationsInventory.location);
  const executedBy = ref(props.report.reports.modificationsInventory.executedBy);
  const description = ref(props.report.reports.modificationsInventory.description);
  const requiredAction = ref(props.report.reports.modificationsInventory.requiredAction);
  const comments = ref(props.report.reports.modificationsInventory.comments);

  // Cancel function to dismiss the modal
  const cancel = () => modalController.dismiss(null, 'cancel');

  // Confirm function to update the report and dismiss the modal
  const confirm = async () => {
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

  // Configuration for the picker component (Executed By selection)
  const ebPickerColumns = [
    {
      name: 'executionTypes',
      // Columns with options
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

  // Buttons for picker modal (Executed By selection)
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

  // Configuration for the picker component (Required Action selection)
  const raPickerColumns = [
    {
      name: 'actionTypes',
      // Columns with options
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

  // Buttons for picker modal (Required Action selection)
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