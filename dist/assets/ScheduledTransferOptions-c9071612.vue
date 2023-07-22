<template>
  <div>
    <div class="flex flex-col justify-center items-center w-full relative">
      <button
        v-if="!transferStore.editTransferOptions"
        class="flex items-center gap-x-2 pr-2 text-white hover:cursor-pointer absolute top-4 left-6"
        @click="backBtnNewTransfer"
        @keydown.enter.exact.stop.prevent="backBtnNewTransfer"
        @keydown.space.exact.stop.prevent="backBtnNewTransfer"
        aria-label="go back to the list of subscriptions"
        ref="backBtnRef"
      >
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          class="h-5 w-5"
        />
        <span>Back</span>
      </button>
      <div
        class="flex justify-center items-center mt-4 w-32 h-15 rounded-md bg-gray-500"
      >
        <img
          class="object-scale-down h-12 w-24"
          :src="getImgUrl(transferStore.tempSelectedSubscription.icon1)"
          alt=""
          aria-hidden="true"
        />
      </div>
      <h1 class="flex flex-col items-center text-white" aria-live="assertive">
        <span>{{ transferStore.tempSelectedSubscription.company }}</span>
        <span class="text-xl font-bold"
          >${{ transferStore.outputPrice }} per {{ transferStore.outputBillingText }}</span
        >
        <template v-if="transferStore.editTransferModalIsVisible">
        <span
          >Start date: {{ transferStore.startMonthAndYear.month }}
          {{ transferStore.startMonthAndYear.year }}</span
        >
        <span v-if="transferStore.editTransferModalIsVisible"
          >End date: {{ transferStore.monthArr[transferStore.durationMonthEditTransfer] }}
          {{ transferStore.durationYearNotVModel }}</span>
        </template>
      </h1>
      <div class="flex w-[90%]">
        <div class="flex flex-col w-full mt-10 text-white gap-y-4">
          <!-- Billing Cycle -->

          <div class="flex items-center gap-x-2">
            <div>Billing Cycle</div>
            <div
              class="flex justify-center items-center gap-x-2 w-[10rem] h-9 bg-gray-500 shadow shadow-gray-500 rounded-md relative"
            >
              <button
                class="h-7 w-[4.5rem] outline-none rounded-lg focus-visible:ring focus-visible:ring-white/50 z-10"
                :class="{ 'text-gray-700': billingIsYearly }"
                @click="changeBilling"
                @keydown.enter.exact.stop.prevent="changeBilling"
                @keydown.space.exact.stop.prevent="changeBilling"
                ref="monthlyBtnRef"
                :aria-checked="transferStore.billingMonthlyAriaChecked"
                aria-label="Billing Cycle Monthly"
                role="switch"
              >
                Monthly
              </button>
              <button
                class="h-7 w-[4.5rem] outline-none rounded-lg focus-visible:ring focus-visible:ring-white/50 z-10"
                :class="{ 'text-gray-700': billingIsMonthly }"
                @click="changeBilling"
                @keydown.enter.exact.stop.prevent="changeBilling"
                @keydown.space.exact.stop.prevent="changeBilling"
                ref="yearlyBtnRef"
                :aria-checked="transferStore.billingYearlyAriaChecked"
                aria-label="Billing Cycle Yearly"
                role="switch"
              >
                Yearly
              </button>
              <div
                class="absolute h-7 w-[4.5rem] rounded-md bg-green-800 shadow shadow-black/60 duration-300 z-1 pointer-events-none"
                :class="{
                  'left-[0.25rem]': billingIsMonthly,
                  'left-[5.25rem]': billingIsYearly,
                }"
              ></div>
            </div>
          </div>

          <!-- Duration -->
          <div class="flex gap-x-2 items-center h-16">
            <div>Duration</div>
            <div>
              <div class="flex items-center gap-x-2 relative">
                <HeadlessUIListBox
                  v-if="transferStore.newSubBilling === 'Monthly'"
                  :data-prop="transferStore.monthArr"
                  :current-month="
                    transferStore.editTransferModalIsVisible
                    ? transferStore.durationMonthEditTransfer
                      : transferStore.monthConditional
                  "
                  @emit-data="updateDurationMonth"
                  aria-label-prop="Transfer duration, month."
                  width-prop="w-[8.5rem]"
                />
                <input
                  type="number"
                  class="w-20 h-9 pl-2 rounded-lg text-gray-900 text-sm focus:outline-none border-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 shadow-md duration-300"
                  v-model="transferStore.durationYear"
                  aria-label="Transfer duration, year."
                />
              </div>
              <Transition name="durationError">
                <div
                  v-if="transferStore.durationErrorYear"
                  class="pt-1 text-sm text-red-500 font-bold absolute"
                  role="alert"
                >
                  Invalid Year
                </div>
              </Transition>
              <Transition name="durationError">
                <div
                  v-if="transferStore.durationErrorCurrentYear"
                  class="pt-1 text-sm text-red-500 font-bold absolute"
                  role="alert"
                >
                  You can't choose the current year
                </div>
              </Transition>
              <Transition name="durationError">
                <div
                  v-if="transferStore.durationErrorMonth"
                  class="pt-1 text-sm text-red-500 font-bold absolute"
                  role="alert"
                >
                  Invalid Date
                </div>
              </Transition>
            </div>
          </div>

          <!-- Reminder -->

          <div class="flex items-center gap-x-2 h-8">
            <label for="reminder">Reminder</label>
            <input
              id="reminder"
              type="checkbox"
              v-model="transferStore.checkboxState"
              class="rounded focus:outline-none text-green-600 border-gray-300 focus-visible:ring-green-600 checked:ring-green-600 empty:ring-green-600 peer duration-300"
            />
            <HeadlessUIListBox
              v-if="transferStore.checkboxState"
              aria-label-prop="reminder options"
              :data-prop="transferStore.reminderOptions"
              :reminder-index="transferStore.reminderIndex"
              width-prop="w-[8rem]"
              @emit-data="updateReminderChoice"
            />
          </div>

          <!-- Description -->

          <div>
            <label for="description" class="flex items-center gap-x-1">
              <div>Description</div>
              <span class="text-xs">(optional)</span>
            </label>

            <textarea
              name=""
              id="description"
              cols="30"
              rows="2"
              class="mt-2 rounded-lg text-gray-900 text-sm focus:outline-none border-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 shadow-md resize-none duration-300"
              v-model="transferStore.descriptionVmodel"
            ></textarea>
          </div>
        </div>

        <!-- Payment Method -->

        <div class="mt-10">
          <div class="text-white mb-2">Payment Method</div>
          <div class="flex flex-col gap-y-2">
            <ul class="flex flex-col gap-y-2">
              <template v-for="card of transferStore.paymentMethodArr" :key="card.id">
                <div class="relative">
                  <input
                    type="radio"
                    :id="card.id"
                    name="paymentNetwork"
                    class="absolute opacity-0 peer"
                    :value="card"
                    v-model="transferStore.paymentNetworkVModel"
                    :aria-label="ariaLabelPaymentMethod(card)"
                  />
                  <div :id="card.id" hidden></div>
                  <label
                    :for="card.id"
                    class="absolute w-[15rem] h-[5rem] z-10 hover:cursor-pointer"
                  >
                  </label>
                  <div
                    class="relative top-5 left-3 peer-checked:visible invisible"
                  >
                    <Icon
                      icon="material-symbols:check-circle-outline-rounded"
                      class="absolute w-8 h-8 text-white z-30"
                    />
                    <div
                      class="absolute w-6 h-6 rounded-full bg-green-900 left-1 top-1 z-20"
                    ></div>
                  </div>
                  <div
                    class="relative flex justify-end items-center w-[15rem] p-3 border-2 border-gray-400 rounded-lg focus-visible:border-white peer-checked:border-white duration-300"
                  >
                    <div
                      class="flex justify-center items-center w-10 h-10 bg-white rounded"
                    >
                      <Icon
                        :icon="
                          card.paymentNetwork === 'Visa'
                            ? 'cib:cc-visa'
                            : 'ri:mastercard-line'
                        "
                        class="h-8 w-8 text-gray-400"
                      />
                    </div>
                    <div class="flex flex-col text-white ml-3">
                      <span>**** {{ outputLast4CardNum(card) }}</span>
                      <span>Expires on {{ card.expireDate }}</span>
                    </div>
                    <div v-if="card.current">
                      <div
                        class="absolute bottom-[3.75rem] right-[0.5rem] w-20 h-6 text-center bg-green-700/20 text-green-400 border-2 border-green-400 rounded-xl text-sm px-2 z-20"
                      >
                        Current
                      </div>
                      <div
                        class="absolute bottom-[3.75rem] right-[0.5rem] w-20 h-6 bg-gray-900 rounded-xl z-10"
                      ></div>
                    </div>
                  </div>
                </div>
              </template>
            </ul>
            <a
              href="#"
              class="ring-2 ring-gray-400 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:ring-2 hover:ring-white text-gray-300 hover:text-white focus-visible:text-white duration-300"
            >
              <div
                class="relative flex justify-end items-center w-[15rem] h-[4.5rem] p-3 rounded-lg"
              >
                <Icon
                  icon="iconamoon:sign-plus-bold"
                  class="absolute left-3 w-12 h-12 z-20"
                />
                <div class="w-[10rem] text-center z-20">
                  Add New Payment Method
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Warning dialog box regarding subscription duratrion -->

  <BaseWarningModal
    :warning-modal-is-visible="transferStore.warningModalIsVisible"
    @emit-yes-btn="goToSubTransactSummary"
    @emit-no-btn="closeWarningModal"
    modal-height="h-[21rem]"
    modal-width="w-[21rem]"
    icon-color="indigo"
  >
    <template v-slot:default>
      <span class="text-center"
        >We noticed that you chose to pay per month but you're planning to pay
        for a year or more on your subscription.</span
      ><span>Do you still want to proceed?</span>
    </template>
  </BaseWarningModal>

  <!-- Warning dialog box regarding deleting subscription -->

  <BaseWarningModal
    :warning-modal-is-visible="transferStore.deleteTransferModalIsVisible"
    @emit-yes-btn="deleteTransfer"
    @emit-no-btn="closeDeleteTransferModal"
    modal-height="h-[17rem]"
    modal-width="w-[21rem]"
    icon-color="red"
  >
    <template v-slot:default>
      <span class="text-center"
        >Do you want to remove
        {{
          transferStore.deleteTransferCompany || transferStore.tempSelectedSubscription.company
        }}
        from your list of subscriptions?</span
      >
    </template>
  </BaseWarningModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { toast } from "vue3-toastify";
