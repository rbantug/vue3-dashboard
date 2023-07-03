<script setup>
import LeftMenu from './components/LeftMenu.vue';
import TopMenu from './components/TopMenu.vue';
import CardInfo from './components/CardInfo.vue';
import StatisticsOfCost from './components/StatisticsOfCost.vue';
import RecentTransactions from './components/RecentTransactions.vue';
import Invoices from './components/Invoices.vue';
import ScheduledTransfer from './components/ScheduledTransfer.vue';
import MySavings from './components/MySavings.vue';
import RevenueStatistics from './components/RevenueStatistics.vue';
</script>

<template>
  <div>
    <!-- Skip Link -->
    <a href="#card-info" class="absolute top-[-40px] left-0 bg-green-600 text-white p-2 z-[100] focus:top-0">Skip to main content</a>
    
    <div class="bg-gradient-to-r from-gray-700 to-gray-800 font-sans">
      <div class="flex h-screen w-full max-w-[80rem] m-auto z-20">
      <LeftMenu />
      <div class="flex min-h-screen flex-1 flex-col rounded-l-[48px] bg-gray-800">
        <TopMenu />
        <div class="grid grid-cols-5">
          <div class="flex flex-col col-span-3 gap-y-4">
            <CardInfo />
            <StatisticsOfCost />
            <RecentTransactions />
            <Invoices />
          </div>
          <div class="flex flex-col col-span-2 gap-y-6">
            <ScheduledTransfer />
            <MySavings />
            <RevenueStatistics />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
</style>
