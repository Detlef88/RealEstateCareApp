<template>
  <ion-page>
    <ion-content
      class="ion-padding"
      :fullscreen="true"
      aria-label="Settings Page">
      <!-- Header and introductory text -->
      <h1
        aria-label="Settings Heading">
        Settings
      </h1>
      <p
        aria-label="Settings Description">
        Here you'll find all settings.
      </p>
      <p
        aria-label="Settings Note">
        Please note that not all settings work at this time. Currently you are only able to change the theme, the other options are for demo purposes only.
      </p>

      <!-- Profile settings section -->
      <ion-list-header
        aria-label="Profile Settings Section">
        Profile settings
      </ion-list-header>
      <ion-list
        :inset="true"
        aria-label="Profile Settings List">
        <!-- Username item -->
        <ion-item
          aria-label="Username Item">
          <ion-avatar
            slot="start"
            aria-hidden="true">
            <img
              alt="Silhouette of a person's head"
              src="@/assets/avatar.svg"
              aria-hidden="true"
            />
          </ion-avatar>
          <ion-label
            aria-label="Username">
            Username
          </ion-label>
        </ion-item>
        <!-- Old password item -->
        <ion-item
          aria-label="Old Password Item">
          <ion-input
            label="Old password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="Old Password Input">
          </ion-input>
        </ion-item>
        <!-- New password item -->
        <ion-item
          aria-label="New Password Item">
          <ion-input
            label="New password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="New Password Input">
          </ion-input>
        </ion-item>
        <!-- Repeat New password item -->
        <ion-item
          aria-label="Repeat New Password Item">
          <ion-input
            label="Repeat new password"
            label-placement="stacked"
            type="password"
            value=""
            aria-label="Repeat New Password Input">
          </ion-input>
        </ion-item>
      </ion-list>

      <!-- Appearance settings section -->
      <ion-list-header
        aria-label="Appearance Settings Section">
        Appearance settings
      </ion-list-header>
      <ion-list
        :inset="true"
        aria-label="Appearance Settings List">
        <!-- Dark mode toggle item -->
        <ion-item
          aria-label="Dark Mode Item">
          <ion-label>
            Dark Mode
          </ion-label>
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

      <!-- Notification settings section -->
      <ion-list-header
        aria-label="Notification Settings Section">
        Notification settings
      </ion-list-header>
      <ion-list
        :inset="true"
        aria-label="Notification Settings List">
        <!-- Push notifications toggle item -->
        <ion-item
          aria-label="Push Notifications Item">
          <ion-label>
            Push notifications
          </ion-label>
          <ion-toggle
            aria-label="Push Notifications Toggle"
            slot="end"
            justify="space-between"
            aria-checked="false">
          </ion-toggle>
        </ion-item>
        <!-- Email notifications toggle item -->
        <ion-item
          aria-label="Email Notifications Item">
          <ion-label
            aria-label="Email notifications">
            E-mail notifications
          </ion-label>
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

  // State for the theme toggle
  const themeToggle = ref(false);

  // Dark Mode Functions

  // Check if the user's preference is for dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Toggle the dark theme class on the body
  const toggleDarkTheme = (shouldAdd) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  // Initialize the dark theme based on user preference
  const initializeDarkTheme = (isDark) => {
    themeToggle.value = isDark;
    toggleDarkTheme(isDark);
  };

  // Change handler for the theme toggle
  const toggleChange = (ev) => {
    toggleDarkTheme(ev.detail.checked);
  };

  // Initialize the theme based on user's system preference
  initializeDarkTheme(prefersDark.matches);
  
  // Listen for changes in the system preference for dark mode
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