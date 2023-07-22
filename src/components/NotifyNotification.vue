<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
      class="p-2 bg-gray-900 rounded-full text-gray-300 outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white duration-300"
      @click="removeNotificationPulse"
      @keydown="removeNotificationPulse"
      :aria-label="notificationStore.notifyPingIsVisible ? 'new notifications available': 'notifications'"
    >
      <Icon icon="mdi:bell-outline" class="h-5 w-5" aria-hidden="true" />
      <div
        v-if="notificationStore.notifyPingIsVisible"
        class="absolute top-2 right-2 flex h-2 w-2"
      >
        <span
          class="inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75 absolute"
        />
        <span class="inline-flex h-2 w-2 rounded-full bg-indigo-400" />
      </div>
    </PopoverButton>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute left-0 w-[19rem] bg-gray-700 shadow overflow-hidden rounded-lg border border-gray-400 mt-2 z-20 duration-300"
      >
        <div
          class="h-24 flex justify-center items-center text-white"
          v-if="notificationStore.notifications.length === 0" role="alert"
        >
          There are no notifications
        </div>
        <div
          v-else
          class="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <transition-group>
            <div
              v-for="(notify, index) of outputNotificationList"
              :key="index"
              class="flex flex-col justify-center items-center py-2 text-white rounded hover:bg-gray-400/50 focus-visible:bg-gray-400/50 focus:outline-none duration-200"
              tabindex="0"
              ref="refList"
            >
              <div
                class="relative h-fit flex flex-col justify-between w-[16rem] pl-[3rem] duration-300"
              >
                <div
                  class="absolute -left-1 top-0 h-11 w-11 rounded-full"
                  :class="{
                    'bg-indigo-400/10': notify.status === 'pending',
                    'bg-green-400/10': notify.status === 'successful',
                    'bg-red-400/10': notify.status === 'deleted',
                    'bg-blue-400/10': notify.status === 'updated',
                  }"
                >
                  <div
                    class="absolute left-2 top-2 h-7 w-7 rounded-full"
                    :class="{
                      'bg-indigo-400/30': notify.status === 'pending',
                      'bg-green-400/30': notify.status === 'successful',
                      'bg-red-400/30': notify.status === 'deleted',
                      'bg-blue-400/30': notify.status === 'updated',
                    }"
                  ></div>
                  <Icon
                    :icon="outputIcon(notify.type)"
                    class="absolute left-3 top-3 h-5 w-5"
                    :class="{
                      'text-indigo-300': notify.status === 'pending',
                      'text-green-400': notify.status === 'successful',
                      'text-red-400': notify.status === 'deleted',
                    }"
                  />
                </div>
                <div class="flex flex-col">
                  <h3 class="mt-2 mb-1 text-sm">
                    {{ outputHeader(notify.type, notify.status) }}
                  </h3>
                  <div class="text-sm text-gray-300">{{ notify.message }}
                  </div>
                  <div
                    class="absolute right-0 top-2 flex justify-center items-center h-6 w-6 cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                    @click="removeSingleNotification(notify.id, index, $event)"
                    @keydown="removeSingleNotification(notify.id, index, $event)" 
                    tabindex="0" 
                    aria-label="remove notification"
                  >
                    <Icon icon="ic:round-close" class="h-5 w-5" />
                  </div>
                </div>
                <div class="flex">
                  <div
                    v-if="notify.showCancelBtn"
                    class="mt-2 text-sm cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                    @click="deleteInvoiceInNotification(notify, $event)"
                    @keydown="deleteInvoiceInNotification(notify, $event)"  
                    tabindex="0"
                  >
                    Cancel
                  </div>
                  <div
                    v-if="
                      notify.status === 'successful' &&
                      notify.type === 'invoice'
                    "
                    class="mt-2 text-sm cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                    @click="deleteInvoiceInNotification(notify, $event)"
                    @keydown="deleteInvoiceInNotification(notify, $event)"
                    tabindex="0"
                  >
                    Undo action
                  </div>
                  <div
                    v-if="
                      notify.status === 'successful' &&
                      notify.type === 'invoice'
                    "
                    class="mt-2 ml-4 text-sm cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                    @click="showInvoicesViewAll"
                    @keydown="showInvoicesViewAll"
                    tabindex="0"
                  >
                    View all invoices
                  </div>
                  <div
                    v-if="
                      notify.type === 'transfer' &&
                      notify.status === 'successful' && notify.showRemoveBtn
                    "
                    class="mt-2 text-sm cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                    @click="deleteTransferFromNotification(notify.company, $event)
                    "
                    @keydown="deleteTransferFromNotification(notify.company, $event)"
                    tabindex="0"
                  >
                    Remove transfer
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div
          v-if="notificationStore.notifications.length > 3"
          class="h-[2.5rem] flex justify-center items-center border-t hover:bg-gray-600 focus-visible:bg-gray-600  cursor-pointer duration-300"
          tabindex="0"
          role="button"
        >
          <div class="text-white text-sm">See All Notifications</div>
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from "@iconify/vue";
import {
    Popover, 
    PopoverButton, 
    PopoverPanel,
} from '@headlessui/vue'

import { useInvoicesStore } from '../stores/useInvoice';
import { useNotificationStore } from '../stores/useNotification';
import { useTransferStore } from '../stores/useTransfer';

const invoicesStore = useInvoicesStore()
const notificationStore = useNotificationStore();
const transferStore = useTransferStore();

function removeNotificationPulse(e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") notificationStore.toggleNotifyPing(false)
}

function showInvoicesViewAll(e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") invoicesStore.showInvoicesViewAll()
}

function deleteTransferFromNotification(company, e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") {
    transferStore.deleteTransferFromNotification(company)
  }
}

const outputNotificationList = computed(() => {
  let notificationList = [...notificationStore.notifications]
  return notificationList.slice(0,3)
})

function outputIcon(type) {
  if (type === 'invoice') {
    return 'iconamoon:invoice-bold'
  }

  if (type === 'transfer') {
    return 'mingcute:transfer-fill'
  }

  if (type === 'account') {
    return 'carbon:account'
  }
}

function outputHeader(type, status) {
  if (type === 'invoice' && status === 'pending') {
    return 'Pending invoice'
  }

  if (type === 'invoice' && status === 'successful') {
    return 'Invoice successfully added'
  }

  if (type === 'invoice' && status === 'deleted') {
    return 'Invoice removed'
  }

  if (type === 'transfer' && status === 'successful') {
    return 'New transfer added'
  }

  if (type === 'transfer' && status === 'deleted') {
    return 'Transfer removed'
  }

  if (type === 'transfer' && status === 'updated') {
    return 'Transfer updated'
  }

  if (type === 'account') {
    return 'New account added'
  }
}

let refList = ref([])

function removeSingleNotification(id, index, e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") {
    notificationStore.removeNotification(id)

    if(!notificationStore.notifications.length) return 

    let notifyIndex = notificationStore.notifications.length === index ? notificationStore.notifications.length - 1 : index
    refList.value[notifyIndex].children[0].removeAttribute('aria-live')
    refList.value[notifyIndex].children[0].setAttribute('aria-live', 'assertive')
    refList.value[notifyIndex].focus()
  }
}

function deleteInvoiceInNotification(notify, e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") {
    const invoice = invoicesStore.invoiceData.find(invoice => invoice.id === notify.invoiceId)
    invoicesStore.updateInvData2BeRemoved(invoice)
    if(invoice.status === 'Pending') {
      notificationStore.pendingNotifyIdDeleteInvoice = notify.id
    }
    invoicesStore.updateDelInvModalVisibility(true)
  }

}
</script>
