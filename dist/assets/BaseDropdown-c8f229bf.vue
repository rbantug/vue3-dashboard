<template>
    <div class="relative">
        <button
        type="button"
        v-click-away="hideDropDown"
        @click="toggleDropDown"
        @keydown.exact="buttonMethod"
        ref="btnRef"
        :aria-expanded="DropDownIsVisible"
        :aria-label="props.ariaLabelBtnProp"
        aria-haspopup="true"
        :class="props.dropDownBtnStylingTailwind"
        >
            <slot name="button"></slot>
        </button>
        <!-- <div v-if="props.dropDownActivator === 'input'" :class="props.labelInputContainerStylingTailwind">
          <label for="input" :class="props.labelStylingTailwind">
            <slot name="input-label"></slot>
          </label>
          <input id="input" type="text" :class="props.inputStylingTailwind"/>
        </div> -->
        <Transition>
            <ul 
            v-show="DropDownIsVisible"
            @keydown.esc.exact="hideDropDown"
            :class="props.dropDownBarStylingTailwind"
            role="menu">
                <li
                v-if="typeOfDropDown === 'list'"
                v-for="(item, i) of props.dropDownData" 
                :ref="(el) => { itemRefs[i] = el }" 
                :class="props.dropDownItemStylingTailwind"
                :data-emit="item.id"
                tabindex="0"
                role="menuitem"
                aria-current="false"
                @keydown="dropDownItemMethod"
                @click="handleEmit"
                @keydown.shift.tab.exact="focusUp"
                >
                <slot name="ddItem" :item="item"></slot>
                </li>
                <li
                v-if="typeOfDropDown === 'menu'"
                v-for="(item, i) of props.dropDownData" 
                :ref="(el) => { itemRefs[i] = el }"
                :class="props.dropDownItemStylingTailwind" 
                :data-emit="item.id"
                tabindex="0"
                role="menuitem"
                aria-current="false"
                @keydown="dropDownItemMethod"
                @click="handleEmit"
                @keydown.shift.tab.exact="focusUp"
                >
                <a :href="item.link" :class="props.dropDownItemStylingTailwind">
                  <slot name="ddItem" :item="item"></slot>
                </a>
                </li>
                <slot name="miscellaneous"></slot>
            </ul>
          </Transition>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue';

let DropDownIsVisible = ref(false)
let focusedIndex = ref(0);
let itemRefs = ref([])
let btnRef = ref(null)

///////////////////////////////////////////
// Props, Emits and Emit function handlers
///////////////////////////////////////////

const props = defineProps({
  typeOfDropDown: {
    type: String,
    required: true,
    validator(val) {
      return ['menu', 'list'].includes(val)
    }
  },
  dropDownData: {
    type: Array,
    required: true
  },
  ariaLabelBtnProp: {
    type: String,
    required: false,
  },
  dropDownBtnStylingTailwind: {
    type: String,
    required: false,
  },
  dropDownBarStylingTailwind: {
    type: String,
    required: true,
  },
  dropDownItemStylingTailwind: {
    type: String,
    required: true,
  },
  /* dropDownActivator: {
    type: String,
    required: true,
    validator(val) {
      return ['button', 'input'].includes(val)
    }
  },
  dropDownInputStylingTailwind: {
    type: String,
    required: false,
  },
  labelInputContainerStylingTailwind: {
    type: String,
    required: false,
  },
  labelStylingTailwind: {
    type: String,
    required: false
  },
  inputStylingTailwind: {
    type: String,
    required: false
  }, */
})

const emits = defineEmits(['emitSelectedData', 'emitNotificationPulse'])

function handleEmit(event) {
    emits('emitSelectedData', event.target.dataset.emit)
}

/////////////////////////////////
// Event Handling
/////////////////////////////////

function toggleDropDown() {
  DropDownIsVisible.value = !DropDownIsVisible.value

  emits('emitNotificationPulse')
}
function openList() {
  DropDownIsVisible.value = true;
  focusedIndex.value = 0;
}
function hideDropDown() {
  DropDownIsVisible.value = false;
  focusedIndex.value = 0;
}
function focusUp() {
  if (focusedIndex.value <= 0) return;
  focusedIndex.value -= 1;
  itemRefs.value[focusedIndex.value].focus();
}
function focusDown() {
  if (focusedIndex.value >= itemRefs.value.length - 1) return;
  focusedIndex.value += 1;
  itemRefs.value[focusedIndex.value].focus();
}
function focusFirstItem() {
  itemRefs.value[0].focus();
}
function focusLastItem() {
  const len = itemRefs.value.length
  itemRefs.value[len - 1].focus();
}

// Button method

function buttonMethod(event) {
  /* if (event.type === "click") {
    toggleDropDown();
  } */

  if (event.code === "Space") {
    event.preventDefault()
    toggleDropDown();
  }

  if (DropDownIsVisible.value && event.code === "ArrowDown") {
    event.preventDefault()
    focusFirstItem();
  }

  if (!DropDownIsVisible.value && event.code === "ArrowDown") {
    event.preventDefault()
    openList();
  }

  if (DropDownIsVisible.value && event.code === "ArrowRight") {
    event.preventDefault()
    focusFirstItem();
  }

  if (!DropDownIsVisible.value && event.code === "ArrowRight") {
    event.preventDefault()
    openList();
  }
}

// Drop down item methods

/* dropDownItemMethod */

function dropDownItemMethod(event) {
  if (DropDownIsVisible.value && event.code === "ArrowDown") {
    event.preventDefault()
    focusDown();
  }

  if (DropDownIsVisible.value && event.code === "ArrowRight") {
    event.preventDefault()
    focusDown();
  }

  if (DropDownIsVisible.value && event.code === "Tab") {
    focusDown();
  }

  if (DropDownIsVisible.value && event.code === "ArrowUp") {
    event.preventDefault()
    focusUp();
  }

  if (DropDownIsVisible.value && event.code === "ArrowLeft") {
    event.preventDefault()
    focusUp();
  }

  if (DropDownIsVisible.value && event.code === "Home") {
    focusFirstItem();
  }

  if (DropDownIsVisible.value && event.code === "End") {
    focusLastItem();
  }

  if (DropDownIsVisible.value && event.code === "Escape") {
    hideDropDown();
    btnRef.value.focus()
  }

  if (DropDownIsVisible.value && event.code === "Tab") {
    event.preventDefault()
    focusDown();
  }

  if (props.typeOfDropDown === 'list' && DropDownIsVisible.value && event.code === "Enter") {
    event.preventDefault()
    handleEmitForEnter(event)
  }
}

function handleEmitForEnter(event) {
  handleEmit(event)
  for(let i = 0; i < itemRefs.value.length; i++) {
    itemRefs.value[i].setAttribute('aria-current', false)
  }
  itemRefs.value[focusedIndex.value].setAttribute('aria-current', true)
  hideDropDown()
  btnRef.value.focus()
}


///////////////////
// Misc
///////////////////

onBeforeMount(() => {
  itemRefs.value = [];
})

if(props.typeOfDropDown === 'list') {
  onMounted(() => {
    itemRefs.value[0].setAttribute('aria-current', true)
  })
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>