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
  <!-- <BaseModal
    :show="addInvoiceModalIsVisible"
    ariaLabelProp="add new invoice."
    dialogCustomHeight="h-[28rem]"
    dialogCustomWidth="w-[20rem]"
    @close="closeModal"
  >
    <template #header>Add New Invoice</template>
    <template #default>
      <div class="flex flex-col justify-center items-center">
        <div class="w-[90%] bg-gray-900 rounded-xl">
          <div
            class="flex flex-col items-start justify-center mx-auto gap-y-4 mt-6 mb-6 w-[80%]"
          >
            <div class="flex flex-col items-start gap-y-1">
              <label for="input-client" class="text-white text-sm"
                >Client Name</label
              >
              <BaseCombobox
                :data-list="dashboard.clientList"
                icon-position="right"
                icon-code="majesticons:chevron-down-line"
                combobox-width="w-[13.5rem]"
                :combobox-styling="comboboxStyling"
                :input-box-styling="inputBoxStyling"
                :button-styling="buttonStyling"
                icon-color="text-gray-600"
                prop-to-show="name"
                @emit-selected-option="updateSelectedOption"
                ref="comboboxRef"
              >
                <template v-slot:comboboxItem="slotObj">
                  <img
                    :src="slotObj.slotData.photo"
                    alt="client photo"
                    class="object-fit rounded-full h-7 w-7"
                    aria-hidden="true"
                  />
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': slotObj.textStyling,
                      'font-normal': !slotObj.textStyling,
                    }"
                  >
                    {{ slotObj.slotData.name }}
                  </span>
                </template>
              </BaseCombobox>
            </div>
            <div class="flex flex-col items-start gap-y-1 w-full relative">
              <label for="input-date" class="text-white text-sm">Date</label>
              <div class="flex flex-col gap-y-2">
                <input
                  id="input-date"
                  class="w-[11rem] rounded-md py-1 px-2 bg-gray-200 hover:ring-1 hover:ring-white focus-visible:border focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/50 duration-300"
                  type="date"
                  v-model="dateFormData"
                  @click="showDateErrorMsg = false"
                  @focus="showDateErrorMsg = false"
                />
              </div>
              <Transition>
                <div
                  v-if="showDateErrorMsg"
                  class="absolute left-[6rem] top-[4rem] text-sm text-red-400 duration-300"
                  role="alert"
                >
                  Invalid Date
                </div>
              </Transition>
            </div>

            <div class="flex flex-col items-start gap-y-1 w-full relative">
              <label for="input-amount" class="text-white text-sm"
                >Amount</label
              >
              <input
                id="input-amount"
                class="w-[11rem] rounded-md py-1 px-2 bg-gray-200 hover:ring-1 hover:ring-white focus-visible:border focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/50 duration-300"
                type="number"
                v-model="amountFormData"
                @click="showAmountErrorMsg = false"
                @focus="showAmountErrorMsg = false"
              />
              <Transition name="amountError">
                <div
                  v-if="showAmountErrorMsg"
                  class="absolute left-[6rem] top-[4rem] text-sm text-red-400 duration-300"
                  role="alert"
                >
                  Please add an amount
                </div>
              </Transition>
            </div>
            <button
              class="flex p-2 text-sm bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
              @keydown.tab.exact.prevent
              @click="formSubmit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal> -->

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
import BaseModal from "./Base Components/BaseModal.vue";
import BaseCombobox from "./Base Components/BaseCombobox.vue";
import InvoicesTable from "./Utils/InvoicesTable.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getRandomNumber } from "../composables-and-reusable-logic/getRandomNumber";
import { useDashboardStore } from "../stores/useDashboard";
import { useInvoicesStore } from "../stores/useInvoice"

import InvoicesAddNew from "./InvoicesAddNew.vue";
import InvoicesViewAll from "./InvoicesViewAll.vue";

const dashboard = useDashboardStore();
const invoicesStore = useInvoicesStore()

let invoiceArr = ref([...invoicesStore.invoiceData]);

const addInvoiceModalIsVisible = ref(false);

// focus btn ref
const viewAllBtnRef = ref(null);
const newInvoiceBtnRef = ref(null);

// component ref
const invoiceTableRef = ref(null);

// conditional styling for pending invoices
const hasPending = ref(null);

// conditional styling for successful invoices
const hasSuccess = ref(null);

/* // v-model and form submission method
const dateFormData = ref("");
const amountFormData = ref(0);

// state for error messages when adding new invoices for date and amount
const showDateErrorMsg = ref(false);
const showAmountErrorMsg = ref(false); */

////////////////////////////////
// Headless UI Combobox
////////////////////////////////

/* const comboboxStyling = ref(
  "bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
); */

const comboboxStyling = "bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2";

const inputBoxStyling = "py-2 pl-3 pr-10 leading-5 text-gray-900";

const buttonStyling = 'px-2 focus:bg-gray-400/20"';

let selected = ref();

function updateSelectedOption(val) {
  selected.value = val
}

