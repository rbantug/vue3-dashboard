<template>
  <div class="flex">
    <div
      class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full p-5 mr-5 gap-y-4"
    >
      <!-- title and button -->
      <div class="flex justify-between items-center w-full">
        <h2 class="text-white">My Savings</h2>
        <Listbox v-model="selectedData">
          <div class="relative mt-1">
            <ListboxButton
              class="flex justify-between p-2 w-28 bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
              aria-label="List of data."
            >
              <span class="block truncate">{{ selectedData.duration }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon
                  icon="material-symbols:keyboard-arrow-down"
                  class="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 w-48 bg-gray-700 shadow overflow-hidden rounded border border-gray-400 mt-2 z-20"
                @keydown.enter="updateProgressBar"
                @click="updateProgressBar"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="(d, index) of data"
                  :key="index"
                  :value="d"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-400 text-white' : 'text-gray-200',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                    
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ d.duration }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600"
                    >
                      <Icon
                        icon="material-symbols:check-small-rounded"
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <!-- Investment -->
      <div class="flex flex-col p-4 bg-gray-700 rounded-xl w-full">
        <div class="flex items-start">
          <div
            class="flex items-center justify-center p-2 mt-2 bg-indigo-400 rounded-full"
          >
            <Icon icon="la:coins" class="text-gray-900 h-4 w-4" />
          </div>
          <div class="flex flex-col mx-2">
            <span class="text-white">Investment</span>
            <span class="text-gray-400 text-sm"
              >{{ selectedData.investment.months }} months income
              {{ selectedData.investment.percentage }}%</span
            >
          </div>
          <div>
            <span class="text-white">${{ selectedData.investment.amount }}</span>
          </div>
        </div>
        <div class="flex w-full bg-gray-900 h-1.5 mt-2">
          <div
            class="bg-indigo-400 h-1.5 duration-150"
            :style="`width:${tempInvestPercent}%; transition: width 2s;`"
          ></div>
        </div>
      </div>
      <!-- Mutual Fund -->
      <div class="flex flex-col p-4 bg-gray-700 rounded-xl w-full">
        <div class="flex items-start">
          <div
            class="flex items-center justify-center p-2 mt-2 bg-green-400 rounded-full"
          >
            <Icon
              icon="emojione-monotone:money-bag"
              class="text-gray-900 h-4 w-4"
            />
          </div>
          <div class="flex flex-col mx-2">
            <span class="text-white">Mutual fund</span>
            <span class="text-gray-400 text-sm"
              >{{ selectedData.mutualFund.months }} months income
              {{ selectedData.mutualFund.percentage }}%</span
            >
          </div>
          <div>
            <span class="text-white">${{ selectedData.mutualFund.amount }}</span>
          </div>
        </div>
        <div class="flex w-full bg-gray-900 h-1.5 mt-2">
          <div
            class="bg-green-400 h-1.5 duration-100"
            :style="`width:${tempMFPercent}%; transition: width 0.5s;`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const data = ref([
    {
        duration: 'Weekly', 
        investment: {
            months: 2,
            percentage: 80,
            amount: 2350, 
        }, 
        mutualFund: {
            months: 3,
            percentage: 50,
            amount: 1450,
        },

    },
    {
        duration: 'Monthly', 
        investment: {
            months: 4,
            percentage: 60,
            amount: 4500, 
        }, 
        mutualFund: {
            months: 2,
            percentage: 40,
            amount: 3450,
        },

    },
    {
        duration: 'Yearly', 
        investment: {
            months: 5,
            percentage: 40,
            amount: 7050, 
        }, 
        mutualFund: {
            months: 7,
            percentage: 20,
            amount: 5000,
        },

    },
])

const selectedData = ref(data.value[0])

let tempInvestPercent = ref(0);
let tempMFPercent = ref(0);

function updateProgressBar() {
    setTimeout(() => {
    tempInvestPercent.value = selectedData.value.investment.percentage;
    tempMFPercent.value = selectedData.value.mutualFund.percentage;
  }, 100);
}

function test(e) {
  console.log('yey')
}

onMounted(() => {
    updateProgressBar()
});
</script>
