<template>
  <BaseModal
    :show="invoicesStore.addInvoiceModalIsVisible"
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
                :data-list="invoicesStore.clientList"
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
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "./Base Components/BaseModal.vue";
import BaseCombobox from "./Base Components/BaseCombobox.vue";
import { getRandomNumber } from "../composables-and-reusable-logic/getRandomNumber";
import { toast } from "vue3-toastify";

import { useInvoicesStore } from "../stores/useInvoice";
import { useDashboardStore } from "../stores/useDashboard";

const invoicesStore = useInvoicesStore();
const dashboard = useDashboardStore();

const props = defineProps({
  newInvoiceBtnRef: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(['runCheckPendings'])

// v-model and form submission method
const dateFormData = ref("");
const amountFormData = ref(0);

// state for error messages when adding new invoices for date and amount
const showDateErrorMsg = ref(false);
const showAmountErrorMsg = ref(false);

const comboboxStyling =
  "bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2";

const inputBoxStyling = "py-2 pl-3 pr-10 leading-5 text-gray-900";

const buttonStyling = 'px-2 focus:bg-gray-400/20"';

function closeModal() {
  invoicesStore.closeInvoicesViewAll();
  invoicesStore.updateAddInvoiceModalIsVisible(false);
  showDateErrorMsg.value = false;
  showAmountErrorMsg.value = false;
  dateFormData.value = "";
  amountFormData.value = 0;
  props.newInvoiceBtnRef.focus();
}

const selected = ref();

function updateSelectedOption(val) {
  selected.value = val;
}

const invoiceArr = ref([...invoicesStore.invoiceData]);

const comboboxRef = ref();

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

  const lastId = invoicesStore.lastInvoiceId;

  newId = lastId + Math.floor(getRandomNumber(0, 500));

  invoicesStore.updateLastInvoiceIdFormSubmit(newId);

  const newDate = new Date(dateFormData.value);

  comboboxRef.value?.runEmit();

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
  invoicesStore.updateInvoices(data);
  closeModal();
  invoiceArr.value = [...invoicesStore.invoiceData];
  let notificationId =
    dashboard.lastNotificationId + Math.floor(getRandomNumber(0, 500));
  runPendingInvoiceBar(`${newId}`, notificationId);
  //refInvoiceTable.value?.updateInvoiceArr();
  invoicesStore.updateHasPending(true);

  // Add notification for pending invoices

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

  dateFormData.value = "";
  amountFormData.value = 0;
}

function runPendingInvoiceBar(propId, notificationId) {
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
        invoicesStore.updateHasSuccess(true)
        //outputPendingBar.value.removeProp(propId)

        // state management for "There are no pending invoices" message in All Invoices modal
        emits('runCheckPendings')
        //checkPendings();

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
}
</script>
