<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div id="authenticationPage">
                <ion-card>
                    <img src="../assets/brandLogoName.svg" alt="Real Estate Care logo and name">
                    <ion-card-header>
                        <ion-title>Authentication</ion-title>
                    </ion-card-header>
        
                    <ion-card-content id="authCard">
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
                        ></ion-input>
                        <div id="button-container">
                            <ion-button slot="start" @click="getAuthCode" size="small">Get code</ion-button>
                            <ion-button slot="end" @click="authenticateUser" size="small">Authenticate</ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
    import { IonPage, IonContent, IonCard, IonCardHeader, IonTitle, IonCardContent, IonInput, IonButton, toastController } from '@ionic/vue';
    import { warningOutline, keyOutline } from 'ionicons/icons';
    import { ref, computed, watch } from 'vue';
    import store from '@/store';
  
    const userAuthCode = ref('');

    const authCode = computed(() => store.state.authCode);

    const getAuthCode = () => {
        presentAuthToast(authCode.value);
    };
    
    const presentAuthToast = async (message) => {
        const toast = await toastController.create({
            message: message,
            icon: keyOutline,
            duration: 7000,
            position: 'top',
            color: 'success',
        });
    
        await toast.present();
    };

    const authenticateUser = () => {
        // Using unary plus operator to convert to Number
        const enteredAuthCode = +userAuthCode.value;

        store.dispatch('authenticateUser', enteredAuthCode);
    };

    const error = computed(() => store.state.errors.length > 0);
    const errorMessage = computed(() => store.state.errors);

    watch(error, (hasError) => {
        if (hasError) {
            presentErrorToast(errorMessage.value);
        }
    });
  
    const presentErrorToast = async (message) => {
        const toast = await toastController.create({
            message: message,
            icon: warningOutline,
            duration: 3000,
            position: 'top',
            color: 'danger',
        });
    
        await toast.present();
    };
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