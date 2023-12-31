<template>
  <!-- Modal for confirmation when removing an invoice -->

  <BaseWarningModal :warning-modal-is-visible="invoicesStore.deleteInvoiceModalIsVisible" @emit-yes-btn="yesBtn" @emit-no-btn="closeModal" modal-height="h-[16rem]" modal-width="w-[25rem] " icon-color="red">
    <template v-slot:default>
      <span class="text-center">Do you want to remove Invoice # {{ invoicesStore.invoiceDataToBeRemoved.id }}?</span>
    </template>
  </BaseWarningModal>

  <!-- Main -->
  <table :class="props.tableWidth" id="table">
    <thead>
      <tr class="text-sm text-gray-300 text-left">
        <th class="sticky top-0 bg-gray-900">Number</th>
        <th class="sticky top-0 bg-gray-900">Date</th>
        <th class="sticky top-0 bg-gray-900">Client</th>
        <th class="sticky top-0 bg-gray-900">Amount</th>
        <th class="sticky top-0 pr-10 bg-gray-900 z-30">Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- Invoice items -->
      <template v-for="(invoice, index) of arr" :key="invoice.id" ref="refList">
        <transition-group>
        <tr
          v-if="props.status === 'pending' ? invoice.status === 'Pending' : props.status === 'successful' ? invoice.status === 'Successful' : invoice.status"
          class="border-b border-gray-700 last:border-none text-sm relative"
        >
          <!-- Invoice # -->
          <td class="py-4">
            <span class="text-white"> #{{ invoice.id }} </span>
          </td>
          <!-- Date -->
          <td>
            <span class="text-gray-300">
              {{ invoice.date }}
            </span>
          </td>
          <!-- Client Info -->
          <td>
            <div class="col-span-2 flex items-center gap-x-2">
              <img
                :src="getImgUrl(invoice.clientPhoto)"
                alt="profile picture"
                class="h-6 w-6 object-cover rounded-full"
                aria-hidden="true"
              />
              <span class="text-white text-xs">{{
                invoice.client
              }}</span>
            </div>
          </td>
          <!-- Amount -->
          <td>
            <span class="text-white">${{ invoice.amount }} </span>
          </td>
          <!-- Status -->
          <td>
            <div class="relative bottom-4 right-0">
              <div
                class="flex justify-left items-center absolute top-0.5 w-24 gap-x-2 p-4 rounded-lg"
                :class="
                  invoice.status === 'Successful'
                    ? ' border-green-400/10 bg-green-700/20 text-green-400'
                    : 'border-gray-400/10 bg-gray-400/40 text-gray-400'
                "
              >
                <div
                  v-if="invoice.status === 'Pending'"
                  class="absolute bg-indigo-700/70 py-4 left-0 rounded-lg duration-300 rotate-180"
                  :style="`width: ${
                    reactiveStatusProgObj[`${invoice.id}`]
                  }%`"
                ></div>
              </div>
              <div
                class="flex justify-left items-center absolute w-28 gap-x-1 p-2 rounded-lg z-20"
              >
                <div class="relative flex items-center">
                  <span
                    class="absolute p-1 rounded-full h-2 w-2 z-10"
                    :class="
                      invoice.status === 'Successful'
                        ? 'bg-green-400'
                        : 'bg-indigo-400'
                    "
                  ></span>
                  <span
                    v-if="invoice.status === 'Pending'"
                    class="absolute p-1 rounded-full h-full w-full bg-indigo-400 animate-ping opacity-75 z-0"
                  >
                  </span>
                </div>
                <span
                  class="pl-2"
                  :class="
                    invoice.status === 'Successful'
                      ? 'text-green-400'
                      : 'text-indigo-400'
                  "
                  >{{ invoice.status }}</span
                >
              </div>
            </div>
          </td>
          <div v-if="props.deleteIsVisible" class="absolute -right-7 top-3 h-8 w-8 outline-none text-red-600/40 cursor-pointer hover:text-red-600 focus-visible:text-red-600 duration-300" @click="openModal(invoice, $event)" @keypress.exact.enter="openModal(invoice, $event)" tabindex="0" :aria-label="`delete invoice #${invoice.id}`">
            <Icon icon="material-symbols:delete-outline" class="absolute left-1 top-1 h-6 w-6"/>
          </div>
        </tr>
      </transition-group>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, toRef } from 'vue'