import { getRandomNumber } from "../composables-and-reusable-logic/getRandomNumber";
import { outputLast4CardNum } from "../composables-and-reusable-logic/outputLast4CardNum";
import { getImgUrl } from "../composables-and-reusable-logic/getImgUrl";

import BaseWarningModal from "./Base Components/BaseWarningModal.vue";
import HeadlessUIListBox from "./Base Components/HeadlessUIListBox.vue";

import { useTransferStore } from "../stores/useTransfer";
import { useNotificationStore } from "../stores/useNotification";

const transferStore = useTransferStore();
const notificationStore = useNotificationStore();

const backBtnRef = ref(null)

const emits = defineEmits(['emitCreateCarouselSubscription'])

function backBtnNewTransfer() {
  transferStore.updateNewTransferOptions(false);
  transferStore.updateSelectSubscription(true);

  nextTick(() => {
    transferStore.outputFirstTransfer.focus()
  })
}

const monthlyBtnRef = ref(null)

function changeBilling(event) {
    transferStore.updateNSBilling(event.target.textContent.trim());

  if (event.target.textContent.trim() === "Monthly") {
    transferStore.updateBillingMonthlyAriaChecked(true)
    transferStore.updateBillingYearlyAriaChecked(false)
    transferStore.updateDurationErrorYear(false)
  }

  if (event.target.textContent.trim() === "Yearly") {
    transferStore.updateBillingMonthlyAriaChecked(false)
    transferStore.updateBillingYearlyAriaChecked(true)
    transferStore.updateDurationErrorMonth(false)
  }
}

