<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <!-- Dashboard section -->
      <div id="homePage">
        <div class="container">
          <!-- Dashboard card components -->
          <dashboard-card title="Tasks" icon="clipboardOutline" />
          <dashboard-card title="Completed" icon="fileTrayFullOutline" />
          <dashboard-card title="Library" icon="libraryOutline" />
          <dashboard-card title="Settings" icon="cogOutline" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent } from '@ionic/vue';
  import DashboardCard from '@/components/DashboardCard.vue'; // Importing a DashboardCard component
  import { onMounted } from 'vue';
  import store from '@/store';

  // When the component is mounted to the DOM
  onMounted(async () => {
    // Wait for the 'fetchReports' action to complete by dispatching it
    await store.dispatch('fetchReports');
  });
</script>

<style scoped>
  #homePage {
    display: flex;
    block-size: 100%;
    align-items: center;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