import BaseWarningModal from '../Base Components/BaseWarningModal.vue';
import { getRandomNumber } from '../../composables-and-reusable-logic/getRandomNumber';
import { getImgUrl } from '../../composables-and-reusable-logic/getImgUrl';
import { toast } from "vue3-toastify";

import { useInvoicesStore } from '../../stores/useInvoice';
import { useNotificationStore } from '../../stores/useNotification';

const invoicesStore = useInvoicesStore();
const notificationStore = useNotificationStore();

const props = defineProps({
  recentInvoice: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: "all", // options are 'all', 'pending' & 'successful'. There is an invoiceTable that will show both pending and successful invoices ("all") and 2 other invoicesTable with show either "pending" OR "successful".
  },
  tableWidth: {
    type: String,
    required: false,
    default: "w-full", // tailwindCSS
  },
  statusProgressObj: {
    type: Object,
    required: true,
  },
  invoiceList: {
    type: Array,
    required: true,
  },
  tableMaxHeight: {
    type: String,
    required: false, // tailwindCSS
  },
  deleteIsVisible: {
    type: Boolean,
    required: false,
  },
});

const reactiveStatusProgObj = toRef(props, 'statusProgressObj')

const emits = defineEmits(['cancelPendingInvoice', 'deleteSuccessfulInvoice', 'focusModalCloseBtn'])

let invoiceArr = ref([...invoicesStore.invoiceData])

const arr = computed(() => {
  updateInvoiceArr()
  if(props.recentInvoice) {
    return invoiceArr.value.slice(0,2)
  } else {
    return invoiceArr.value
  }
})

function updateInvoiceArr() {
  invoiceArr.value = [...invoicesStore.invoiceData]
}

function deleteInvoice(invoice) {
  // if invoice status is pending, remove pending notification

  if(invoice.status === 'pending') {
    notificationStore.removeNotification(notificationStore.pendingNotifyIdDeleteInvoice)
    notificationStore.updatePendingNotifyId(0)
  }

  // create notification before removing the invoice

  toast.info(`Deleted invoice #${invoice.id}.`, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
      transition: toast.TRANSITIONS.SLIDE,
    });

  const newNotificationId = notificationStore.lastNotificationId + Math.floor(getRandomNumber(0, 500))

  notificationStore.updateNotifications({
      id: newNotificationId,
      type: 'invoice',
      status: 'deleted',
      message: `Invoice #${invoice.id} was deleted`,
      showCancelBtn: false,
    })
    notificationStore.updateLastNotificationId(newNotificationId) 

  // remove the invoice

  if(invoice.status === 'Pending') {
    invoicesStore.deleteSingleInvoice(invoice.id)
    clearInterval(invoicesStore.outputPendingBar[`${invoice.id}SI`])
    clearTimeout(invoicesStore.outputPendingBar[`${invoice.id}ST`])
    invoicesStore.checkPendings()
    notificationStore.updateNotifyCancelBtn(invoice.id, 'invoice')
  } 
  if(invoice.status === 'Successful') {
    invoicesStore.deleteSingleInvoice(invoice.id)
    invoicesStore.checkSuccess()
  }
}
//////////////////////
// Modal confirmation when deleting an invoice
//////////////////////

let tempDeleteBtnRef = ref(null)

function openModal(invoice, event) {
  invoicesStore.updateInvData2BeRemoved(invoice)
  invoicesStore.updateDelInvModalVisibility(true)
  tempDeleteBtnRef.value = event.target
}

function closeModal() {
  invoicesStore.updateDelInvModalVisibility(false)
  if(invoicesStore.stateInvoicesViewAll) {
    tempDeleteBtnRef.value.focus()
  }
} 

function yesBtn() {
  deleteInvoice(invoicesStore.invoiceDataToBeRemoved)
  closeModal()

  if(!invoicesStore.stateInvoicesViewAll) return

  if(invoicesStore.invoiceData.length !== 0) {
    tempDeleteBtnRef.value.parentElement.parentElement.children[0].children[5].focus()
  } else {
    emits('focusModalCloseBtn')
  }
}

// Misc

defineExpose({
  updateInvoiceArr,
})

</script>

<style scoped>
.v-move {
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.modal-enter-active {
    transition: all 0.2s ease-out;
}

.modal-leave-active {
    transition: all 0.2s ease-in;
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>