/* const comboboxRef = ref()

let newId;

function formSubmit() {
  const currentDate = new Date();
  const currentDateInMilliseconds = Date.parse(currentDate);
  const selectedDateArray = dateFormData.value.split("-");
  const selectedDateToMilliseconds =
    Date.parse(
      `${selectedDateArray[0]} ${selectedDateArray[1]} ${
        selectedDateArray[2]
      } ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    ) + 10000;

  if (selectedDateToMilliseconds < currentDateInMilliseconds) {
    showDateErrorMsg.value = true;
    return;
  }

  if (!dateFormData.value) {
    showDateErrorMsg.value = true;
    return;
  }

  if (!amountFormData.value || amountFormData.value <= 0) {
    showAmountErrorMsg.value = true;
    return;
  }

  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const lastId = dashboard.lastInvoiceId;

  newId = lastId + Math.floor(getRandomNumber(0, 500));

  dashboard.lastInvoiceId = newId;

  const newDate = new Date(dateFormData.value);

  comboboxRef.value?.runEmit()

  const data = {
    id: newId,
    date: `${
      monthArr[newDate.getMonth()]
    } ${newDate.getDate()}, ${newDate.getFullYear()}`,
    client: selected.value.name,
    clientPhoto: selected.value.photo,
    amount: amountFormData.value,
    status: "Pending",
  };
  dashboard.updateInvoices(data);
  closeModal();
  invoiceArr.value = [...dashboard.invoiceData];
  let notificationId =
    dashboard.lastNotificationId + Math.floor(getRandomNumber(0, 500));
  runPendingInvoiceBar(`${newId}`, notificationId);
  refInvoiceTable.value?.updateInvoiceArr();
  hasPending.value = true;

  // Add notification for pending invoices

  function addNotifyInvoice() {
    toast.info(`Invoice #${newId} is being processed`, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
      transition: toast.TRANSITIONS.SLIDE,
    });

    dashboard.updateNotifications({
      id: notificationId,
      type: "invoice",
      status: "pending",
      message: `Invoice #${newId} is being processed`,
      showCancelBtn: true,
      invoiceId: newId,
    });
    dashboard.updateLastNotificationId(notificationId);
  }

  addNotifyInvoice();
  dateFormData.value = "";
  amountFormData.value = 0;
} */

function openModal(event) {
  if (event.target.textContent.trim() === "View All") {
    invoicesStore.showInvoicesViewAll()
  }
  if (event.target.textContent.trim() === "New Invoice")
    invoicesStore.updateAddInvoiceModalIsVisible(true)
}

/* function closeModal(emitData) {
  dashboard.closeInvoicesViewAll();
  addInvoiceModalIsVisible.value = false;
  showDateErrorMsg.value = false;
  showAmountErrorMsg.value = false;

  if (emitData === "add new invoice.") {
    dateFormData.value = "";
    amountFormData.value = 0;
    refNewInvoiceBtn.value.focus();
  }

  if (emitData === "all invoices") {
    refViewAllBtn.value.focus();
  }
} */

/////////////////////////////
// Pending Invoices status progress bar
/////////////////////////////

/* const outputPendingBar = ref({
  addNewProp(name) {
    this[name] = 0;
    this[`${name}SI`] = null;
    this[`${name}ST`] = null;
    this[`${name}invoiceId`] = name;
    this[`${name}notificationId`] = null;
  },
  removeProp(name) {
    delete this[name];
    delete this[`${name}SI`];
    delete this[`${name}ST`];
    delete this[`${name}invoiceId`];
  },
}); */

/* function runPendingInvoiceBar(propId, notificationId) {
  //outputPendingBar.value.addNewProp(propId);
  invoicesStore.updateOPBAddNewProp(propId)
  let tempTime = 10000;

  //outputPendingBar.value[`${propId}notificationId`] = notificationId;
  invoicesStore.updateOPBPropValue(`${propId}notificationId`, notificationId)

  //outputPendingBar.value[`${propId}SI`] =
  invoicesStore.updateOPBPropValue(`${propId}SI`, setInterval(() => {
    tempTime = getRandomNumber(5000, 10000);
    //outputPendingBar.value[propId] += 25;
    invoicesStore.updateOPBPropValue(propId, invoicesStore.outputPendingBar[propId] + 25)
    if (invoicesStore.outputPendingBar[propId] >= 100) {
      clearInterval(invoicesStore.outputPendingBar[`${propId}SI`]);
      invoicesStore.updateOPBPropValue(`${propId}ST`, setTimeout(() => {
        const getIndex = invoiceArr.value.findIndex((el) => el.id == propId);
        invoiceArr.value[getIndex].status = "Successful";
        hasSuccess.value = true
        //outputPendingBar.value.removeProp(propId)

        // state management for "There are no pending invoices" message in All Invoices modal
        checkPendings();

        // Add toast and notification for successful invoice

        toast.success(
          `Invoice #${
            invoicesStore.outputPendingBar[`${propId}invoiceId`]
          } was successfully processed`,
          {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark",
            transition: toast.TRANSITIONS.SLIDE,
          }
        );

        // If the pending notification was deleted before we get the successful notification, the successful notification will push through.
        const checkIfCurrentNotificationExist =
          dashboard.notifications.findIndex(
            (notify) => notify.id === notificationId
          );

        if (checkIfCurrentNotificationExist !== -1) {
          dashboard.updateNotifyCancelBtn(notificationId);
        }

        const newNotificationId =
          dashboard.lastNotificationId + Math.floor(getRandomNumber(0, 500));

        dashboard.updateNotifications({
          id: newNotificationId,
          type: "invoice",
          status: "successful",
          message: `Invoice #${
            invoicesStore.outputPendingBar[`${propId}invoiceId`]
          } was successfully processed`,
          showCancelBtn: false,
          invoiceId: newId,
        });
        dashboard.updateLastNotificationId(newNotificationId);

        // remove pending notification after showing the successful notification
        dashboard.removeNotification(
          invoicesStore.outputPendingBar[`${propId}notificationId`]
        );

        invoicesStore.OPBRemoveProp(propId)
      }, 1000))
    }
  }, tempTime))

  //dashboard.updateOutputPendingBar(outputPendingBar.value);
} */

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

function focusModalCloseBtn() {
  modalRef.value?.focusCloseBtn()
}

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
