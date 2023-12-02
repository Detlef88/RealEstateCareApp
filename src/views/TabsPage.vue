<template>
  <ion-page>
    <ion-tabs
      aria-label="Main Tabs">
      <header-toolbar />
      <ion-router-outlet>
      </ion-router-outlet>
      <ion-tab-bar
        slot="bottom"
        aria-label="Tab Bar">
        <ion-tab-button
          tab="home"
          href="/home"
          aria-label="Home Tab">
          <ion-icon
            aria-hidden="true"
            :icon="homeOutline" />
          <ion-label>
            Home
          </ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tasks"
          href="/tasks"
          aria-label="Tasks Tab">
          <ion-icon
            aria-hidden="true"
            :icon="clipboardOutline"
          />
          <ion-label>
            Tasks
          </ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="completed"
          href="/completed"
          aria-label="Completed Tab">
          <ion-icon
            aria-hidden="true"
            :icon="fileTrayFullOutline"
          />
          <ion-label>
            Completed
          </ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="library"
          href="/library"
          aria-label="Library Tab">
          <ion-icon
            aria-hidden="true"
            :icon="libraryOutline"
          />
          <ion-label>
            Library
          </ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="settings"
          href="/settings"
          aria-label="Settings Tab">
          <ion-icon
            aria-hidden="true"
            :icon="cogOutline"
          />
          <ion-label>
            Settings
          </ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
  import { homeOutline, clipboardOutline, fileTrayFullOutline, libraryOutline, cogOutline } from 'ionicons/icons';
  import HeaderToolbar from '@/components/HeaderToolbar.vue';
  import store from '@/store';
  import { computed, watch } from 'vue';
  import { toastMixin } from '@/mixins/toastMixin.js';

  // Accessing methods from toastMixin
  const { presentErrorToast, presentSuccessToast } = toastMixin.methods;

  // Computed properties to check for error and success states
  const error = computed(() => store.state.errors.length > 0);
  const errorMessage = computed(() => store.state.errors);

  const success = computed(() => store.state.successes.length > 0);
  const successMessage = computed(() => store.state.successes);

  // Watch for changes in error state and show error toast
  watch(error, (hasError) => {
  if (hasError) {
      presentErrorToast(errorMessage.value);
  }
  });

  // Watch for changes in success state and show success toast
  watch(success, (hasSuccess) => {
  if (hasSuccess) {
      presentSuccessToast(successMessage.value);
  }
  });
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