<template>
    <teleport to="body">
        <div v-if="props.show" @click="handleEmitClose"
        class="fixed top-0 left-0 h-screen w-full bg-gray-300/25 z-40"></div>
        <transition @enter="focusCloseBtn">
            <dialog open v-if="props.show" class="fixed z-40 rounded-sm p-0 mx-auto overflow-none bg-gray-700 duration-200
            " :class="[props.dialogCustomHeight, props.dialogCustomWidth, props.dialogCustomYPosition]"
            :aria-label="props.ariaLabelProp"
            aria-modal="true"
            @keydown.esc="handleEmitClose" 
            >
                <header class="flex justify-between bg-gray-900 text-white w-full p-[1rem]" :class="{'flex-row-reverse': props.noHeader}">
                    <slot name="header">
                    </slot>
                    <button class="p-0 bg-gray-900 rounded-full outline-none duration-300"
                    :class="{'text-gray-600 cursor-default': reactiveDisableCloseBtn, 'text-gray-300 hover:ring-2 hover:ring-white hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:text-white': !reactiveDisableCloseBtn}"
                    ref="closeBtnRef" 
                    aria-label="close dialog window"
                    @click="handleEmitClose" 
                    @keydown.enter.prevent="handleEmitClose"
                    @keydown.shift.tab.prevent
                    @keydown.tab="handleEmitClose"
                    >
                        <Icon icon="ci:close-circle" class="h-7 w-7"/>
                    </button>
                </header>
                <section class="px-[1rem] py-[2rem]" aria-label="press escape to close window.">
                    <slot></slot>
                </section>
            </dialog>
        </transition>
    </teleport>
</template>
  
<script setup>
import { Icon } from '@iconify/vue';
import { ref, toRef } from 'vue';

const closeBtnRef = ref(null)

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    ariaLabelProp: {
        type: String,
        required: false,
        default: 'modal window.'
    },
    dialogCustomHeight: {
        type: String,
        required: false,
    },
    dialogCustomWidth: {
        type: String,
        required: false,
        default: 'w-[40rem]'
    },
    dialogCustomYPosition: {
        required: false,
        default: 'top-[20vh]'
        // date type should be both "String" and "Object". Unfortunately, I can't do that right now because I'm not using Typescript.
    },
    noHeader: {
        type: Boolean,
        required: false,
        default: false
    },
    disableCloseBtn: {
        type: Boolean,
        requied: false,
    },
    closeBtnKeyboardTrap: {
        type: Boolean,
        required: false,
    },
    closeBtnFocusOnPopup: {
        type: Boolean,
        required: false,
        default: true,
    }
})

const reactiveDisableCloseBtn = toRef(props, 'disableCloseBtn')
const reactiveKeyboardTrapCloseBtn = toRef(props, 'closeBtnKeyboardTrap')

const emits = defineEmits(['close'])

function handleEmitClose(e) {
    if(e.key === 'Tab' && reactiveKeyboardTrapCloseBtn.value) {
        e.preventDefault()
        e.stopPropagation()
    }

    if(e.key === 'Enter' || e.key === 'Space' || e.key === 'Escape' || e.type === 'click' ) {
        emits('close', props.ariaLabelProp)
    }
}
function focusCloseBtn() {
    if(props.closeBtnFocusOnPopup) {
        closeBtnRef.value.focus()
    }
}

defineExpose({ closeBtnRef, focusCloseBtn })
</script>
  
<style scoped>
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
  