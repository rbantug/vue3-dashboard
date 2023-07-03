<template>
  <nav class="flex items-center gap-x-6 mx-6 my-6">
    <div class="flex w-3/5 items-center justify-between">
      <h2 class="text-white font-bold text-2xl">Overview</h2>

      <!-- Search Combobox -->

      <div class="flex justify-between gap-x-4">
        <div class="relative flex items-center">
          <BaseCombobox
            :data-list="accountList"
            icon-position="left"
            icon-code="gg:search"
            :combobox-styling="comboboxStyling"
            :input-box-styling="inputBoxStyling"
            icon-color="text-white"
            prop-to-show="text"
            @emit-selected-option="updateSelectedAccount"
            ref="comboboxRef"
          >
            <template #comboboxItem="slotObj">
              <span class="block truncate" :class="{ 'font-medium': slotObj.textStyling, 'font-normal': !slotObj.textStyling }">
                        {{ slotObj.slotData.text }}
                      </span>
            </template>
          </BaseCombobox>
        </div>
        <button
          class="py-3 px-4 bg-gray-900 text-gray-300 rounded-lg text-sm outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="addAccount">
          Add Account
        </button>
      </div>
    </div>
    <div class="flex w-2/5 items-center justify-between">
      <!-- Icons -->

      <div class="flex justify-between gap-x-4">
        
        <!-- Message Icon -->

        <MessageNotification />

        <!-- Notification Icon -->

        <NotifyNotification />
        
        <!-- Export Icon -->
        <button
          class="p-2 bg-gray-900 rounded-full text-gray-300 outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          aria-label="Export">
          
            <Icon icon="material-symbols:download-rounded" class="h-5 w-5" />
          
        </button>
      </div>

      <!-- Username and photo -->

      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="flex items-center gap-x-2 p-2 bg-gray-900 rounded-[45px] hover:bg-gray-800 outline-none hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white duration-300">
            <div class="flex justify-center items-center h-8 w-8 object-cover rounded-full bg-indigo-400">
              <Icon icon="uil:user" class="text-black h-6 w-6" />
            </div>
            <span class="text-white text-sm">Your Name</span>
            <Icon icon="material-symbols:keyboard-arrow-down" class="text-white h-6 w-6" />
          </MenuButton>
        </div>

        <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
          <MenuItems
            class="absolute right-0 w-48 bg-gray-700 shadow overflow-hidden rounded border border-gray-400 mt-2 z-20">
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
              <button :class="[
                active ? 'bg-gray-400 text-white' : 'text-gray-200',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]">
                <Icon icon="octicon:person-24" :active="active" :class="[active ? 'text-gray-100' : 'text-gray-500']"
                  class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Menu Item 1
              </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <button :class="[
                active ? 'bg-gray-400 text-white' : 'text-gray-200',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]">
                <Icon icon="ri:money-dollar-circle-line" :active="active"
                  :class="[active ? 'text-gray-100' : 'text-gray-500']" class="mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true" />
                Menu Item 2
              </button>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <hr class="py-1" />
              <MenuItem v-slot="{ active }">
              <button :class="[
                active ? 'bg-gray-400 text-white' : 'text-gray-200',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]">
                <Icon icon="material-symbols:signal-cellular-alt-rounded" :active="active"
                  :class="[active ? 'text-gray-100' : 'text-gray-500']" class="mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true" />
                Menu Item 3
              </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <button :class="[
                active ? 'bg-gray-400 text-white' : 'text-gray-200',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]">
                <Icon icon="uil:setting" :active="active" :class="[active ? 'text-gray-100' : 'text-gray-500']"
                  class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Menu Item 4
              </button>
              </MenuItem>
            </div>

            <div class="px-1 py-1">
              <hr class="py-1" />
              <MenuItem v-slot="{ active }">
              <button :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-200',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]">
                <Icon icon="material-symbols:logout-rounded" :active="active"
                  :class="[active ? 'text-gray-100' : 'text-gray-500']" class="mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true" />
                Menu Item 5
              </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>


    </div>
  </nav>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import { useDashboardStore } from "../stores/useDashboard";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot,
  Popover,
  PopoverButton,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { getRandomNumber } from '../composables-and-reusable-logic/getRandomNumber'
import NotifyNotification from "./NotifyNotification.vue";
import MessageNotification from "./MessageNotification.vue"
import BaseCombobox from "./Base Components/BaseCombobox.vue";

const dashboard = useDashboardStore();

/////////////////////////////
// Search Bar
/////////////////////////////

const accountList = ref([
  { id: 1, text: 'Account 1' },
  { id: 2, text: 'Account 2' },
  { id: 3, text: 'Account 3' },
])

const comboboxStyling = ref('hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white duration-300')

const inputBoxStyling = ref('bg-gray-900 py-3 pl-10 text-sm text-white')

const selectedAccount = ref()

const comboboxRef = ref()

function updateSelectedAccount(val) {
  selectedAccount.value = val
}

function addAccount() {
  // run a function from BaseCombobox component to update the selectedAccount
  comboboxRef.value?.runEmit()

  // check if account was already added
  const findAccount = dashboard.addedAccountsList.findIndex(acct => acct === selectedAccount.value.text)

  if(findAccount !== -1) {
    toast.error(`${selectedAccount.value.text} was already added`, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: 'dark',
    transition: toast.TRANSITIONS.SLIDE
  })
    return
  }
  // add account to state management
  dashboard.addNewAccount(selectedAccount.value.text)

  // create toast
  toast.success(`${selectedAccount.value.text} was added`, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: 'dark',
    transition: toast.TRANSITIONS.SLIDE
  })

  // add new notification
  const notificationId = dashboard.lastNotificationId + Math.floor(getRandomNumber(0, 500))
  dashboard.updateNotifications({
    id: notificationId,
    type: 'account',
    status: 'successful',
    message: `${selectedAccount.value.text} was added. Hooray 🎉`,
    showCancelBtn: false
  })
  dashboard.updateLastNotificationId(notificationId)
}

///////////////////////////////
// Misc
///////////////////////////////

onMounted(() => {
  dashboard.msgNotification.forEach(msg => {
    if (msg.message.length > 80) {
      msg.message = msg.message.substring(0, 80) + '...'
    }
  })
})

</script>

<style scoped>
.v-move {
  transition: transform 1s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
