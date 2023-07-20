<template>
  <div class="flex">
    <div
      class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full pt-5 pb-6 px-5 mr-5 gap-y-4"
    >
      <!-- title and button -->
      <div class="flex justify-between items-center w-full">
        <h2 class="text-white">Revenue Statistics</h2>
        <button
          class="text-gray-400 hover:cursor-pointer focus:text-white hover:text-white duration-500"
          aria-label="Revenue Statistics"
        >
          <Icon icon="ph:dots-three-circle" class="h-5 w-5" />
        </button>
      </div>
      <!-- Chart -->
      <div class="grid grid-cols-4 justify-between w-full gap-x-2">
        <div class="relative col-span-3">
          <Doughnut
            :data="data"
            :options="options"
            style="position: relative; height: 20vh; width: 10vw"
            class="bg-gray-700 rounded-2xl"
          />
          <div class="absolute text-white z-10 left-20 top-20">
            {{ tempPercent }}%
          </div>
        </div>
        <div class="flex justify-end">
          <div class="flex flex-col justify-center gap-y-4">
            <div
              class="relative flex flex-col justify-center items-center h-[4rem] w-[8rem] p-1 bg-indigo-400 rounded-lg"
            >
              <div class="absolute left-3 top-3 p-1 bg-gray-900 rounded-full">
                <Icon
                  icon="emojione-monotone:money-bag"
                  class="text-indigo-400 h-3 w-3"
                />
              </div>
              <div class="flex flex-col items-start justify-center pl-6">
                <span class="text-gray-900 text-sm">Mutual fund</span>
                <span class="flex justify-center text-gray-900 font-bold"
                  >$ {{ sampleData.mutualFund }}</span
                >
              </div>
            </div>
            <div
              class="relative flex flex-col justify-center items-center h-[4rem] w-[8rem] p-1 bg-green-400 rounded-lg"
            >
              <div class="absolute left-3 top-3 p-1 bg-gray-900 rounded-full">
                <Icon icon="la:coins" class="text-green-400 h-3 w-3" />
              </div>
              <div class="flex flex-col items-start justify-center pl-6">
                <span class="text-gray-900 text-sm">Investment</span>
                <span class="flex justify-center text-gray-900 font-bold"
                  >$ {{ sampleData.investment }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const fullData = [
  { x: "Mutual Funds", amt: 8123 },
  { x: "Investments", amt: 12334 },
  { x: "Remaining Amount", amt: 30000 - 20000 },
];

const sampleData = ref({
  investment: fullData[0].amt,
  mutualFund: fullData[1].amt,
  remainingAmt: fullData[2].amt,
});

const data = ref({
  labels: fullData.map((obj) => obj.x),
  datasets: [
    {
      data: fullData.map((obj) => obj.amt),
      backgroundColor: ["rgb(74 222 128)", "rgb(129 140 248)", "#0F1112"],
      borderColor: ["rgb(74 222 128)", "rgb(129 140 248)", "#0F1112"],
      borderRadius: 0,
      borderWidth: 2,
      circumference: 360,
      offset: 10,
      spacing: 0,
      hoverOffset: 50,
      rotation: 180,
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAsoectRatio: false,
  plugins: {
    legend: false,
  },
  cutout: 40,
  radius: 70,
  animation: {
    animateScale: true,
  },
  events: [],
});

let tempPercent = ref(0);

function donutPercentage() {
  const percent = (sampleData.value.remainingAmt / 30000) * 100;
  return 100 - Math.floor(percent);
}

onMounted(() => {
  setInterval(() => {
    if (tempPercent.value < donutPercentage()) {
      tempPercent.value += 1;
    }
  }, 10);
});
</script>
