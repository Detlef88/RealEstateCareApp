<template>
  <!-- Card container that links to a specific route -->
  <ion-card :routerLink="routePath">
    <ion-item class="card-item" lines="none">
      <!-- Icon displayed within the card -->
      <ion-icon size="large" fill="clear" aria-hidden="true" :icon="ionIcons[props.icon]" />
      <!-- Badge displayed if the title is 'Tasks' and openReportsCount > 0 -->
      <ion-badge v-if="props.title === 'Tasks' && openReportsCount > 0" slot="end">{{ openReportsCount }}</ion-badge>
    </ion-item>
    <ion-card-header>
      <!-- Title displayed in the card header -->
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script setup>
  // Import necessary Ionic components and libraries
  import { IonCard, IonItem, IonIcon, IonCardHeader, IonCardTitle, IonBadge } from '@ionic/vue';
  import * as ionIcons from 'ionicons/icons';
  import { ref, computed } from 'vue';
  import store from '@/store';

  // Define the properties accepted by this component
  const props = defineProps([
    'title',
    'icon'
  ]);

  // Define a reactive reference to the route path based on the title
  const routePath = ref(`${props.title.toLowerCase()}`);

  // Compute the count of openReports from the store's state
  const openReportsCount = computed(() => {
    const openReports = store.state.reports.filter(report => report.status === 'Open');
    return openReports.length;
  });
</script>

<style scoped>
  ion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  }
  .ios ion-card {
    inline-size: calc(50% - 32px);
  }
  .md ion-card {
    inline-size: calc(50% - 20px);
  }
  ion-item.card-item {
    position: relative;
    overflow: visible;
  }
  ion-item.card-item ion-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
  }
</style>