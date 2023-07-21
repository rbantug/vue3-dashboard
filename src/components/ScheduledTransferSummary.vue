<template>
<div>
          <div class="flex flex-col w-full relative">
            <button
              v-if="!transferStore.processNewSubscription"
              class="flex items-center gap-x-2 pr-2 text-white hover:cursor-pointer absolute top-4 left-6"
              @click="backBtnSummaryWindow"
              @keydown.enter.exact.stop.prevent="backBtnSummaryWindow"
              @keydown.space.exact.stop.prevent="backBtnSummaryWindow"
              aria-label="go back to transfer details"
              ref="backBtnRef"
            >
              <Icon
                icon="material-symbols:arrow-back-ios-new-rounded"
                class="h-5 w-5"
              />
              <span>Back</span>
            </button>
            <div class="text-white text-xl mt-10 mx-auto">Your summary</div>
            <div
              class="flex justify-center items-center gap-x-2 mt-2 mx-auto py-2 px-4 w-auto bg-gray-200/20 text-white rounded-xl"
            >
              <img
                :src="transferStore.tempSelectedSubscription.icon1"
                alt=""
                class="w-20 h-10 object-contain"
                aria-hidden="true"
              />
              <div class="flex flex-col">
                <span>{{ transferStore.tempSelectedSubscription.company }}</span>
                <span>{{ outputSummaryDuration }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-y-1 items-center mt-5">
              <span class="text-white"
                >To be paid {{ transferStore.outputBillingText }}ly</span
              >
              <span class="text-white text-3xl">${{ transferStore.outputPrice }}</span>
              <span class="text-gray-300"
                >Using {{ transferStore.paymentNetworkVModel.paymentNetwork }} ****
                {{ outputLast4CardNum(transferStore.paymentNetworkVModel) }}</span
              >
            </div>
            <div class="flex flex-col items-center mt-5">
              <span class="text-white">Reminder:</span>
              <span v-if="transferStore.checkboxState" class="text-white"
                >{{ transferStore.reminderChoice }} before the billing date</span
              >
              <span v-else class="text-indigo-400">not selected</span>
            </div>
            <div class="flex flex-col items-center mt-5">
              <span class="text-white">Description:</span>
              <span v-if="transferStore.descriptionVmodel" class="text-white">{{
                transferStore.descriptionVmodel
              }}</span>
              <span v-else class="text-indigo-400"
                >no description provided</span
              >
            </div>
          </div>
        </div>
</template>

<script setup>
import { nextTick, computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useTransferStore } from "../stores/useTransfer";
import { outputLast4CardNum } from "../composables-and-reusable-logic/outputLast4CardNum";

const transferStore = useTransferStore();

const backBtnRef = ref(null)

function backBtnSummaryWindow() {
  if (!transferStore.editTransferModalIsVisible) {
    transferStore.updateNewTransferOptions(true);
  } else {
    transferStore.updateEditTransferOptions(true);
  }
  transferStore.updateSubTransactSummary(false);
  nextTick(() => {
    transferStore.monthlyBtnRef.focus()
  })
}

const outputSummaryDuration = computed(() => {
  const tempYear = transferStore.totalDurationMonths / 12;
  const tempYearInteger = Math.floor(tempYear);

  // if the user selected "Monthly" as the billing cycle but set the duration to exactly 1, 2, 3... years.
  if (
    transferStore.newSubBilling === "Monthly" &&
    transferStore.totalDurationMonths > 11 &&
    Number.isInteger(tempYear)
  ) {
    return `${tempYearInteger} year${tempYearInteger > 1 ? "s" : ""}`;
  }

  // if the user selected "Monthly" as the billing cycle but the duration is more than 1 year plus a few months.
  if (
    transferStore.newSubBilling === "Monthly" &&
    transferStore.totalDurationMonths > 11 &&
    !Number.isInteger(tempYear)
  ) {
    const tempMonth = transferStore.totalDurationMonths - tempYearInteger * 12;
    return `${tempYearInteger} year${
      tempYearInteger > 1 ? "s" : ""
    } and ${tempMonth} month${tempMonth > 1 ? "s" : ""}`;
  }

  // if the user selected "Monthly" and will pay for less than 12 months
  if (transferStore.newSubBilling === "Monthly" && transferStore.totalDurationMonths < 12) {
    return `${transferStore.totalDurationMonths} month${
        transferStore.totalDurationMonths > 1 ? "s" : ""
    }`;
  }

  // if the user selected "Yearly" as the billing cycle
  if (transferStore.newSubBilling === "Yearly") {
    const currentDate = new Date()
    const year = transferStore.durationYear - currentDate.getFullYear()

    return `${year} year${year > 1 ? "s" : ""}`;
  }
});

onMounted(() => {
  transferStore.getBackBtnSummaryWindowRef(backBtnRef.value)
})
</script>