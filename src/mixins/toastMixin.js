import { toastController } from '@ionic/vue';
import { warningOutline, checkmarkCircleOutline } from 'ionicons/icons';
import store from '@/store';

export const toastMixin = {
  methods: {
    // Method to present success toast message
    async presentSuccessToast(message) {
      // Create success toast
      const toast = await toastController.create({
        message: message,
        icon: checkmarkCircleOutline,
        duration: 2500,
        position: 'top',
        color: 'success',
      });

      // Show success toast
      await toast.present();

      // Clear successes state after showing toast
      store.dispatch('clearSuccesses');
    },

    // Method to present error toast message
    async presentErrorToast(message) {
      // Create error toast
      const toast = await toastController.create({
        message: message,
        icon: warningOutline,
        duration: 2500,
        position: 'top',
        color: 'danger',
      });

      // Show error toast
      await toast.present();

      // Clear errors state after showing toast
      store.dispatch('clearErrors');
    },
  },
};
