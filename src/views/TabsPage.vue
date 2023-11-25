<template>
  <ion-page>
    <ion-tabs>
      <header-toolbar />
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tasks" href="/tasks">
          <ion-icon aria-hidden="true" :icon="clipboardOutline" />
          <ion-label>Tasks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="completed" href="/completed">
          <ion-icon aria-hidden="true" :icon="fileTrayFullOutline" />
          <ion-label>Completed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/library">
          <ion-icon aria-hidden="true" :icon="libraryOutline" />
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="cogOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { homeOutline, clipboardOutline, fileTrayFullOutline, libraryOutline, cogOutline } from 'ionicons/icons';
import HeaderToolbar from '@/components/HeaderToolbar.vue';
</script>

<style scoped>
  ion-tab-bar {
    --color: rgba(255,255,255,0.7);
    --background: rgb(0, 170, 162);
  }

  .tab-selected {
    color: rgba(255,255,255,1);
    background: linear-gradient(90deg, rgba(71,94,108,1) 0%, rgba(20,27,31,1) 100%);
  }
</style>