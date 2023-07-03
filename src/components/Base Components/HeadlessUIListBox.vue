<template>
    <div :class="props.widthProp">
        <Listbox v-model="selected">
            <div class="relative">
                <ListboxButton
                    class="relative w-full overflow-hidden cursor-default rounded-lg bg-white py-2 pl-3 pr-8 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 sm:text-sm duration-300" :aria-label="props.ariaLabelProp">
                    <span class="block truncate text-black">{{ selected }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center px-2 hover:bg-gray-200">
                        <Icon icon="ic:round-keyboard-arrow-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        <ListboxOption v-slot="{ active, selected }" v-for="(data, index) of toRefDataProp" :key="index"
                            :value="data" as="template">
                            <li :class="[
                                    active ? 'bg-green-100 text-green-900' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-3',
                                ]">
                                <span :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate',
                                    ]"
                                    @click="handleEmitMonth"
                                    >{{ data }}</span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup>
import { toRef, ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
    dataProp: {
        type: Array,
        required: true,
    },
    currentMonth: {
        type: Number,
        required: false,
        // a reactive prop
    },
    reminderIndex: {
        type: Number,
        required: false
    },
    ariaLabelProp: {
        type: String,
        required: false
    },
    widthProp: {
        type: String,
        required: false,
        default: 'w-full',
    }
})

const toRefDataProp = toRef(props, 'dataProp')
const toRefCurrentMonth = toRef(props, 'currentMonth')

const emits = defineEmits(['emitData'])

function handleEmitMonth(event) {
    emits('emitData', event.target.textContent)
}

const selected = ref(toRefDataProp.value[toRefCurrentMonth.value || props.reminderIndex || 0])

</script>