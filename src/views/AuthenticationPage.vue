<template>
    <ion-page>
        <ion-content
            class="ion-padding"
            :fullscreen="true"
            aria-label="Authentication Page">
            <div
                id="authenticationPage">
                <!-- Authentication Card -->
                <ion-card
                    aria-label="Authentication Card">
                    <!-- Real Estate Care logo and name -->
                    <img
                        src="../assets/brandLogoName.svg"
                        alt="Real Estate Care logo and name"
                        aria-label="Real Estate Care logo and name">
                    <ion-card-header>
                        <ion-title
                            aria-label="Authentication">
                            Authentication
                        </ion-title>
                    </ion-card-header>
        
                    <ion-card-content
                        id="authCard"
                        aria-label="Authentication Information">
                        <!-- Authentication Input Field -->
                        <ion-input
                            label-placement="stacked"
                            label="Authenticate"
                            type="number"
                            v-model="userAuthCode"
                            placeholder="Authentication code"
                            enterkeyhint="go"
                            inputmode="numeric"
                            mode="md"
                            fill="outline"
                            required="true"
                            aria-label="Authentication Input">
                        </ion-input>
                        <div
                            id="button-container">
                            <!-- Get Code Button -->
                            <ion-button
                                slot="start"
                                @click="getAuthCode"
                                size="small"
                                aria-label="Get Code Button">
                                Get code
                            </ion-button>
                            <!-- Authenticate Button -->
                            <ion-button
                                slot="end"
                                @click="authenticateUser"
                                size="small"
                                aria-label="Authenticate Button">
                                Authenticate
                            </ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
    import { IonPage, IonContent, IonCard, IonCardHeader, IonTitle, IonCardContent, IonInput, IonButton, toastController } from '@ionic/vue';
    import { keyOutline } from 'ionicons/icons';
    import { ref, computed, watch } from 'vue';
    import store from '@/store';
    import { toastMixin } from '@/mixins/toastMixin.js';
  
    // Reactive variables
    const userAuthCode = ref('');

    // Computed property to access authCode from store
    const authCode = computed(() => store.state.authCode);

    // Function to get authentication code
    const getAuthCode = () => {
        presentAuthToast(authCode.value);
    };
    
    // Function to present authentication toast
    const presentAuthToast = async (message) => {
        const toast = await toastController.create({
            message: message,
            icon: keyOutline,
            duration: 6000,
            position: 'top',
            color: 'success',
        });
    
        await toast.present();
    };

    // Function to authenticate user
    const authenticateUser = () => {
        // Using unary plus operator to convert to Number
        const enteredAuthCode = +userAuthCode.value;

        store.dispatch('authenticateUser', enteredAuthCode);
    };

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
    #authenticationPage {
        display: flex;
        block-size: 100%;
        inline-size: 100%;
        align-items: center;
        justify-content: center;
    }
    #authenticationPage ion-card {
        inline-size: 100%;
        max-inline-size: 300px;
    }
    body.dark #authenticationPage ion-card img {
        filter: invert(1);
    }
    #authenticationPage ion-card.md img {
        padding-block-start: 16px;
        padding-inline: 16px;
    }
    #authenticationPage ion-card.ios img {
        padding-block-start: 20px;
        padding-inline: 20px;
    }
    #authCard ion-input {
        margin-block-end: 8px;
    }
    #button-container {
        display: flex;
        justify-content: space-between;
    }
    ion-content {
        --background: rgba(0, 170, 162);
    }
</style>