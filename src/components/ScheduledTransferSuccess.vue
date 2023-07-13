<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="flex flex-col items-center mt-[30%] relative">
        <div class="absolute h-8 w-8 top-1 bg-green-700 rounded-full z-0"></div>
        <Icon
          icon="material-symbols:check-circle-outline-rounded"
          class="h-10 w-10 text-white z-10"
        />
        <span class="text-white text-2xl">Success!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
