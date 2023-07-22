<template>
  <div class="flex">
    <div class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full px-5 py-3 mx-5">
      <div class="flex justify-between items-center w-full mb-4">
        <h2 class="text-white ">Statistics of Cost</h2>
        <div id="ariaIdDropdownBtn" hidden>List of data. {{ btnLabel }} is currently selected.</div>

        <Listbox v-model="selectedData">
      <div class="relative mt-1">
        <ListboxButton
          class="flex justify-between p-2 w-28 bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          aria-label="List of data."
        >
          <span class="block truncate">{{ selectedData.id }}</span>
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
            @keydown.enter="updateChart"
            @click="updateChart"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(data, index) of dataList"
              :key="index"
              :value="data"
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
                  >{{ data.id }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600"
                >
                  <Icon icon="material-symbols:check-small-rounded" class="h-6 w-6" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

      </div>
      <div class="w-full grid gap-x-3 grid-cols-6 justify-around">
        <!-- Chart -->
        <div class="col-span-4 xl:col-span-5 ">
          <div class="relative w-[23rem]">
            <Bar :data="chartData" :options="chartOptions" role="img" aria-labelledby="airaIdChart" />
            <div id="airaIdChart" hidden> Total revenue is ${{ outputRevenue }}. Total expense is ${{ outputExpense }}</div>
          </div>
        </div>
        <div class="flex justify-end col-span-2 xl:col-span-1">
          <div class="flex flex-col gap-y-4">
            <!-- Revenues -->
            <div class="flex items-center p-3 gap-x-2 bg-indigo-400 rounded-xl">
              <div class="p-2 bg-gray-900 rounded-full">
                <Icon icon="fluent:money-hand-20-regular" class="text-indigo-400 h-6 w-6" />
              </div>
              <div class="flex flex-col" aria-hidden="true">
                <span class="text-gray-900">Revenue</span>
                <span class="font-bold">${{ outputRevenue }}</span>
              </div>
            </div>
            <!-- Expenses -->
            <div class="flex items-center p-3 gap-x-2 bg-green-400 rounded-xl">
              <div class="p-2 bg-gray-900 rounded-full">
                <Icon icon="carbon:piggy-bank" class="text-green-400 h-6 w-6" />
              </div>
              <div class="flex flex-col" aria-hidden="true">
                <span class="text-gray-900 ">Expenses</span>
                <span class="font-bold">${{ outputExpense }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  registerables
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const dataset = ref({
  data0: [
    { x: 'Jan', rev: 1000, exp: 100 },
    { x: 'Feb', rev: 2000, exp: 500 },
    { x: 'Mar', rev: 500, exp: 500 },
    { x: 'Apr', rev: 3000, exp: 250 },
    { x: 'May', rev: 1500, exp: 150 },
    { x: 'Jun', rev: 500, exp: 700 },
  ],
  data1: [
    { x: 'Jul', rev: 500, exp: 500 },
    { x: 'Aug', rev: 1000, exp: 300 },
    { x: 'Sept', rev: 300, exp: 100 },
    { x: 'Oct', rev: 2500, exp: 1100 },
    { x: 'Nov', rev: 800, exp: 610 },
    { x: 'Dec', rev: 1300, exp: 300 },
  ]
})

const dataList = [
  { id: 'data0', val: 'first' },
  { id: 'data1', val: 'second' },
]

const selectedData = ref(dataList[0])

let tempData = ref(dataset.value.data0)

let btnLabel = ref(dataList[0].id)

function updateChart() {
  tempData.value = dataset.value[selectedData.value.id]
}

const outputRevenue = computed(() => {
  return tempData.value.reduce((acc, curVal) => {
    return acc + curVal.rev
  }, 0)
})

const outputExpense = computed(() => {
  return tempData.value.reduce((acc, curVal) => {
    return acc + curVal.exp
  }, 0)
})

const chartData = computed(() => {
  return {
    labels: tempData.value.map(row => row.x),
    datasets: [{
      label: 'Revenue',
      /* maxBarThickness: 8,
      minBarLength: 2, */
      barThickness: 15,
      data: tempData.value,
      categoryPercentage: 0.5,
      barPercentage: 0.5,
      parsing: {
        yAxisKey: 'rev'
      },
      backgroundColor: 'rgb(129 140 248)'
    }, {
      label: 'Expenses',
      barThickness: 15,
      data: tempData.value,
      parsing: {
        yAxisKey: 'exp'
      },
      backgroundColor: 'rgb(74 222 128)'
    }]
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false
    },
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    layout: {
      //autoPadding: true
    },
    scales: {
      y: {
        border: {
          //display: true,
        },
        grid: {
          color: '#181A1E',
          lineWidth: 1
        }

      }
    }
  }
})
</script>

