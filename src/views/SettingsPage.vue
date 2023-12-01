<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true" aria-label="Settings Page">
      <h1 aria-label="Settings Heading">Settings</h1>
      <p aria-label="Settings Description">Here you'll find all settings.</p>
      <p aria-label="Settings Note">Please note that not all settings work at this time. Currently you are only able to change the theme, the other options are for demo purposes only.</p>
      <ion-list-header aria-label="Profile Settings Section">Profile settings</ion-list-header>
      <ion-list :inset="true" aria-label="Profile Settings List">
        <ion-item aria-label="Username Item">
          <ion-avatar slot="start" aria-hidden="true">
            <img alt="Silhouette of a person's head" src="@/assets/avatar.svg" aria-hidden="true" />
          </ion-avatar>
          <ion-label aria-label="Username">Username</ion-label>
        </ion-item>
        <ion-item aria-label="Old Password Item">
          <ion-input
            label="Old password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="Old Password Input">
          </ion-input>
        </ion-item>
        <ion-item aria-label="New Password Item">
          <ion-input
            label="New password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="New Password Input">
          </ion-input>
        </ion-item>
        <ion-item aria-label="Repeat New Password Item">
          <ion-input
            label="Repeat new password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="Repeat New Password Input">
          </ion-input>
        </ion-item>
      </ion-list>
      <ion-list-header aria-label="Appearance Settings Section">Appearance settings</ion-list-header>
      <ion-list :inset="true" aria-label="Appearance Settings List">
        <ion-item aria-label="Dark Mode Item">
          <ion-label>Dark Mode</ion-label>
          <ion-toggle
            aria-label="Dark Mode Toggle"
            :checked="themeToggle"
            @ionChange="toggleChange($event)"
            slot="end"
            justify="space-between"
            :aria-checked="themeToggle ? 'true' : 'false'">
          </ion-toggle>
        </ion-item>
      </ion-list>
      <ion-list-header aria-label="Notification Settings Section">Notification settings</ion-list-header>
      <ion-list :inset="true" aria-label="Notification Settings List">
        <ion-item aria-label="Push Notifications Item">
          <ion-label>Push notifications</ion-label>
          <ion-toggle
            aria-label="Push Notifications Toggle"
            slot="end"
            justify="space-between"
            aria-checked="false">
          </ion-toggle>
        </ion-item>
        <ion-item aria-label="Email Notifications Item">
          <ion-label aria-label="Email notifications">E-mail notifications</ion-label>
          <ion-toggle
            aria-label="Email Notifications Toggle"
            slot="end"
            justify="space-between"
            aria-checked="false">
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