<template>
  <!-- Page Header -->
  <ion-header
    aria-label="Page Header">
    <ion-toolbar>
      <!-- Home Link -->
      <router-link
        to="home"
        slot="start"
        aria-label="Home Link">
        <!-- Brand Logo -->
        <img
          id="brandLogo"
          src="@/assets/brandLogo.svg"
          aria-label="Brand Logo"
        />
      </router-link>
      <!-- Brand Name -->
      <img
        id="brandName"
        src="@/assets/brandName.svg"
        aria-label="Brand Name"
      />
      <!-- Logout Button -->
      <ion-button
        slot="end"
        @click="logoutUser"
        color="danger"
        aria-label="Logout Button">
        <!-- Logout Icon -->
        <ion-icon
          slot="icon-only"
          size="large"
          :icon="logOutOutline"
          aria-hidden="true"
        />
      </ion-button>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonIcon, IonButton } from '@ionic/vue';
  import { logOutOutline } from 'ionicons/icons';
  import store from '@/store';
  import router from '@/router';

  // Function to logout the user
  const logoutUser = async () => {
    store.dispatch('logoutUser');
    // Redirect the user to another page upon successful logout
    router.push('/login');
  };
</script>

<style scoped>
  ion-header {
    background: linear-gradient(90deg, rgba(71,94,108,1) 0%, rgba(20,27,31,1) 100%);
  }
  ion-toolbar {
    max-inline-size: 840px;
    margin-inline: auto;
    padding-inline: 0.5rem;
    --background: none;
  }

  ion-icon {
    color: rgba(255,255,255,1);
  }

  #brandLogo {
    inline-size: 40px;
    block-size: 40px;
  }

  #brandName {
    inline-size: 180px;
    block-size: 50px;
  }
</style>