<template>
  <ul
    class="grid grid-cols-3 grid-rows-3 gap-y-2 w-[80%] mx-auto"
  >
    <template v-for="(company, index) in transferStore.allCompanies">
      <li
        v-if="!isActiveSubscription.includes(company.company)"
        class="flex justify-center mt-5"
        ref="subscriptionListRef"
      >
        <button
          class="flex flex-col justify-center items-center w-20 h-20 rounded-md bg-gray-500 duration-300 outline-none hover:bg-white hover:ring-4 hover:ring-indigo-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-500"
          @click="goToTransferOptions"
          :aria-label="company.company"
          :data-company="company.company"
        >
          <img
            class="object-scale-down h-9 w-16 pointer-events-none"
            :src="getImgUrl(company.icon1)"
            alt=""
            aria-hidden="true"
          />
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup>
import { computed, ref, nextTick, onMounted } from 'vue'
import { getImgUrl } from "../composables-and-reusable-logic/getImgUrl";
import { useTransferStore } from '../stores/useTransfer';

const transferStore = useTransferStore();

const subscriptionListRef = ref([])

const isActiveSubscription = computed(() =>
transferStore.currentSubscription.map((sub) => sub.company)
);

function goToTransferOptions(event) {
  transferStore.updateSelectSubscription(false)
  transferStore.updateNewTransferOptions(true)
  const temp = transferStore.allCompanies.find(
    (company) => company.company === event.target.dataset.company
  );
  transferStore.updateTempSelectedSubscription(temp) 
  nextTick(() => {
    transferStore.backBtnTransferOptionsRef?.focus()
  })
}

onMounted(() => {
  transferStore.getSubscriptionListRef(subscriptionListRef.value)
})
</script>
