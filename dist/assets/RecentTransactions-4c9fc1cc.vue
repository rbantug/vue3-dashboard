<template>
  <!-- Modal -->

  <BaseModal :show="modalIsVisible" @close="closeModal">
    <template #header>All Transactions</template>
    <template #default>
      <div class="flex flex-col justify-center items-center">
        <div class="w-[90%] h-[45vh] bg-gray-900 overflow-hidden rounded-xl">
          <div class="m-4">
            <table class="w-full border-collapse">
              <thead class="sticky top-0 bg-gray-900" scope="row">
                <tr class="text-sm text-gray-300 text-left">
                  <th class="py-2">Transaction type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) of currentList"
                  :key="item.id"
                  class="border-b border-gray-700 last:border-none text-sm"
                >
                  <td class="py-4">
                    <!-- Icon and transaction type -->
                    <div class="col-span-2 flex items-center gap-x-2">
                      <div
                        class="p-2 bg-indigo-400 rounded-full"
                        :class="
                          item.type === 'send'
                            ? 'bg-indigo-400'
                            : 'bg-green-400'
                        "
                      >
                        <Icon
                          :icon="
                            item.type === 'send'
                              ? 'system-uicons:paper-plane'
                              : 'fluent:money-hand-20-regular'
                          "
                          class="text-gray-900 h-6 w-6"
                        />
                      </div>
                      <span class="text-white text-sm">{{
                        item.type === "send" ? "Send fund" : "Receive fund"
                      }}</span>
                    </div>
                  </td>
                  <td>
                    <!-- Date -->
                    <div class="col-span-2 flex items-center gap-x-2">
                      <div class="p-1 bg-gray-700 rounded-full">
                        <Icon
                          icon="ic:baseline-date-range"
                          class="text-gray-300"
                        />
                      </div>
                      <span class="text-gray-300 text-sm">{{ item.date }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center text-white text-sm">
                      ${{ item.amount }}
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center text-white text-sm">
                      ${{ item.balance }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination -->

      <div class="h-12 flex flex-wrap justify-center items-center gap-x-2">
        <button
          class="flex items-center h-8 w-6 border border-white rounded-md outline-none hover:border-gray-300 hover:bg-gray-300 focus-visible:border-gray-300 focus-visible:bg-gray-300"
          :aria-label="ariaLabelPreviousBtn"
          @click="PreviousPage"
        >
          <Icon
            icon="ic:outline-keyboard-arrow-left"
            class="h-6 w-6 text-white hover:text-black focus-visible:text-black"
          />
        </button>
        <button
          v-for="(page, index) of totalPages"
          class="flex justify-center items-center w-8 h-8 font-bold text-white border border-white rounded-md outline-none hover:border-gray-300 hover:bg-gray-300 hover:text-black focus-visible:text-black focus-visible:border-gray-300 focus-visible:bg-gray-300"
          :ref="(el) => (refArray[index] = el)"
          @click="changePage"
          :aria-label="`page ${page}`"
          aria-live="assertive"
          aria-atomic="true"
        >
          {{ page }}
        </button>
        <button
          class="flex items-center h-8 w-6 border border-white rounded-md outline-none hover:border-gray-300 hover:bg-gray-300 focus-visible:border-gray-300 focus-visible:bg-gray-300"
          :aria-label="ariaLabelNextBtn"
          @click="NextPage"
          @keydown.tab.exact.prevent
        >
          <Icon
            icon="ic:outline-keyboard-arrow-right"
            class="h-6 w-6 text-white focus-visible:text-black hover:text-black"
          />
        </button>
      </div>
    </template>
  </BaseModal>

  <!-- Main -->

  <div class="flex">
    <div
      class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full px-5 py-3 mx-5"
    >
      <div class="flex justify-between items-center w-full mb-4">
        <h2 class="text-white">Recent Transactions</h2>
        <button
          class="flex p-2 text-sm bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          ref="btnRef"
          aria-label="view all transactions"
          @click="openModal"
        >
          View All
        </button>
      </div>
      <table class="w-full">
        <thead>
          <tr class="text-sm text-gray-300">
            <td>Transaction type</td>
            <td>Date</td>
            <td>Amount</td>
            <td>Balance</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(x, index) in 2"
            :key="reversedTransaction[index].id"
            class="border-b border-gray-700 last:border-none text-sm"
          >
            <td class="py-2">
              <!-- Icon and transaction type -->
              <div class="col-span-2 flex items-center gap-x-2">
                <div
                  class="p-2 bg-indigo-400 rounded-full"
                  :class="
                    reversedTransaction[index].type === 'send'
                      ? 'bg-indigo-400'
                      : 'bg-green-400'
                  "
                >
                  <Icon
                    :icon="
                      reversedTransaction[index].type === 'send'
                        ? 'system-uicons:paper-plane'
                        : 'fluent:money-hand-20-regular'
                    "
                    class="text-gray-900 h-6 w-6"
                  />
                </div>
                <span class="text-white text-sm">{{
                  reversedTransaction[index].type === "send"
                    ? "Send fund"
                    : "Receive fund"
                }}</span>
              </div>
            </td>
            <td>
              <!-- Date -->
              <div class="col-span-2 flex items-center gap-x-2">
                <div class="p-1 bg-gray-700 rounded-full">
                  <Icon icon="ic:baseline-date-range" class="text-gray-300" />
                </div>
                <span class="text-gray-300 text-sm">{{
                  reversedTransaction[index].date
                }}</span>
              </div>
            </td>
            <td>
              <div class="flex items-center text-white text-sm">
                ${{ reversedTransaction[index].amount }}
              </div>
            </td>
            <td>
              <div class="flex items-center text-white text-sm">
                ${{ reversedTransaction[index].balance }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display: none" class="flex flex-col w-full">
        <div v-for="(x, index) in 2">
          <div class="grid grid-cols-6 gap-x-2 justify-between">
            <!-- Icon and transaction type -->
            <div class="col-span-2 flex items-center gap-x-2">
              <div
                class="p-2 bg-indigo-400 rounded-full"
                :class="
                  reversedTransaction[index].type === 'send'
                    ? 'bg-indigo-400'
                    : 'bg-green-400'
                "
              >
                <Icon
                  :icon="
                    reversedTransaction[index].type === 'send'
                      ? 'system-uicons:paper-plane'
                      : 'fluent:money-hand-20-regular'
                  "
                  class="text-gray-900 h-6 w-6"
                />
              </div>
              <span class="text-white text-sm">{{
                reversedTransaction[index].type === "send"
                  ? "Send transaction"
                  : "Receive fund"
              }}</span>
            </div>
            <!-- Date -->
            <div class="col-span-2 flex items-center gap-x-2">
              <div class="p-1 bg-gray-700 rounded-full">
                <Icon icon="ic:baseline-date-range" class="text-gray-400" />
              </div>
              <span class="text-gray-400 text-sm">{{
                reversedTransaction[index].date
              }}</span>
            </div>
            <!-- Amount -->
            <div class="flex items-center text-white text-sm">
              ${{ reversedTransaction[index].amount }}
            </div>
            <!-- Balance -->
            <div class="flex items-center text-white text-sm">
              ${{ reversedTransaction[index].balance }}
            </div>
          </div>
          <div v-if="index % 2 === 0" class="w-full h-px bg-gray-700 my-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUpdated, computed, defineAsyncComponent } from "vue";

const BaseModal = defineAsyncComponent(() => import('./Base Components/BaseModal.vue'))

import { useDashboardStore } from "../stores/useDashboard";

const dashboard = useDashboardStore();

const transactions = dashboard.recentTransactionData;

const reversedTransaction = transactions.reverse();

const modalIsVisible = ref(false);
const btnRef = ref(null);

function openModal() {
  modalIsVisible.value = true;
}

function closeModal() {
  modalIsVisible.value = false;
  btnRef.value.focus();
}

///////////////////
// Pagination
///////////////////

const currentPage = ref(1);
const rowsPerPage = ref(5);
const currentList = ref(null);
const totalPages = ref(1);
const refArray = ref([]);

function changePage(event) {
  activeBtn(event.target);
  currentPage.value = parseInt(event.target.textContent);
  paginateList();
}

function NextPage() {
  if (currentPage.value === totalPages.value) {
    return;
  }

  currentPage.value += 1;
  activeBtn(refArray.value[currentPage.value - 1]);
  paginateList();
}

function PreviousPage() {
  if (currentPage.value === 1) {
    return;
  }

  currentPage.value -= 1;
  activeBtn(refArray.value[currentPage.value - 1]);
  paginateList();
}

function activeBtn(el) {
  let currentBtn = document.querySelector(".bg-green-300");
  currentBtn.classList.remove("bg-green-300", "text-black", "border-green-300");
  currentBtn.classList.add("border-white", "text-white");
  currentBtn.removeAttribute("aria-current");

  el.classList.remove("border-white", "text-white");
  el.classList.add("bg-green-300", "text-black", "border-green-300");
  el.setAttribute("aria-current", "page");
}

function paginateList() {
  const page = currentPage.value - 1;
  const start = page * rowsPerPage.value;
  const end = start + rowsPerPage.value;

  currentList.value = reversedTransaction.slice(start, end);
}

function createPageBtn() {
  totalPages.value = Math.ceil(reversedTransaction.length / rowsPerPage.value);
}

const ariaLabelPreviousBtn = computed(() => {
  if (currentPage.value !== 1) {
    return `previous page, current page ${currentPage.value}`;
  } else {
    return `previous page, unavailable, current page ${currentPage.value}`;
  }
});

const ariaLabelNextBtn = computed(() => {
  if (currentPage.value !== totalPages.value) {
    return `next page, current page ${currentPage.value}`;
  } else {
    return `next page, unavailable, current page ${currentPage.value}`;
  }
});

onMounted(() => {
  paginateList();
  createPageBtn();
});

onUpdated(() => {
  if (modalIsVisible.value) {
    currentPage.value = 1;
    paginateList();
    refArray.value[0].setAttribute("aria-current", "page");
    refArray.value[0].classList.remove("border-white", "text-white");
    refArray.value[0].classList.add(
      "bg-green-300",
      "text-black",
      "border-green-300"
    );
  }
});
</script>
