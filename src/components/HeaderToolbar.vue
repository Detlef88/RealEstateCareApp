<template>
  <ion-header>
    <ion-toolbar>
      <router-link to="home" slot="start">
        <ion-icon id="brandLogo" src="/src/assets/brandLogo.svg" />
      </router-link>
      <ion-icon id="brandName" src="/src/assets/brandName.svg" />
      <ion-button slot="end" @click="logoutUser" color="danger">
        <ion-icon slot="icon-only" size="large" aria-hidden="true" :icon="logOutOutline" />
      </ion-button>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
  import { IonHeader, IonToolbar, IonIcon, IonButton } from '@ionic/vue';
  import { logOutOutline } from 'ionicons/icons';
  import store from '@/store';
  import router from '@/router';

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