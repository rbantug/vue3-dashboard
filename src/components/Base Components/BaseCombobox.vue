<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div
        class="relative rounded-lg cursor-default overflow-hidden hover:outline-none focus:outline-none"
        :class="[props.comboboxWidth, props.comboboxStyling]"
      >
        <ComboboxInput
          class="w-full border-none"
          :class="[props.inputBoxStyling]"
          :display-value="(data) => data[props.propToShow]"
          @change="query = $event.target.value"
        />
        <ComboboxButton class="absolute inset-y-0 flex items-center px-2" :class="{'left-1': props.iconPosition === 'left', 'right-0': props.iconPosition === 'right'}">
          <Icon
            :icon="props.iconCode"
            class="h-5 w-5" :class="props.iconColor"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
        >
          <div
            v-if="filteredData.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="data in filteredData"
            as="template"
            :key="data.id"
            :value="data"
            v-slot="{ selected, active }"
          >
            <li
              class="relative flex gap-x-2 cursor-default select-none py-2 pl-5 pr-4"
              :class="{
                'bg-gray-200': active,
                'text-gray-900': !active,
              }"
            >
              <slot name="comboboxItem" :slotData="data" :textStyling="selected"
              ></slot>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { Icon } from "@iconify/vue";

const props = defineProps({
    dataList: {
        type: Array,
        required: true
    },
    iconPosition: {
        type: String,
        required: true,
    }, // accepts 'left' or 'right'
    iconCode: {
        type: String,
        required: true,
    },
    comboboxWidth: {
        type: String,
        required: false,
        default: 'w-full'
    }, // tailwindcss w-# or w-[]
    comboboxStyling: {
      type: String,
      required: false,
    }, // other tailwindcss classes other than the width
    inputBoxStyling: {
      type: String,
      required: false,
    }, // tailwindcss classes for the input box
    iconColor: {
      type: String,
      required: false,
    }, // tailwindcss classes for the button
    propToShow: {
      type: String,
      required: true,
    }  
})

const emits = defineEmits(['emitSelectedOption'])

const selected = ref(props.dataList[0])
const query = ref('')

function runEmit() {
  emits('emitSelectedOption', selected.value)
  selected.value = props.dataList[0]
}

let filteredData = computed(() =>
  query.value === ''
    ? props.dataList
    : props.dataList.filter((data) =>
      data[props.propToShow]
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)

defineExpose({ runEmit }) 
</script>
