<template>
    <ion-button @click="openModal(report, reportType)" class="modal-button" expand="block">
        <template v-if="report.status === 'Open'">
            <ion-icon :icon="ionIcons[getIcon(reportType)]" aria-hidden="true"></ion-icon>
            <ion-label>{{ getLabel(reportType) }}</ion-label>
            <ion-badge slot="end" v-if="report.tasktype === reportType" color="warning">
                <ion-icon :icon="ionIcons.createOutline" aria-hidden="true"></ion-icon>
            </ion-badge>
        </template>
        <template v-else>
            <ion-icon :icon="ionIcons.pencilOutline" aria-hidden="true"></ion-icon>
            <ion-label>Edit report</ion-label>
        </template>
    </ion-button>
</template>
  
<script setup>
    import { IonButton, IonIcon, IonLabel, IonBadge, modalController } from '@ionic/vue';
    import * as ionIcons from 'ionicons/icons';
    import { ref } from 'vue';
    import ModalDamageReport from '@/components/ModalDamageReport.vue';
    import ModalMaintenanceReport from '@/components/ModalMaintenanceReport.vue';
    import ModalTechnicalInspection from '@/components/ModalTechnicalInspection.vue';
    import ModalModificationsInventory from '@/components/ModalModificationsInventory.vue';

    const report = ref(null);
    const reportType = ref('');
    let selectedReport = ref(null);


    // Props for the button data
    const props = defineProps({
    reportData: {
        type: Object,
        required: true
    },
    taskType: {
        type: String,
        required: true
    }
    });

    // Set the report data and report type from props
    report.value = props.reportData;
    reportType.value = props.taskType;

    // Function to open a modal based on report type
    const openModal = async (report, reportType) => {
    selectedReport.value = report;
    openModalByTaskType(reportType);
    };
  
    // Function to determine which modal to open based on task type
    const openModalByTaskType = async (taskType) => {
    let modalComponent;

    switch (taskType) {
        case 'damageReport':
        modalComponent = ModalDamageReport;
        break;
        case 'maintenanceReport':
        modalComponent = ModalMaintenanceReport;
        break;
        case 'technicalInspection':
        modalComponent = ModalTechnicalInspection;
        break;
        case 'modificationsInventory':
        modalComponent = ModalModificationsInventory;
        break;
        default:
        return;
    }

    const modal = await modalController.create({
        component: modalComponent,
        componentProps: {
        report: selectedReport.value,
        },
    });

    modal.present();
    };
  
    // Function to determine the appropriate icon based on the reportType
    const getIcon = (reportType) => {
    switch (reportType) {
        case 'damageReport':
        return 'bandageOutline';
        case 'maintenanceReport':
        return 'buildOutline';
        case 'technicalInspection':
        return 'eyeOutline';
        case 'modificationsInventory':
        return 'hammerOutline';
        default:
        return '';
    }
    };
  
    // Function to turn camelCase into an appropriate label name
    const getLabel = (input) => {
        // Split camelCase string into words
        const words = input.split(/(?=[A-Z])/);

        // Capitalize each word and join them with a space
        const result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        return result;
    };
  

</script>
  
<style scoped>
    .modal-button {
        --padding-start: 0.5rem;
        --padding-end: 0.5rem;
    }
    .modal-button > ion-icon {
        inline-size: 20px;
        block-size: 20px;
        margin-inline-end: 0.5rem;
    }
    .modal-button ion-label {
        margin-inline-end: auto;
    }
    .modal-button ion-badge {
        inline-size: 20px;
        block-size: 20px;
    }
</style>
  