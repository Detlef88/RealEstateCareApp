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
        aria-label="Damage Report Title">
        Damage Report
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
      <!-- Input for New Damage -->
      <ion-label
        slot="start"
        aria-label="New Damage Label">
        New damage?
      </ion-label>
      <ion-radio-group
        v-model="newDamage"
        aria-label="New Damage Radio Group">
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
      <!-- Input for Type of Damage -->
      <ion-input
        v-model="typeOfDamage"
        label-placement="stacked"
        readonly="true"
        label="Type of damage"
        placeholder="Make selection"
        aria-label="Type of Damage Input">
      </ion-input>
      <ion-button
        id="tod-picker"
        aria-label="Type of Damage Picker">
        Select
      </ion-button>
      <ion-picker
        trigger="tod-picker"
        :columns="todPickerColumns"
        :buttons="todPickerButtons"
        aria-label="Type of Damage Picker Modal">
      </ion-picker>
    </ion-item>
    <ion-item>
      <!-- Input for Date -->
      <ion-label>Date</ion-label>
      <ion-datetime-button
        datetime="date"
        aria-label="Date Button">
      </ion-datetime-button>
      <ion-modal
        :keep-contents-mounted="true"
        aria-label="Date Modal">
        <ion-datetime
          v-model="date"
          id="date"
          presentation="date"
          :show-default-buttons="true"
          aria-label="Date Picker">
        </ion-datetime>
      </ion-modal>
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
      <!-- Input for Description -->
      <ion-textarea
        v-model="description"
        label-placement="stacked"
        label="Description"
        :auto-grow="true"
        rows="8"
        placeholder="Enter text"
        aria-label="Description Textarea">
      </ion-textarea>
    </ion-item>
  </ion-content>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, IonItem, IonInput, IonLabel, IonRadioGroup, IonRadio, IonPicker, IonDatetimeButton, IonDatetime, IonModal, IonTextarea, modalController } from '@ionic/vue';
  import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import { ref, defineProps } from 'vue';
  import store from '@/store';

  // Props from parent component
  const props = defineProps(['report']);

  // References to form field values
  const location = ref(props.report.reports.damageReport.location);
  const newDamage = ref(props.report.reports.damageReport.newDamage);
  const typeOfDamage = ref(props.report.reports.damageReport.typeOfDamage);
  const date = ref(props.report.reports.damageReport.date ? props.report.reports.damageReport.date : new Date().toISOString().split('T')[0]);
  const urgentAction = ref(props.report.reports.damageReport.urgentAction);
  const description = ref(props.report.reports.damageReport.description);

  // Cancel function to dismiss the modal
  const cancel = () => modalController.dismiss(null, 'cancel');
  
  // Confirm function to update the report and dismiss the modal
  const confirm = async () => {
    await store.dispatch('updateReport', {
      id: props.report.id,
      modalType: 'damageReport',
      reports: {
        damageReport: {
          location: location.value,
          newDamage: newDamage.value,
          typeOfDamage: typeOfDamage.value,
          date: date.value,
          urgentAction: urgentAction.value,
          description: description.value
        }
      }
    });

    // Dismiss the modal on successful update
    modalController.dismiss(null, 'confirm');
  };

  // Configuration for the picker component (Type of Damage selection)
  const todPickerColumns = [
    {
      name: 'damageTypes',
      // Columns with options
      options: [
        {
          text: 'Deliberately',
          value: 'Deliberately',
        },
        {
          text: 'Wear',
          value: 'Wear',
        },
        {
          text: 'Violence',
          value: 'Violence',
        },
        {
          text: 'Normal usage',
          value: 'Normal usage',
        },
        {
          text: 'Calamity',
          value: 'Calamity',
        },
        {
          text: 'other...',
          value: 'Other',
        }
      ],
    },
  ];

  // Buttons for picker modal (Type of Damage selection)
  const todPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        // Store the selected value from the picker
        typeOfDamage.value = value.damageTypes.value;
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