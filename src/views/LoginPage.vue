<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <div id="loginPage">
        <ion-card>
          <img src="../assets/brandLogoName.svg" alt="Real Estate Care logo and name">
          <ion-card-header>
            <ion-title>Log in</ion-title>
          </ion-card-header>

          <ion-card-content id="loginCard">
            <ion-input
              label-placement="stacked"
              label="E-mail"
              type="email"
              v-model="email"
              placeholder="Email"
              enterkeyhint="next"
              inputmode="email"
              mode="md"
              fill="outline"
              required="true"
            ></ion-input>
            <ion-input
              label-placement="stacked"
              label="Password"
              type="password"
              v-model="password"
              placeholder="Password"
              enterkeyhint="go"
              mode="md"
              fill="outline"
              required="true"
            ></ion-input>
            <ion-button @click="loginUser" expand="block" size="small">Login</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { IonPage, IonContent, IonCard, IonCardHeader, IonTitle, IonCardContent, IonInput, IonButton } from '@ionic/vue';
  import { ref, computed, watch } from 'vue';
  import store from '@/store';
  import { toastMixin } from '@/mixins/toastMixin.js';

  const email = ref('');
  const password = ref('');

  const loginUser = () => {
    store.dispatch('loginUser', { email: email.value, password: password.value });
  };

  const { presentErrorToast, presentSuccessToast } = toastMixin.methods;

  const error = computed(() => store.state.errors.length > 0);
  const errorMessage = computed(() => store.state.errors);

  const success = computed(() => store.state.successes.length > 0);
  const successMessage = computed(() => store.state.successes);

  watch(error, (hasError) => {
  if (hasError) {
      presentErrorToast(errorMessage.value);
  }
  });

  watch(success, (hasSuccess) => {
  if (hasSuccess) {
      presentSuccessToast(successMessage.value);
  }
  });
</script>

<style scoped>
  #loginPage {
    display: flex;
    block-size: 100%;
    inline-size: 100%;
    align-items: center;
    justify-content: center;
  }
  #loginPage ion-card {
    inline-size: 100%;
    max-inline-size: 300px;
  }
  body.dark #loginPage ion-card img {
    filter: invert(1);
  }
  #loginPage ion-card.md img {
    padding-block-start: 16px;
    padding-inline: 16px;
  }
  #loginPage ion-card.ios img {
    padding-block-start: 20px;
    padding-inline: 20px;
  }
  #loginCard ion-input {
    margin-block-end: 8px;
  }
  ion-content {
    --background: rgba(0, 170, 162);
  }
</style>