<template>
    <div class="flex" id="card-info" tabindex="-1">
        <div class="flex flex-col  rounded-2xl bg-gray-900 w-full px-5 py-4 mx-5">
            <h2 class="text-white">Card Information</h2>
            <div class="flex items-center justify-around pt-2">
                <div class="flex">
                    <div class="bg-gray-800 p-4 rounded-full">
                        <Icon icon="bi:credit-card-2-front" class="h-4 w-4 text-indigo-400" />
                    </div>
                    <div class="flex flex-col pl-2">
                        <div class="text-gray-500 font-bold text-sm">CARD NUMBER</div>
                        <div class="text-white pt-1">{{ cardNum }}</div>
                    </div>
                </div>
                <div class="h-full w-px bg-gray-700"></div>
                <div>
                    <div class="text-gray-500 font-bold text-sm">EXPIRE DATE</div>
                    <div id="a11yExpireDate" hidden>{{ `${monthArray[month]} ${year}` }}</div>
                    <div class="text-white pt-1" role="note" aria-describedby="a11yExpireDate">{{ `${monthOutput}/${yearToString}` }}</div>
                </div>
                <div class="h-full w-px bg-gray-700"></div>
                <div>
                    <div class="text-gray-500 font-bold text-sm">CVC</div>
                    <div class="flex justify-between w-16 items-center text-white pt-1">
                        <span class="pt-1 pr-2 w-2" aria-live="polite">{{ cvcOutput }}</span>
                        <button class="p-1 rounded-md outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300" @click="toggleVisibility" @keydown.enter.prevent="toggleVisibility" ref="eyeIcon" aria-label="toggle visibility of CVC">
                            <Icon :icon="iconAttr" class="h-4 w-4 cursor-pointer" />
                        </button>
                    </div>
                </div>
                <div class="h-full w-px bg-gray-700"></div>
                <div>
                    <div class="text-gray-500 font-bold text-sm">STATUS</div>
                    <div class="text-white pt-1">ACTIVE</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const cvc = '1234';
const cardNum = '3232 2323 3232 3232';
const ExpireDate = new Date(1677438425000);
const month = ExpireDate.getMonth()
const monthOutput = month + 1
const year = ExpireDate.getFullYear().toString()
const yearToString = year.slice(2, year.length)
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let cvcVisible = ref(false);
let eyeIcon = ref(null);
let iconAttr = ref('ic:outline-remove-red-eye')
let cvcOutput = ref('****')
function toggleVisibility() {
    cvcVisible.value = !cvcVisible.value;
    if(cvcVisible.value) {
        iconAttr.value = 'mdi:eye-off-outline'
        cvcOutput.value = cvc 
        eyeIcon.value.focus();
    } else {
        iconAttr.value = 'ic:outline-remove-red-eye'
        cvcOutput.value = '****' 
        eyeIcon.value.focus();
    }
}
</script>
