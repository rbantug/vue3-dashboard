<template>
  <!-- Add new and edit subscription  -->

  <BaseModal
    :show="transferStore.addNewTransferModalIsVisible"
    @close="toggleModalNewTransfer"
    :dialog-custom-y-position="{
      'top-[20vh]': !transferStore.editTransferModalIsVisible,
      'top-[13vh]': transferStore.editTransferModalIsVisible,
    }"
    :disable-close-btn="transferStore.processNewSubscription"
    :close-btn-keyboard-trap="setModalCloseBtnKeyboardTrap"
    :close-btn-focus-on-popup="false"
    :aria-label-prop="!transferStore.editTransferModalIsVisible ? 'add new transfer' : 'edit existing transfer'"
    ref="baseModalRef"
  >
    <template #header>
      {{
        !transferStore.editTransferModalIsVisible
          ? "Add New Transfer"
          : "Edit Existing Transfer"
      }}
    </template>
    <template #default>
      <div
        class="w-full h-[28rem] bg-gray-900 rounded-md"
        :class="{
          'h-[28rem]': !transferStore.editTransferModalIsVisible,
          'h-[32rem]': transferStore.editTransferModalIsVisible && transferStore.editTransferOptions,
          'h-[28rem]': transferStore.editTransferModalIsVisible && !transferStore.editTransferOptions,
        }"
      >
        <!-- List of Subscriptions -->

        <ScheduledTransferList 
          v-if="transferStore.selectSubscription"
        />

        <!-- New Transfer Options -->
        <!-- Also reused when editing an existing transfer -->

        <ScheduledTransferOptions 
          v-if="transferStore.newTransferOptions || transferStore.editTransferOptions"
          @emit-create-carousel-subscription="createCarouselSubscription"
          ref="scheduledTransferOptionsRef"
        />

        <!-- Subscription Transaction Summary -->

        <ScheduledTransferSummary 
          v-if="transferStore.subTransactSummary"
        />

        <!-- Success Window -->
        <ScheduledTransferSuccess 
          v-if="transferStore.showSuccessWindow"
        />
      </div>

      <!-- Modal Bottom Buttons -->

      <div class="flex justify-center gap-x-2 mt-4 h-10">
        <button
          v-if="transferStore.newTransferOptions || transferStore.editTransferOptions"
          class="flex justify-center items-center py-2 pl-5 pr-3 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="subscriptionNextBtn"
          @keydown.enter.exact.stop.prevent="subscriptionNextBtn"
          @keydown.space.exact.stop.prevent="subscriptionNextBtn"
          @keydown.tab.exact="subscriptionNextBtnPreventDefault"
          aria-label="go to transfer summary page"
        >
          <span class="text-md">Next</span>
          <Icon icon="ic:round-navigate-next" class="h-7 w-7" />
        </button>
        <button
          v-if="transferStore.editTransferOptions"
          class="flex justify-center items-center py-2 pl-5 pr-3 bg-gray-900 text-red-400 rounded-lg outline-none hover:ring-1 focus-visible:ring-1 focus-visible:ring-red-400 hover:ring-red-400 hover:text-red-400 duration-300"
          @click="transferStore.openDeleteTransferModal()"
          @keypress.enter="transferStore.openDeleteTransferModal()"
          @keydown.tab.exact.prevent
          ref="deleteBtnRef"
          aria-label="delete transfer"
        >
          <span class="text-md">Delete</span>
          <Icon icon="material-symbols:delete-outline" class="h-5 w-7" />
        </button>
        <button
          v-if="transferStore.subTransactSummary && !transferStore.editTransferModalIsVisible && !transferStore.processNewSubscription"
          class="flex justify-center items-center py-2 px-6 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="addSubscription('submit')"
          @keydown.tab.exact.prevent
          aria-label="submit transaction"
        >
          <span class="text-md">Submit</span>
        </button>
        <button
          v-if="transferStore.subTransactSummary && transferStore.editTransferModalIsVisible && !transferStore.processNewSubscription"
          class="flex justify-center items-center py-2 px-6 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="addSubscription('update')"
          @keydown.tab.exact.prevent
        >
          <span class="text-md">Update</span>
        </button>
        <div
          v-if="transferStore.subTransactSummary && transferStore.processNewSubscription"
          class="flex justify-center items-center py-2 px-6 gap-x-2 bg-gray-900 text-gray-200 rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @keydown.tab.exact.prevent
          tabindex="0"
          ref="processingBtnRef"
          aria-label="processing transfer"
        >
          <Icon icon="eos-icons:loading" class="h-6 w-6" />
          <span class="text-md">Processing...</span>
        </div>
      </div>
    </template>
  </BaseModal>

  <!-- Main Component -->

  <div class="flex">
    <div
      class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full p-5 mr-5"
    >
      <!-- title and button -->
      <div class="flex justify-between items-center w-full mb-4">
        <h2 class="text-white">Scheduled Transfer</h2>
        <button
          class="flex items-center gap-x-1 p-2 bg-gray-700 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="toggleModalNewTransfer"
          ref="addNewBtnRef"
          aria-label="add new scheduled transfer"
        >
          <Icon icon="ic:baseline-plus" class="h-4 w-4" />
          <span class="text-sm ml-1">Add New</span>
        </button>
      </div>

      <!-- Subscriptions Carousel -->

      <div class="mb-4 mx-auto w-[21rem]">
        <carousel
          :items-to-show="outputCarouselItemsToShow"
          snap-align="start"
          item
          class="flex justify-center"
        >
          <slide
            v-for="(sub, index) in carouselSubscription"
            :key="index"
            class="flex flex-col justify-start gap-y-4 py-2 rounded-xl overflow-hidden outline-none bg-gray-700 duration-300"
            :class="{
              'cursor-pointer hover:bg-indigo-500 scale-90 hover:scale-100 focus-visible:bg-indigo-500 focus-visible:scale-100':
                editTransferEnabled,
              'scale-95': !editTransferEnabled,
            }"
            style="width: 7rem"
            @click="selectEditTransfer(sub)"
            @keydown.enter.exact.stop.prevent="selectEditTransfer(sub)"
            @keydown.space.exact.stop.prevent="selectEditTransfer(sub)"
            @keydown.escape.exact.stop.prevent="cancelEditTransfer"
            :tabindex="editTransferEnabled ? 0 : -1"
            ref="carouselRefList"
          >
            <div
              class="absolute bg-gray-500 h-[3rem] w-[10rem] top-[-1rem]"
            ></div>
            <img
              :src="sub.icon2 || sub.icon1"
              :alt="sub.company"
              class="flex justify-center h-5 w-16 object-contain z-0"
            />
            <span class="text-white text-xs font-bold"
              >${{
                sub.billing === "Monthly" ? sub.amountMonth : sub.amountYear
              }}/{{ sub.billing === "Monthly" ? "month" : "year" }}</span
            >
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>

      <!-- Edit Button -->

      <div class="flex w-40">
        <button
          class="flex justify-center w-full py-2 bg-gray-700 text-white text-sm rounded-xl outline-none duration-200"
          :class="{
            'bg-indigo-400 text-black font-bold hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white':
              editTransferEnabled,
            'hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white':
              !editTransferEnabled,
          }"
          @click="startEditTransfer"
          @keydown.enter.exact.stop.prevent="startEditTransfer"
          @keydown.space.exact.stop.prevent="startEditTransfer"
          ref="editBtnRef"
          :aria-label="editTransferBtnLabel"
        >
          {{ editTransferBtnLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, defineAsyncComponent } from "vue";
import { Icon } from "@iconify/vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import BaseModal from "./Base Components/BaseModal.vue";
import { toast } from "vue3-toastify";
import { getRandomNumber } from "../composables-and-reusable-logic/getRandomNumber";

import { useTransferStore } from "../stores/useTransfer"
import { useNotificationStore } from "../stores/useNotification";

const ScheduledTransferList = defineAsyncComponent(() => import('./ScheduledTransferList.vue'))
const ScheduledTransferOptions = defineAsyncComponent(() => import('./ScheduledTransferOptions.vue'))
const ScheduledTransferSummary = defineAsyncComponent(() => import('./ScheduledTransferSummary.vue'))
const ScheduledTransferSuccess = defineAsyncComponent(() => import('./ScheduledTransferSuccess.vue'))

const transferStore = useTransferStore();
const notificationStore = useNotificationStore()

// Component Refs
const scheduledTransferOptionsRef = ref(null)

// Refs for focusing elements
const addNewBtnRef = ref(null);
const editBtnRef = ref(null);
const baseModalRef = ref(null);
const deleteBtnRef = ref(null);
const processingBtnRef = ref()

const carouselSubscription = ref([]);

const setModalCloseBtnKeyboardTrap = ref(false)

/////////////////////////////////////
// Add New Transfer
/////////////////////////////////////

function toggleModalNewTransfer() {
  // prevent the keyboard trap on the close button in the modal. The keyboard trap is for the success window at the end of the new transfer process. 
  setModalCloseBtnKeyboardTrap.value = false

  // prevent modal from being closed while the new transfer/subscription is being processed
  if (transferStore.processNewSubscription) return;

  // Edit transfer button will be reverted back to its default state
  if (editTransferEnabled.value) {
    editTransferEnabled.value = false;
  }

  // toggle add new subscription modal visibility
  transferStore.updateAddNewTransferModalIsVisible(!transferStore.addNewTransferModalIsVisible)

  // reset ALL state inside add new AND edit subscription modal
  transferStore.updateTempSelectedSubscription(null);
  transferStore.updateSelectSubscription(true);
  transferStore.updateNewTransferOptions(false);
  transferStore.updateSubTransactSummary(false);
  transferStore.updateShowSuccessWindow(false);

  transferStore.updateNSBilling('Monthly')
  transferStore.updateMonthConditional(transferStore.currentMonth !== 11 ? transferStore.currentMonth + 1 : 0)

  transferStore.updateDurationYear(transferStore.currentYear)
  transferStore.updateDurationErrorMonth(false)
  transferStore.updateDurationErrorYear(false)
  transferStore.updateDurationErrorCurrentYear(false)
  transferStore.updateCheckboxState(false)
  transferStore.updateReminderChoice("one day")
  transferStore.updateDescriptionVmodel(null)
  transferStore.updatePaymentNetworkVModel(transferStore.paymentMethodArr[0])

  if(transferStore.addNewTransferModalIsVisible) {
    nextTick(() => {
      transferStore.outputFirstTransfer.focus()
    })
  }

  if(!transferStore.addNewTransferModalIsVisible) {
    addNewBtnRef.value.focus()
  }

  if(transferStore.editTransferModalIsVisible) {
    editBtnRef.value.focus()
  }

  // edit subscription related states
  transferStore.updateEditTransferModalIsVisible(false);
  transferStore.updateEditTransferOptions(false);
}

function createCarouselSubscription() {
  carouselSubscription.value = [];
  transferStore.currentSubscription.forEach((sub) => {
    let index = transferStore.allCompanies.findIndex(
      (company) => company.company === sub.company
    );
    carouselSubscription.value.push({
      ...transferStore.allCompanies[index],
      billing: sub.billing,
    });
  });
}

const outputCarouselItemsToShow = computed(() => {
  if (carouselSubscription.value.length > 3) {
    return 3;
  } else {
    return carouselSubscription.value.length;
  }
});

//////////////////////////
// Next Button
//////////////////////////

function subscriptionNextBtnPreventDefault(e) {
  if (!transferStore.editTransferOptions) {
    e.preventDefault();
    return;
  }
}

function subscriptionNextBtn() {
  transferStore.updateDurationErrorYear(false)
  transferStore.updateDurationErrorMonth(false)
  transferStore.updateDurationErrorCurrentYear(false)

  // show error message for invalid year
  if (transferStore.durationYear < transferStore.currentYear) {
    transferStore.updateDurationErrorYear(true)
    return;
  }

  // show error message for selecting a date that is less than a month

  if(!transferStore.editTransferModalIsVisible) {
    transferStore.updateDurationMonth(transferStore.monthArr[transferStore.monthConditional])
  }

  const durationInMilliseconds = Date.parse(
    `${transferStore.currentDate.getDate()} ${transferStore.durationMonth} ${transferStore.durationYear}`
  );

  const monthToMillliseconds = 2629800000;

  const tempTDM = Math.round(
    (durationInMilliseconds - transferStore.currentDate) / monthToMillliseconds
  );
  transferStore.updateTotalDurationMonths(tempTDM)

  if (transferStore.totalDurationMonths < 1) {
    transferStore.updateDurationErrorMonth(true)
    return;
  }

  // show error when billing cycle is yearly and user chose the current year
  if (transferStore.newSubBilling === "Yearly" && transferStore.durationYear === transferStore.currentYear) {
    transferStore.updateDurationErrorCurrentYear(true)
    return;
  }

  // if billing cycle is per month and client opted to subscribe for a year or more, show a dialog box to inform client that they can choose to pay per year at a discounted price

  if (transferStore.newSubBilling === "Monthly" && transferStore.totalDurationMonths > 11) {
    transferStore.updateWarningModalIsVisible(true)
    return;
  }

  // Go to subscription transcription summary (Next page)
  if (!transferStore.editTransferModalIsVisible) {
    transferStore.updateNewTransferOptions(false)
  } else {
    transferStore.updateEditTransferOptions(false)
  }
  transferStore.updateSubTransactSummary(true)
  nextTick(() => {
    transferStore.backBtnSummaryWindowRef.focus()
  })
}

/////////////////////
// Subscription Summary Page
/////////////////////

function addSubscription(type) {
  transferStore.updateProcessNewSubscription(true)
  nextTick(() => processingBtnRef.value.focus())

  function getSubEndDate() {
    if (transferStore.newSubBilling === "Monthly") {
      return Date.parse(
        `${transferStore.currentDate.getDate()} ${transferStore.durationMonth} ${transferStore.durationYear}`
      );
    }

    if (transferStore.newSubBilling === "Yearly") {
      return Date.parse(
        `${transferStore.currentDate.getDate()} ${transferStore.monthArr[transferStore.currentDate.getMonth()]} ${
          transferStore.durationYear
        }`
      );
    }
  }

  setTimeout(() => {
    let notificationMsg = ''
    const data = {
      company: transferStore.tempSelectedSubscription.company,
      billing: transferStore.newSubBilling,
      subStartDate: Date.now(),
      subEndDate: getSubEndDate(),
      reminderIsActive: transferStore.checkboxState,
      reminderMsg: !transferStore.checkboxState ? "none" : transferStore.reminderChoice,
      description: transferStore.descriptionVmodel,
      paymentMethodId: transferStore.paymentNetworkVModel.id,
    }

    if(type === 'submit') {
      transferStore.currentSubscription.unshift(data);
      notificationMsg = `${transferStore.tempSelectedSubscription.company} was added to your scheduled transfer`
    }

    if(type === 'update') {
      const index = transferStore.currentSubscription.findIndex(sub => sub.company === transferStore.tempSelectedSubscription.company)
      transferStore.currentSubscription[index] = data
      notificationMsg = `${transferStore.tempSelectedSubscription.company} subscription details were updated. ` 
    }

    transferStore.updateSubTransactSummary(false)
    transferStore.updateProcessNewSubscription(false)
    transferStore.updateShowSuccessWindow(true)
    setModalCloseBtnKeyboardTrap.value = true
    baseModalRef.value?.closeBtnRef.focus()

    createCarouselSubscription();

    // Toast and Notification
    toast.success(
      notificationMsg,
      {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
        transition: toast.TRANSITIONS.SLIDE,
      }
    );

    const notificationId =
      notificationStore.lastNotificationId + Math.floor(getRandomNumber(1, 500));
    notificationStore.updateNotifications({
      id: notificationId,
      type: "transfer",
      status: "successful",
      company: transferStore.tempSelectedSubscription.company,
      message: notificationMsg,
      showCancelBtn: false,
      showRemoveBtn: true,
    });
    notificationStore.updateLastNotificationId(notificationId);
  }, 5000);
}

/////////////////////////////////////
// Edit and Remove Transfer
/////////////////////////////////////

// Edit Transfer

const editTransferEnabled = ref(false);
const carouselRefList = ref([])

const editTransferBtnLabel = computed(() => {
  if(!editTransferEnabled.value) {
    return "Edit Transfer"
  } else {
    return "Cancel Edit"
  }
})

function startEditTransfer(e) {
  editTransferEnabled.value = !editTransferEnabled.value;

  if(editTransferEnabled.value) {
    carouselRefList.value[0].$el.focus()
  }
}

function cancelEditTransfer() {
  editTransferEnabled.value = false
  editBtnRef.value.focus()
}

function selectEditTransfer(sub) {
  if (!editTransferEnabled.value) return;

  transferStore.updateTempSelectedSubscription(sub);

  const selectedSubscriptionInfo = transferStore.currentSubscription.find(
    (comp) => comp.company === sub.company
  );

  // Start Date
  const startDate = new Date(selectedSubscriptionInfo.subStartDate);

  transferStore.updateStartMonthAndYear(transferStore.monthArr[startDate.getMonth()], startDate.getFullYear())

  // Billing Cycle
  transferStore.updateNSBilling(selectedSubscriptionInfo.billing)

  if(selectedSubscriptionInfo.billing === 'Monthly') {
    transferStore.updateBillingMonthlyAriaChecked(true)
    transferStore.updateBillingYearlyAriaChecked(false)
  }

  if(selectedSubscriptionInfo.billing === 'Yearly') {
    transferStore.updateBillingMonthlyAriaChecked(false)
    transferStore.updateBillingYearlyAriaChecked(true)
  }

  // Duration
  const endDate = new Date(selectedSubscriptionInfo.subEndDate);

  transferStore.updateDurationMonthEditTransfer(endDate.getMonth())
  transferStore.updateDurationMonth(transferStore.monthArr[transferStore.durationMonthEditTransfer])
  transferStore.updateDurationYear(endDate.getFullYear());
  transferStore.durationYearNotVModel = transferStore.durationYear

  // Reminder
  transferStore.updateCheckboxState(selectedSubscriptionInfo.reminderIsActive);

  transferStore.updateReminderIndex(transferStore.reminderOptions.findIndex(
    (reminder) => reminder === selectedSubscriptionInfo.reminderMsg
  ))

  // Description
  transferStore.updateDescriptionVmodel(selectedSubscriptionInfo.description)

  // Payment Method
  const getPaymentMethodObj = transferStore.paymentMethodArr.find(
    (pay) => pay.id === selectedSubscriptionInfo.paymentMethodId
  );

   transferStore.updatePaymentNetworkVModel(getPaymentMethodObj)

  // Set State
  transferStore.updateAddNewTransferModalIsVisible(true)
  transferStore.updateSelectSubscription(false)
  transferStore.updateEditTransferModalIsVisible(true)
  transferStore.updateEditTransferOptions(true)
  editTransferEnabled.value = false;

  nextTick(() => {
    transferStore.monthlyBtnRef.focus()
  })
}

onMounted(() => {
  carouselRefList.value = []
  createCarouselSubscription();
  transferStore.getDeleteBtnRef(deleteBtnRef.value)
});
</script>

<style>
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: white;
}

.carousel__next:hover,
.carousel__prev:hover {
  outline: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width))
    white;
  color: white;
  border-radius: 10px;
}

.carousel__next:focus-visible,
.carousel__prev:focus-visible {
  outline: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width))
    white;
  color: white;
  border-radius: 10px;
}

.carousel__prev {
  left: -35px;
}

.carousel__next {
  right: -35px;
}

.durationError-enter-from,
.durationError-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.durationError-enter-active,
.durationError-leave-active {
  transition: all 0.3s ease;
}

.durationError-enter-to,
.durationError-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
