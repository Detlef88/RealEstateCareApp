<template>
  <!-- Card container that links to a specific route -->
  <ion-card
    :routerLink="routePath"
    aria-label="Card Container">
    <ion-item
      class="card-item"
      lines="none"
      aria-label="Card Item">
      <!-- Icon displayed within the card -->
      <ion-icon
        size="large"
        fill="clear"
        :icon="ionIcons[props.icon]"
        aria-label="Card Icon"
      />
      <!-- Badge displayed if the title is 'Tasks' and openReportsCount > 0 -->
      <ion-badge
        v-if="props.title === 'Tasks' && openReportsCount > 0"
        slot="end"
        aria-label="Open Reports Badge">
        {{ openReportsCount }}
      </ion-badge>
    </ion-item>
    <ion-card-header
      aria-label="Card Header">
      <!-- Title displayed in the card header -->
      <ion-card-title
        aria-label="Card Title">
        {{ title }}
      </ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<script setup>
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
  ion-card:hover {
    cursor: pointer;
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
    --background: transparent;
  }
  ion-item.card-item ion-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    inline-size: 24px;
    block-size: 24px;
    line-height: 16px;
    border-radius: 50%;
  }
</style>