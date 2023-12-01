<template>
  <ion-page
    aria-label="Homepage">
    <ion-content
      class="ion-padding"
      :fullscreen="true">
      <!-- Dashboard section -->
      <div
        id="homePage">
        <div
          class="container"
          aria-label="Dashboard Card Container">
          <!-- Dashboard card components -->
          <dashboard-card
            title="Tasks"
            icon="clipboardOutline"
            aria-label="Tasks Dashboard Card" />
          <dashboard-card
            title="Completed"
            icon="fileTrayFullOutline"
            aria-label="Completed Dashboard Card" />
          <dashboard-card
            title="Library"
            icon="libraryOutline"
            aria-label="Library Dashboard Card" />
          <dashboard-card
            title="Settings"
            icon="cogOutline"
            aria-label="Settings Dashboard Card" />
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
