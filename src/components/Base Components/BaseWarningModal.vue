<template>
    <teleport to="body">
        <div>
            <div v-if="props.warningModalIsVisible" class="fixed top-0 left-0 h-screen w-full bg-gray-300/25 z-50"></div>
            <transition @enter="focusYesBtn">
                <dialog v-if="props.warningModalIsVisible" open
                    class="fixed z-50 top-[35vh] rounded-sm px-4 m-auto overflow-y-auto bg-gray-700" :class="[props.modalHeight, props.modalWidth]">
                    <div class="flex justify-center items-center my-4">
                        <div class="blur" :class="outputIconColorInner"></div>
                        <div class="blur" :class="outputIconColorOuter"></div>
                        <Icon icon="ph:warning-circle-bold" class="h-20 w-20 text-white z-50" />
                    </div>
                    <div class="flex flex-col gap-y-4 justify-center items-center text-white">
                        <slot></slot>
                        
                        <div class="flex gap-x-10">
                            <button
                                class="w-20 py-2 px-6 rounded-lg ring-gray-400 bg-gray-100/10 text-gray-300 ring-2 focus:outline-none hover:bg-green-500 focus:bg-green-500 hover:ring-green-500 focus:ring-green-500 hover:text-white focus-visible:text-white duration-300"
                                ref="yesBtnRef" @keydown.shift.tab.prevent @click="() => emits('emitYesBtn')"
                                @keydown.enter="() => emits('emitYesBtn')" @keydown.space="() => emits('emitYesBtn')">Yes</button>
                            <button
                                class="w-20 py-2 px-6 rounded-lg ring-2 ring-gray-400 bg-gray-100/10 text-gray-300 focus:outline-none hover:bg-gray-400 hover:text-white focus-visible:bg-gray-400 focus-visible:text-white duration-300"
                                @click="() => emits('emitNoBtn')" @keypress.enter="() => emits('emitNoBtn')"
                                @keydown.space="() => emits('emitNoBtn')" @keydown.tab.exact.prevent>No</button>
                        </div>
                    </div>
                </dialog>
            </transition>
        </div>
    </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue';

const props = defineProps({
    warningModalIsVisible: {
        type: Boolean,
        required: true
    },
    modalHeight: {
        type: String,
        required: true,
    },
    modalWidth: {
        type: String,
        required: true,
    },
    iconColor: {
        type: String,
        required: true
        /* accepts only 'indigo' or 'red' */
    }
})

const emits = defineEmits(['emitYesBtn', 'emitNoBtn'])

const yesBtnRef = ref(null) 

function focusYesBtn() {
    yesBtnRef.value.focus()
}

const outputIconColorInner = computed(() => {
    if(props.iconColor === 'indigo') {
        return 'gradient-inner-warning'
    }

    if(props.iconColor === 'red') {
        return 'gradient-inner-delete'
    }
})

const outputIconColorOuter = computed(() => {
    if(props.iconColor === 'indigo') {
        return 'gradient-outer-warning'
    }

    if(props.iconColor === 'red') {
        return 'gradient-outer-delete'
    }
})
</script>

<style scoped>
/* icon radial gradient background color class is in main.css */

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.v-enter-active {
    transition: all 0.2s ease-out;
}

.v-leave-active {
    transition: all 0.2s ease-in;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>