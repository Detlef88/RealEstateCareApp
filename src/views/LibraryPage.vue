<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true" aria-label="Library Page">
      <h1 aria-label="Library Heading">Library</h1>
      <p aria-label="Library Description">Here you'll find all documents relating to the inspections, from standard sheets to test procedures.</p>
      
      <!-- Dynamically create buttons for each PDF file -->
      <ion-button
        v-for="(pdf, index) in pdfFiles"
        :key="index" expand="block"
        @click="openPdfViewer(pdf, getFileName(pdf))"
        class="pdf-button"
        aria-label="PDF Document Button">
        <ion-icon slot="start" :icon="documentTextOutline" aria-hidden="true"></ion-icon>
        <ion-label aria-label="PDF Document Name">{{ getDisplayName(pdf) }}</ion-label>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent, IonButton, IonIcon, IonLabel, modalController } from '@ionic/vue';
  import { documentTextOutline } from 'ionicons/icons';
  import ModalPdfViewer from '@/components/ModalPdfViewer.vue';

  // References to the pdf source
  const pdfFiles = [
    '../src/assets/pdfs/Modifications.pdf',
    '../src/assets/pdfs/Standard_Sheet.pdf',
    '../src/assets/pdfs/Test_Procedure.pdf'
    // Add more PDF files as needed
  ];

  // Function to extract file name without extension and replace underscores with spaces
  const getFileName = (filePath) => {
    const parts = filePath.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf('.'));
    return fileName.replace(/_/g, ' ');
  };

  // Function to get the display name
  const getDisplayName = (pdf) => {
    return getFileName(pdf);
  };

  // Opens the pdf viewer with the selected file
  const openPdfViewer = async (pdfFile, fileName) => {
    const modal = await modalController.create({
      component: ModalPdfViewer,
      componentProps: {
        pdfFile,
        fileName
      }
    });

    modal.present();
  }
</script>

<style scoped>
  .ion-page {
    align-items: center;
  }
  ion-content {
    max-inline-size: 840px;
  }
  .pdf-button ion-label {
    margin-inline-end: auto;
  }
</style>