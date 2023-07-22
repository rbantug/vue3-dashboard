<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
      class="p-2 bg-gray-900 rounded-full text-gray-300 outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white duration-300"
      @click="removeMsgNotificationPulse"
      @keydown="removeMsgNotificationPulse"
      :aria-label="notificationStore.msgPingIsVisible ? 'new messages available': 'messages'"
    >
      <Icon icon="uil:envelope" class="h-5 w-5" aria-hidden="true" />
      <div
        v-if="notificationStore.msgPingIsVisible"
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
        class="absolute left-0 w-[17rem] bg-gray-700 shadow overflow-hidden rounded-lg border border-gray-400 mt-2 z-20"
      >
      <div
          class="h-24 flex justify-center items-center text-white"
          v-if="notificationStore.msgNotification.length === 0" role="alert"
        >
          There are no messages
        </div>
        <div v-else class="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
          <TransitionGroup>
          <div
            v-for="(msg, index) of outputMessageList"
            :key="index"
            class="flex flex-col justify-center items-center py-2 text-white rounded hover:bg-gray-400/50 focus-visible:bg-gray-400/50 focus:outline-none duration-200"
            tabindex="0"
            ref="refList"
          >
            <div
                class="relative flex flex-col items-start h-[6.5rem] w-[16rem] pl-[3rem] duration-300"
              >
              <div class="absolute left-2 top-2">
                <img :src="getImgUrl(msg.imageSrc)" alt="" class="h-7 w-7 rounded-full">
              </div>
              <h3 class="mt-2 mb-1 text-sm">
                {{ msg.title }}
              </h3>
              <div class="w-[12rem] text-sm text-gray-300">{{ msg.message }}
              </div>
              <div
                  class="absolute right-0 top-2 flex justify-center items-center h-6 w-6 cursor-pointer outline-none hover:text-yellow-400 focus-visible:text-yellow-400"
                  @click="removeSingleMessage(msg.id, index, $event)"
                  @keydown="removeSingleMessage(msg.id, index, $event)"
                  tabindex="0" 
                  :aria-label="`remove ${msg.title}`" 
                >
                  <Icon icon="ic:round-close" class="h-5 w-5" />
              </div>
            </div>
          </div>
        </TransitionGroup>
          <div
          v-if="notificationStore.msgNotification.length > 3"
          class="h-[2.5rem] flex justify-center items-center border-t hover:bg-gray-600 focus:bg-gray-600 cursor-pointer duration-300"
          tabindex="0"
          role="button"
        >
          <div class="text-white text-sm">See All Messages</div>
        </div>
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { getImgUrl } from "../composables-and-reusable-logic/getImgUrl";

import { useDashboardStore } from "../stores/useDashboard";
import { useNotificationStore } from "../stores/useNotification";

const dashboard = useDashboardStore();
const notificationStore = useNotificationStore();

const outputMessageList = computed(() => {
  let messageList = [...notificationStore.msgNotification]
  if (messageList.length > 3) {
    return messageList.slice(0,3)
  } else {
    return messageList
  }
})

function removeMsgNotificationPulse(e) {
  if(e.type === "click" || e.code === "Space" || e.code === "Enter") notificationStore.toggleMsgPing(false)
}

let refList = ref([])

function removeSingleMessage(id, index, e) {

  if(e.type === "click" || e.code === "Space" || e.code === "Enter") {    
    dashboard.removeMessage(id)
    let msgIndex = notificationStore.msgNotification.length === index ? notificationStore.msgNotification.length - 1 : index
    refList.value[msgIndex].children[0].removeAttribute('aria-live')
    refList.value[msgIndex].children[0].setAttribute('aria-live', 'assertive')
    refList.value[msgIndex].focus()
  }
}
</script>

<style scoped>
/* .v-move {
  transition: transform 1s cubic-bezier(0.55, 0, 0.1, 1);
} */

.v-move, /* apply transition to moving elements */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.v-leave-active {
  position: absolute;
}
</style>