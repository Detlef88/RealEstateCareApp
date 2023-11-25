<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <h1>Settings</h1>
      <p>Here you'll find all settings.</p>
      <p>Please note that not all settings work at this time.</p>
      <ion-list-header>Appearance settings</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Dark Mode</ion-label>
          <ion-toggle
            aria-label="Dark Mode"
            :checked="themeToggle"
            @ionChange="toggleChange($event)"
            slot="end"
            justify="space-between">
          </ion-toggle>
        </ion-item>
      </ion-list>
      <ion-list-header>Accessibility settings</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Font Weight</ion-label>
          <ion-toggle
            aria-label="Font Weight"
            :checked="boldFont"
            @ionChange="toggleBold($event)"
            slot="end"
            justify="space-between">
            {{ boldFont ? 'Bold' : 'Default' }}
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Font Family</ion-label>
          <ion-select
            aria-label="Font Family"
            v-model="selectedFontFamily"
            @ionChange="changeFontFamily"
            slot="end">
            <ion-select-option value="Roboto">Roboto</ion-select-option>
            <ion-select-option value="Arial">Arial</ion-select-option>
            <ion-select-option value="Verdana">Verdana</ion-select-option>
            <!-- Add other font options here -->
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-list-header>Notification settings</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Push notifications</ion-label>
          <ion-toggle
            aria-label="Push notifications"
            slot="end"
            justify="space-between">
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>E-mail notifications</ion-label>
          <ion-toggle
            aria-label="E-mail notifications"
            slot="end"
            justify="space-between">
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent, IonListHeader, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const themeToggle = ref(false);
  const boldFont = ref(false);
  const selectedFontFamily = ref('Roboto');

  // Dark Mode Functions
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const toggleDarkTheme = (shouldAdd) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  const initializeDarkTheme = (isDark) => {
    themeToggle.value = isDark;
    toggleDarkTheme(isDark);
  };

  const toggleChange = (ev) => {
    toggleDarkTheme(ev.detail.checked);
  };

  initializeDarkTheme(prefersDark.matches);
  
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));

  // Font Weight Toggle Function
  const toggleBold = (ev) => {
    boldFont.value = ev.detail.checked;
    // Apply bold font styling to the entire app based on boldFont value
    document.body.style.fontWeight = boldFont.value ? 'bold' : 'normal';
  };

  // Font Family Selection Function
  const changeFontFamily = () => {
    // Apply selected font family to the entire app
    document.body.style.fontFamily = selectedFontFamily.value;
  };
</script>

<style scoped>
  .ion-page {
    align-items: center;
  }
  ion-content {
    max-inline-size: 840px;
  }
  p + p {
    font-size: small;
  }
</style>