<template>
  <ion-header>
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
        aria-label="PDF File Title">
        {{ fileName }}
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
      <!-- Display the PDF using vue-pdf-embed -->
      <vue-pdf-embed
        :source="pdfFile"
        aria-label="PDF file"
      />
  </ion-content>
</template>
  
<script setup>
  import { IonHeader, IonToolbar, IonButton, IonIcon, IonTitle, IonContent, modalController } from '@ionic/vue';    
  import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { ref } from 'vue';

  // Props from parent component
  const props = defineProps(['pdfFile', 'fileName']);

  // Cancel function to dismiss the modal
  const cancel = () => modalController.dismiss(props.pdfFile, 'cancel');
  
  // Confirm function to dismiss the modal
  const confirm = () => modalController.dismiss(props.pdfFile, 'confirm');

  // Display the PDF file received as a prop
  const pdfFile = ref(props.pdfFile);
  
  // Display the file name received as a prop
  const fileName = props.fileName;
</script>
  
<style scoped>
  ion-title {
    text-align: center;
  }
</style>