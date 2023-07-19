<template>
  <!-- Modal for View All Btn -->

  <InvoicesViewAll
    :view-all-btn-ref="viewAllBtnRef"
  />

  <!-- Modal for New Invoice Btn -->

  <InvoicesAddNew 
    :new-invoice-btn-ref="newInvoiceBtnRef"
    @run-check-pendings="checkPendings"
  />

  <!-- Main -->

  <div class="flex">
    <div
      class="flex flex-col items-center justify-start rounded-2xl bg-gray-900 w-full h-[13.5rem] p-5 mx-5"
    >
      <!-- title and button -->
      <div class="flex justify-between items-center w-full mb-4">
        <h2 class="text-white">Invoices</h2>
        <div class="flex gap-x-4">
          <button
            class="flex p-2 text-sm bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
            ref="viewAllBtnRef"
            aria-label="view all invoices."
            @click="openModal"
          >View All
          </button>
          <button
            class="flex items-center gap-x-1 p-2 bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
            aria-label="add new invoice."
            ref="newInvoiceBtnRef"
            @click="openModal"
          >
            <Icon icon="ic:baseline-plus" class="h-4 w-4" />
            <span class="text-sm ml-1">New Invoice</span>
          </button>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <div
          v-if="invoicesStore.invoiceData.length === 0"
          class="absolute bottom-[4rem] left-[29.5rem] text-white"
        >
          There are no invoices
        </div>
        <InvoicesTable
          ref="invoiceTableRef"
          recent-invoice
          status="all"
          :status-progress-obj="invoicesStore.outputPendingBar"
          :invoice-list="invoicesStore.invoiceData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import InvoicesTable from "./Utils/InvoicesTable.vue";
import { useInvoicesStore } from "../stores/useInvoice"

import InvoicesAddNew from "./InvoicesAddNew.vue";
import InvoicesViewAll from "./InvoicesViewAll.vue";

const invoicesStore = useInvoicesStore()

let invoiceArr = ref([...invoicesStore.invoiceData]);

// focus btn ref
const viewAllBtnRef = ref(null);
const newInvoiceBtnRef = ref(null);

// component ref
const invoiceTableRef = ref(null);


function openModal(event) {
  if (event.target.textContent.trim() === "View All") {
    invoicesStore.showInvoicesViewAll()
  }
  if (event.target.textContent.trim() === "New Invoice")
    invoicesStore.updateAddInvoiceModalIsVisible(true)
}

/////////////////////////////
// Methods that changes the state of invoice table messages that are conditionally rendered
/////////////////////////////

function checkPendings() {
  const currentInvoiceData = invoicesStore.invoiceData;
  const index = currentInvoiceData.findIndex(
    (invoice) => invoice.status === "Pending"
  );

  if (index === -1) {
    invoicesStore.updateHasPending(false)
  }

  invoiceArr.value = [...invoicesStore.invoiceData];
}
function checkSuccess() {
  const currentInvoiceData = invoicesStore.invoiceData;
  const index = currentInvoiceData.findIndex(
    (invoice) => invoice.status === "Successful"
  );

  if (index !== -1) {
    invoicesStore.updateHasSuccess(true);
  } else {
    invoicesStore.updateHasSuccess(false);
  }

  invoiceArr.value = [...invoicesStore.invoiceData];
}

// BaseModal related code

const modalRef = ref(null)

onMounted(() => {
  checkPendings();
  checkSuccess();
  invoicesStore.updateLastInvoiceId();
});
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.amountError-enter-from,
.amountError-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.amountError-enter-to,
.amountError-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.amountError-enter-active,
.amountError-leave-active {
  transition: all 0.3s linear;
}
</style>
