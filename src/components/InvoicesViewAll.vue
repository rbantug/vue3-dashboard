<template>
<BaseModal
    :show="invoicesStore.stateInvoicesViewAll"
    ariaLabelProp="all invoices"
    @close="closeModal"
    ref="modalRef"
    :close-btn-keyboard-trap="invoicesStore.invoiceData.length === 0"
  >
    <template #header>All Invoices</template>
    <template #default>
      <div class="flex flex-col justify-center items-center gap-y-2">
        <!-- Pending Invoices -->
        <div class="relative w-[95%] bg-gray-900 rounded-lg min-h-[8rem]">
          <div
            v-if="!invoicesStore.hasPending"
            class="absolute bottom-[10%] left-[30%] text-white"
          >
            There are no pending invoices
          </div>
          <div class="flex flex-col">
            <div class="mt-4 ml-4">
              <h2 class="text-white">Pending Invoices</h2>
            </div>

            <div
              class="flex justify-center mt-4 mr-8 mb-4 max-h-[15rem] overflow-y-auto"
            >
              <InvoicesTable
                ref="refInvoiceTable"
                status="pending"
                table-width="w-[90%]"
                :status-progress-obj="invoicesStore.outputPendingBar"
                :invoice-list="invoicesStore.invoiceData"
                :delete-is-visible="true"
              />
            </div>
          </div>
        </div>
        <!-- Successful Invoices -->
        <div
          class="relative w-[95%] h-auto bg-gray-900 rounded-lg min-h-[8rem] overflow-y-auto duration-300"
        >
          <div
            v-if="!invoicesStore.hasSuccess"
            class="absolute bottom-[10%] left-[35%] text-white"
          >
            There are no invoices
          </div>
          <div class="flex flex-col">
            <div class="mt-4 ml-4">
              <h2 class="text-white">Successful Invoices</h2>
            </div>
            <div
              class="flex justify-center mt-4 mr-8 mb-4 max-h-[15rem] overflow-none"
            >
              <InvoicesTable
                ref="refInvoiceTable"
                status="successful"
                table-width="w-[90%]"
                :status-progress-obj="invoicesStore.outputPendingBar"
                :invoice-list="invoicesStore.invoiceData"
                :delete-is-visible="true"
                @focus-modal-close-btn="focusModalCloseBtn"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './Base Components/BaseModal.vue'
import InvoicesTable from './Utils/InvoicesTable.vue';

import { useInvoicesStore } from "../stores/useInvoice";

const invoicesStore = useInvoicesStore();

const props = defineProps({
    viewAllBtnRef: {
        type: [HTMLButtonElement, null],
        required: true
    }
})

function closeModal() {
    invoicesStore.closeInvoicesViewAll()
    props.viewAllBtnRef?.focus();
}

const modalRef = ref(null)

function focusModalCloseBtn() {
  modalRef.value?.focusCloseBtn()
}
</script>