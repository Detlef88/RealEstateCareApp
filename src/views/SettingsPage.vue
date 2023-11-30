<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <h1>Settings</h1>
      <p>Here you'll find all settings.</p>
      <p>Please note that not all settings work at this time. Currently you are only able to change the theme, the other options are for demo purposes only.</p>
      <ion-list-header>Profile settings</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-avatar slot="start">
            <img alt="Silhouette of a person's head" src="@/assets/avatar.svg" />
          </ion-avatar>
          <ion-label>Username</ion-label>
        </ion-item>
        <ion-item>
          <ion-input
            label="Old password"
            label-placement="stacked"
            type="password"
            value="">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="New password"
            label-placement="stacked"
            type="password"
            value="">
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="Repeat new password"
            label-placement="stacked"
            type="password"
            value="">
          </ion-input>
        </ion-item>
      </ion-list>
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
  import { IonPage, IonContent, IonListHeader, IonList, IonItem, IonAvatar, IonLabel, IonInput, IonToggle } from '@ionic/vue';
  import { ref } from 'vue';

  const themeToggle = ref(false);

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