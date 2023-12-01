import { toastController } from '@ionic/vue';
import { warningOutline, checkmarkCircleOutline } from 'ionicons/icons';
import store from '@/store';

export const toastMixin = {
  methods: {
    async presentSuccessToast(message) {
      const toast = await toastController.create({
        message: message,
        icon: checkmarkCircleOutline,
        duration: 2500,
        position: 'top',
        color: 'success',
      });

      await toast.present();

      // Clear successes state after showing toast
      store.dispatch('clearSuccesses');
    },

    async presentErrorToast(message) {
      const toast = await toastController.create({
        message: message,
        icon: warningOutline,
        duration: 2500,
        position: 'top',
        color: 'danger',
      });

      await toast.present();

      // Clear errors state after showing toast
      store.dispatch('clearErrors');
    },
  },
};