const billingIsMonthly = computed(() => transferStore.newSubBilling === "Monthly");

const billingIsYearly = computed(() => transferStore.newSubBilling === "Yearly");

///////////////
// Duration
///////////////

function updateDurationMonth(data) {
  transferStore.updateDurationMonth(data);
  const index = transferStore.monthArr.findIndex(
    (month) => month === transferStore.durationMonth
  );
  transferStore.updateMonthConditional(index) 
}

//////////////////
// Reminder
//////////////////

function updateReminderChoice(data) {
  transferStore.updateReminderChoice(data)
}

///////////////////
// Payment Method
///////////////////

function ariaLabelPaymentMethod(card) {
  return `Payment method. ${
    card.paymentNetwork
  }. Last 4 digits of card number ${card.cardNumber.slice(
    15,
    card.cardNumber.length
  )}. Expires on ${transferStore.monthArr[parseInt(card.expireDate.charAt(0)) - 1]}, ${
    2000 + parseInt(card.expireDate.slice(2))
  }`;
}

//////////////////////////
// Warning Dialog Box
//////////////////////////

function goToSubTransactSummary() {
  if (!transferStore.editTransferModalIsVisible) {
    transferStore.updateNewTransferOptions(false);
  } else {
    transferStore.updateEditTransferOptions(false);
  }
  transferStore.updateSubTransactSummary(true);
  transferStore.updateWarningModalIsVisible(false);
}

function closeWarningModal() {
  transferStore.updateWarningModalIsVisible(false);
  monthlyBtnRef.value.focus();
}

function closeDeleteTransferModal() {
  transferStore.closeDeleteTransferModal();
  transferStore.deleteBtnRef.focus()
}

function deleteTransfer() {
  // get the company name for the notification and toast
  const companyToBeDeleted = transferStore.editTransferOptions ? 
    transferStore.tempSelectedSubscription.company : transferStore.deleteTransferCompany;

  // Remove the "Remove transfer" button from the "New transfer added notification"
  notificationStore.removeTransferBtnFromNotification(companyToBeDeleted);

  // update the carousel
  const newCurrentSubscription = transferStore.currentSubscription.filter(
    (sub) => sub.company !== companyToBeDeleted
  );
  transferStore.updateCurrentSubscription(newCurrentSubscription)

  emits('emitCreateCarouselSubscription')

  // reset states to close modals
  transferStore.updateEditTransferModalIsVisible(false)
  transferStore.updateAddNewTransferModalIsVisible(false)

  // Toast and Notification
  toast.info(`${companyToBeDeleted} was removed from your scheduled transfer`, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "dark",
    transition: toast.TRANSITIONS.SLIDE,
  });

  const notificationId =
    notificationStore.lastNotificationId + Math.floor(getRandomNumber(1, 500));
  notificationStore.updateNotifications({
    id: notificationId,
    type: "transfer",
    status: "deleted",
    company: companyToBeDeleted,
    message: `${companyToBeDeleted} was removed from your scheduled transfer`,
    showCancelBtn: false,
    showRemoveBtn: false,
  });
  notificationStore.updateLastNotificationId(notificationId);

  transferStore.closeDeleteTransferModal();
}

defineExpose({ monthlyBtnRef })

onMounted(() => {
  transferStore.getBackBtnTransferOptionsRef(backBtnRef.value)
  transferStore.getMonthlyBtnRef(monthlyBtnRef.value)
})
</script>
