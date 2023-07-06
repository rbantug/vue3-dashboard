<template>
  <!-- Add new and edit subscription  -->

  <BaseModal
    :show="addNewTransferModalIsVisible"
    @close="toggleModalNewTransfer"
    :dialog-custom-y-position="{
      'top-[20vh]': !editTransferModalIsVisible,
      'top-[13vh]': editTransferModalIsVisible,
    }"
    :disable-close-btn="processNewSubscription"
    :close-btn-keyboard-trap="setModalCloseBtnKeyboardTrap"
    :aria-label-prop="!editTransferModalIsVisible ? 'add new transfer' : 'edit existing transfer'"
    ref="baseModalRef"
  >
    <template #header>
      {{
        !editTransferModalIsVisible
          ? "Add New Transfer"
          : "Edit Existing Transfer"
      }}
    </template>
    <template #default>
      <div
        class="w-full h-[28rem] bg-gray-900 rounded-md"
        :class="{
          'h-[28rem]': !editTransferModalIsVisible,
          'h-[32rem]': editTransferModalIsVisible && editTransferOptions,
          'h-[28rem]': editTransferModalIsVisible && !editTransferOptions,
        }"
      >
        <!-- List of Subscriptions -->

        <ul
          v-if="selectSubscription"
          class="grid grid-cols-3 grid-rows-3 gap-y-2 w-[80%] mx-auto"
        >
          <template v-for="(company, index) in allCompanies">
            <li
              v-if="!isActiveSubscription.includes(company.company)"
              class="flex justify-center mt-5"
            >
              <button
                class="flex flex-col justify-center items-center w-20 h-20 rounded-md bg-gray-500 duration-300 hover:bg-white hover:ring-4 hover:ring-indigo-500"
                @click="goToTransferOptions"
                :aria-label="company.company"
                :data-company="company.company"
              >
                <img
                  class="object-scale-down h-9 w-16 pointer-events-none"
                  :src="company.icon1"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </li>
          </template>
        </ul>

        <!-- New Transfer Options -->
        <!-- Also reused when editing an existing transfer -->
        <div v-if="newTransferOptions || editTransferOptions">
          <div
            class="flex flex-col justify-center items-center w-full relative"
          >
            <button
              v-if="!editTransferOptions"
              class="flex items-center gap-x-2 pr-2 text-white hover:cursor-pointer absolute top-4 left-6"
              @click="backBtnNewTransfer"
              @keydown.enter.exact.stop.prevent="backBtnNewTransfer"
              @keydown.space.exact.stop.prevent="backBtnNewTransfer"
              aria-label="go back to the list of subscriptions"
            >
              <Icon
                icon="material-symbols:arrow-back-ios-new-rounded"
                class="h-5 w-5"
              />
              <span>Back</span>
            </button>
            <div
              class="flex justify-center items-center mt-4 w-32 h-15 rounded-md bg-gray-500"
            >
              <img
                class="object-scale-down h-12 w-24"
                :src="tempSelectedSubscription.icon1"
                alt=""
                aria-hidden="true"
              />
            </div>
            <h1 class="flex flex-col items-center text-white">
              <span>{{ tempSelectedSubscription.company }}</span>
              <span class="text-xl font-bold"
                >${{ outputPrice }} per {{ outputBillingText }}</span
              >
              <span v-if="editTransferModalIsVisible"
                >Start date: {{ startMonthAndYear.month }}
                {{ startMonthAndYear.year }}</span
              >
              <span v-if="editTransferModalIsVisible"
                >End date: {{ monthArr[durationMonthEditTransfer] }}
                {{ durationYearNotVModel }}</span
              >
            </h1>
            <div class="flex w-[90%]">
              <div class="flex flex-col w-full mt-10 text-white gap-y-4">
                <!-- Billing Cycle -->

                <div class="flex items-center gap-x-2">
                  <div>Billing Cycle</div>
                  <div
                    class="flex justify-center items-center gap-x-2 w-[10rem] h-9 bg-gray-500 shadow shadow-gray-500 rounded-md relative"
                  >
                    <button
                      class="h-7 w-[4.5rem] outline-none rounded-lg focus-visible:ring focus-visible:ring-white/50 z-10"
                      :class="{ 'text-gray-700': billingIsYearly }"
                      @click="changeBilling"
                      @keydown.enter.exact.stop.prevent="changeBilling"
                      @keydown.space.exact.stop.prevent="changeBilling"
                      ref="monthlyBtnRef"
                      :aria-checked="billingMonthlyAriaChecked"
                      aria-label="Billing Cycle Monthly"
                      role="switch"
                    >Monthly
                    </button>
                    <button
                      class="h-7 w-[4.5rem] outline-none rounded-lg focus-visible:ring focus-visible:ring-white/50 z-10"
                      :class="{ 'text-gray-700': billingIsMonthly }"
                      @click="changeBilling"
                      @keydown.enter.exact.stop.prevent="changeBilling"
                      @keydown.space.exact.stop.prevent="changeBilling"
                      ref="yearlyBtnRef"
                      :aria-checked="billingYearlyAriaChecked"
                      aria-label="Billing Cycle Yearly"
                      role="switch"
                    >Yearly
                    </button>
                    <div
                      class="absolute h-7 w-[4.5rem] rounded-md bg-green-800 shadow shadow-black/60 duration-300 z-1 pointer-events-none"
                      :class="{
                        'left-[0.25rem]': billingIsMonthly,
                        'left-[5.25rem]': billingIsYearly,
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Duration -->
                <div class="flex gap-x-2 items-center h-16">
                  <div>Duration</div>
                  <div>
                    <div class="flex items-center gap-x-2 relative">
                      <HeadlessUIListBox
                        v-if="newSubBilling === 'Monthly'"
                        :data-prop="monthArr"
                        :current-month="
                          editTransferModalIsVisible
                            ? durationMonthEditTransfer
                            : monthConditional
                        "
                        @emit-data="updateDurationMonth"
                        aria-label-prop="Transfer duration, month."
                        width-prop="w-[8.5rem]"
                      />
                      <input
                        type="number"
                        class="w-20 h-9 pl-2 rounded-lg text-gray-900 text-sm focus:outline-none border-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 shadow-md duration-300"
                        v-model="durationYear"
                        aria-label="Transfer duration, year."
                      />
                    </div>
                    <Transition name="durationError">
                      <div
                        v-if="durationErrorYear"
                        class="pt-1 text-sm text-red-500 font-bold absolute"
                        role="alert"
                      >
                        Invalid Year
                      </div>
                    </Transition>
                    <Transition name="durationError">
                      <div
                        v-if="durationErrorCurrentYear"
                        class="pt-1 text-sm text-red-500 font-bold absolute"
                        role="alert"
                      >
                        You can't choose the current year
                      </div>
                    </Transition>
                    <Transition name="durationError">
                      <div
                        v-if="durationErrorMonth"
                        class="pt-1 text-sm text-red-500 font-bold absolute"
                        role="alert"
                      >
                        Invalid Date
                      </div>
                    </Transition>
                  </div>
                </div>

                <!-- Reminder -->

                <div class="flex items-center gap-x-2 h-8">
                  <label for="reminder">Reminder</label>
                  <input
                    id="reminder"
                    type="checkbox"
                    v-model="checkboxState"
                    class="rounded focus:outline-none text-green-600 border-gray-300 focus-visible:ring-green-600 checked:ring-green-600 empty:ring-green-600 peer duration-300"
                  />
                  <HeadlessUIListBox
                    v-if="checkboxState"
                    aria-label-prop="reminder options"
                    :data-prop="reminderOptions"
                    :reminder-index="reminderIndex"
                    width-prop="w-[8rem]"
                    @emit-data="updateReminderChoice"
                  />
                </div>

                <!-- Description -->

                <div>
                  <label for="description" class="flex items-center gap-x-1">
                    <div>Description</div>
                    <span class="text-xs">(optional)</span>
                  </label>

                  <textarea
                    name=""
                    id="description"
                    cols="30"
                    rows="2"
                    class="mt-2 rounded-lg text-gray-900 text-sm focus:outline-none border-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-400 shadow-md resize-none duration-300"
                    v-model="descriptionVmodel"
                  ></textarea>
                </div>
              </div>

              <!-- Payment Method -->

              <div class="mt-10">
                <div class="text-white mb-2">Payment Method</div>
                <div class="flex flex-col gap-y-2">
                  <template v-for="card of paymentMethodArr" :key="card.id">
                    <div class="relative">
                      <input
                        type="radio"
                        :id="card.id"
                        name="paymentNetwork"
                        class="absolute opacity-0 peer"
                        :value="card"
                        v-model="paymentNetworkVModel"
                        :aria-label="ariaLabelPaymentMethod(card)"
                      />
                      <div :id="card.id" hidden></div>
                      <label
                        :for="card.id"
                        class="absolute w-[15rem] h-[5rem] z-10 hover:cursor-pointer"
                      >
                      </label>
                      <div
                        class="relative top-5 left-3 peer-checked:visible invisible"
                      >
                        <Icon
                          icon="material-symbols:check-circle-outline-rounded"
                          class="absolute w-8 h-8 text-white z-30"
                        />
                        <div
                          class="absolute w-6 h-6 rounded-full bg-green-900 left-1 top-1 z-20"
                        ></div>
                      </div>
                      <div
                        class="relative flex justify-end items-center w-[15rem] p-3 border-2 border-gray-400 rounded-lg focus-visible:border-white peer-checked:border-white duration-300"
                      >
                        <div
                          class="flex justify-center items-center w-10 h-10 bg-white rounded"
                        >
                          <Icon
                            :icon="
                              card.paymentNetwork === 'Visa'
                                ? 'cib:cc-visa'
                                : 'ri:mastercard-line'
                            "
                            class="h-8 w-8 text-gray-400"
                          />
                        </div>
                        <div class="flex flex-col text-white ml-3">
                          <span>**** {{ outputLast4CardNum(card) }}</span>
                          <span>Expires on {{ card.expireDate }}</span>
                        </div>
                        <div v-if="card.current">
                          <div
                            class="absolute bottom-[3.75rem] right-[0.5rem] w-20 h-6 text-center bg-green-700/20 text-green-400 border-2 border-green-400 rounded-xl text-sm px-2 z-20"
                          >
                            Current
                          </div>
                          <div
                            class="absolute bottom-[3.75rem] right-[0.5rem] w-20 h-6 bg-gray-900 rounded-xl z-10"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <a
                    href="#"
                    class="ring-2 ring-gray-400 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:ring-2 hover:ring-white text-gray-300 hover:text-white focus-visible:text-white duration-300"
                  >
                    <div
                      class="relative flex justify-end items-center w-[15rem] h-[4.5rem] p-3 rounded-lg"
                    >
                      <Icon
                        icon="iconamoon:sign-plus-bold"
                        class="absolute left-3 w-12 h-12 z-20"
                      />
                      <div class="w-[10rem] text-center z-20">
                        Add New Payment Method
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscription Transaction Summary -->

        <div v-if="subTransactSummary">
          <div class="flex flex-col w-full relative">
            <button
              v-if="!processNewSubscription"
              class="flex items-center gap-x-2 pr-2 text-white hover:cursor-pointer absolute top-4 left-6"
              @click="backBtnSummaryWindow"
              @keydown.enter.exact.stop.prevent="backBtnSummaryWindow"
              @keydown.space.exact.stop.prevent="backBtnSummaryWindow"
              aria-label="go back to transfer details"
            >
              <Icon
                icon="material-symbols:arrow-back-ios-new-rounded"
                class="h-5 w-5"
              />
              <span>Back</span>
            </button>
            <div class="text-white text-xl mt-10 mx-auto">Your summary</div>
            <div
              class="flex justify-center items-center gap-x-2 mt-2 mx-auto py-2 px-4 w-auto bg-gray-200/20 text-white rounded-xl"
            >
              <img
                :src="tempSelectedSubscription.icon1"
                alt=""
                class="w-20 h-10 object-contain"
                aria-hidden="true"
              />
              <div class="flex flex-col">
                <span>{{ tempSelectedSubscription.company }}</span>
                <span>{{ outputSummaryDuration }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-y-1 items-center mt-5">
              <span class="text-white"
                >To be paid {{ outputBillingText }}ly</span
              >
              <span class="text-white text-3xl">${{ outputPrice }}</span>
              <span class="text-gray-300"
                >Using {{ paymentNetworkVModel.paymentNetwork }} ****
                {{ outputLast4CardNum(paymentNetworkVModel) }}</span
              >
            </div>
            <div class="flex flex-col items-center mt-5">
              <span class="text-white">Reminder:</span>
              <span v-if="checkboxState" class="text-white"
                >{{ reminderChoice }} before the billing date</span
              >
              <span v-else class="text-indigo-400">not selected</span>
            </div>
            <div class="flex flex-col items-center mt-5">
              <span class="text-white">Description:</span>
              <span v-if="descriptionVmodel" class="text-white">{{
                descriptionVmodel
              }}</span>
              <span v-else class="text-indigo-400"
                >no description provided</span
              >
            </div>
          </div>
        </div>

        <!-- Success Window -->
        <div v-if="showSuccessWindow">
          <div class="flex justify-center items-center">
            <div class="flex flex-col items-center mt-[30%] relative">
              <div
                class="absolute h-8 w-8 top-1 bg-green-700 rounded-full z-0"
              ></div>
              <Icon
                icon="material-symbols:check-circle-outline-rounded"
                class="h-10 w-10 text-white z-10"
              />
              <span class="text-white text-2xl">Success!</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Bottom Buttons -->

      <div class="flex justify-center gap-x-2 mt-4 h-10">
        <button
          v-if="newTransferOptions || editTransferOptions"
          class="flex justify-center items-center py-2 pl-5 pr-3 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="subscriptionNextBtn"
          @keydown.enter.exact.stop.prevent="subscriptionNextBtn"
          @keydown.space.exact.stop.prevent="subscriptionNextBtn"
          @keydown.tab.exact="subscriptionNextBtnPreventDefault"
          aria-label="go to transfer summary page"
        >
          <span class="text-md">Next</span>
          <Icon icon="ic:round-navigate-next" class="h-7 w-7" />
        </button>
        <button
          v-if="editTransferOptions"
          class="flex justify-center items-center py-2 pl-5 pr-3 bg-gray-900 text-red-400 rounded-lg outline-none hover:ring-1 focus-visible:ring-1 focus-visible:ring-red-400 hover:ring-red-400 hover:text-red-400 duration-300"
          @click="openDeleteTransferModal"
          @keypress.enter="openDeleteTransferModal"
          @keydown.tab.exact.prevent
          ref="deleteBtnRef"
          aria-label="delete transfer"
        >
          <span class="text-md">Delete</span>
          <Icon icon="material-symbols:delete-outline" class="h-5 w-7" />
        </button>
        <button
          v-if="subTransactSummary && !editTransferModalIsVisible && !processNewSubscription"
          class="flex justify-center items-center py-2 px-6 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="addSubscription('submit')"
          @keydown.tab.exact.prevent
        >
          <span class="text-md">Submit</span>
        </button>
        <button
          v-if="subTransactSummary && editTransferModalIsVisible && !processNewSubscription"
          class="flex justify-center items-center py-2 px-6 bg-gray-900 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="addSubscription('update')"
          @keydown.tab.exact.prevent
        >
          <span class="text-md">Update</span>
        </button>
        <button
          v-if="subTransactSummary && processNewSubscription"
          class="flex justify-center items-center py-2 px-6 gap-x-2 bg-gray-900 text-gray-200 rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @keydown.tab.exact.prevent
          disabled
          role="alert"
        >
          <Icon icon="eos-icons:loading" class="h-6 w-6" />
          <span class="text-md">Processing...</span>
        </button>
      </div>
    </template>
  </BaseModal>

  <!-- Warning dialog box regarding subscription duratrion -->

  <BaseWarningModal
    :warning-modal-is-visible="warningModalIsVisible"
    @emit-yes-btn="goToSubTransactSummary"
    @emit-no-btn="closeWarningModal"
    modal-height="h-[21rem]"
    modal-width="w-[21rem]"
    icon-color="indigo"
  >
    <template v-slot:default>
      <span class="text-center"
        >We noticed that you chose to pay per month but you're planning to pay
        for a year or more on your subscription.</span
      ><span>Do you still want to proceed?</span>
    </template>
  </BaseWarningModal>

  <!-- Warning dialog box regarding deleting subscription -->

  <BaseWarningModal
    :warning-modal-is-visible="dashboard.deleteTransferModalIsVisible"
    @emit-yes-btn="deleteTransfer"
    @emit-no-btn="closeDeleteTransferModal"
    modal-height="h-[17rem]"
    modal-width="w-[21rem]"
    icon-color="red"
  >
    <template v-slot:default>
      <span class="text-center"
        >Do you want to remove
        {{
          dashboard.deleteTransferCompany || tempSelectedSubscription.company
        }}
        from your list of subscriptions?</span
      >
    </template>
  </BaseWarningModal>

  <!-- Main Component -->

  <div class="flex">
    <div
      class="flex flex-col items-center justify-between rounded-2xl bg-gray-900 w-full p-5 mr-5"
    >
      <!-- title and button -->
      <div class="flex justify-between items-center w-full mb-4">
        <h2 class="text-white">Scheduled Transfer</h2>
        <button
          class="flex items-center gap-x-1 p-2 bg-gray-700 text-gray-200 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300"
          @click="toggleModalNewTransfer"
          ref="addNewBtnRef"
          aria-label="add new scheduled transfer"
        >
          <Icon icon="ic:baseline-plus" class="h-4 w-4" />
          <span class="text-sm ml-1">Add New</span>
        </button>
      </div>

      <!-- Subscriptions Carousel -->

      <div class="mb-4 mx-auto w-[21rem]">
        <carousel
          :items-to-show="outputCarouselItemsToShow"
          class="flex justify-center"
        >
          <slide
            v-for="(sub, index) in carouselSubscription"
            :key="index"
            class="flex flex-col justify-start gap-y-4 py-2 rounded-xl overflow-hidden outline-none bg-gray-700 duration-300"
            :class="{
              'cursor-pointer hover:bg-indigo-500 scale-90 hover:scale-100 focus-visible:bg-indigo-500 focus-visible:scale-100':
                editTransferEnabled,
              'scale-95': !editTransferEnabled,
            }"
            style="width: 7rem"
            @click="selectEditTransfer(sub)"
            @keydown.enter.exact.stop.prevent="selectEditTransfer(sub)"
            @keydown.space.exact.stop.prevent="selectEditTransfer(sub)"
            @keydown.escape.exact.stop.prevent="cancelEditTransfer"
            :tabindex="editTransferEnabled ? 0 : -1"
            ref="carouselRefList"
          >
            <div
              class="absolute bg-gray-500 h-[3rem] w-[10rem] top-[-1rem]"
            ></div>
            <img
              :src="sub.icon2 || sub.icon1"
              :alt="sub.company"
              class="flex justify-center h-5 w-16 object-contain z-0"
            />
            <span class="text-white text-xs font-bold"
              >${{
                sub.billing === "Monthly" ? sub.amountMonth : sub.amountYear
              }}/{{ sub.billing === "Monthly" ? "month" : "year" }}</span
            >
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>

      <!-- Edit Button -->

      <div class="flex w-40">
        <button
          class="flex justify-center w-full py-2 bg-gray-700 text-white text-sm rounded-xl outline-none duration-200"
          :class="{
            'bg-indigo-400 text-black font-bold hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white':
              editTransferEnabled,
            'hover:ring-1 hover:ring-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white':
              !editTransferEnabled,
          }"
          @click="startEditTransfer"
          @keydown.enter.exact.stop.prevent="startEditTransfer"
          @keydown.space.exact.stop.prevent="startEditTransfer"
          ref="editBtnRef"
          :aria-label="editTransferBtnLabel"
        >
          {{ editTransferBtnLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import BaseModal from "./Base Components/BaseModal.vue";
import BaseWarningModal from "./Base Components/BaseWarningModal.vue";
import HeadlessUIListBox from "./Base Components/HeadlessUIListBox.vue";
import { toast } from "vue3-toastify";
import { getRandomNumber } from "../composables-and-reusable-logic/getRandomNumber";
import { useDashboardStore } from "../stores/useDashboard";

const dashboard = useDashboardStore();

// Refs for focusing elements
const addNewBtnRef = ref();
const editBtnRef = ref();

const allCompanies = [
  {
    company: "Youtube",
    icon1: "src/assets/images/YouTube_Logo_2017.svg.png",
    icon2: "src/assets/images/512px-YouTube_dark_logo_2017.svg.png",
    amountMonth: 2.99,
    amountYear: 27.99,
  },
  {
    company: "Netflix",
    icon1: "src/assets/images/Netflix_2015_logo.svg.png",
    amountMonth: 15.49,
    amountYear: 148.99,
  },
  {
    company: "Spotify",
    icon1: "src/assets/images/Spotify_logo_with_text.svg.png",
    amountMonth: 9.99,
    amountYear: 95.99,
  },
  {
    company: "Sirius XM",
    icon1: "src/assets/images/SIRI_BIG.png",
    icon2: "src/assets/images/SIRI_BIG.D.png",
    amountMonth: 4.99,
    amountYear: 47.99,
  },
  {
    company: "Apple Music",
    icon1: "src/assets/images/AppleMusic_2019.svg.png",
    amountMonth: 10.99,
    amountYear: 105.59,
  },
  {
    company: "Amazon Music",
    icon1: "src/assets/images/Amazon_music_logo.svg.png",
    amountMonth: 8.99,
    amountYear: 86.29,
  },
  {
    company: "Amazon Prime Video",
    icon1: "src/assets/images/Amazon_Prime_Video_logo.svg.png",
    amountMonth: 8.99,
    amountYear: 86.29,
  },
  {
    company: "Hulu",
    icon1: "src/assets/images/Hulu_Logo.svg.png",
    amountMonth: 7.99,
    amountYear: 76.99,
  },
  {
    company: "Paramount+",
    icon1: "src/assets/images/Paramount+_logo.svg.png",
    amountMonth: 3.29,
    amountYear: 31.59,
  },
  {
    company: "Peacock",
    icon1: "src/assets/images/799px-NBCUniversal_Peacock_Logo.svg.png",
    amountMonth: 4.99,
    amountYear: 47.99,
  },
  {
    company: "HBO Max",
    icon1: "src/assets/images/HBO_Max_Logo.svg.png",
    amountMonth: 15.99,
    amountYear: 153.99,
  },
  {
    company: "Youtube Music",
    icon1: "src/assets/images/YT_Music.svg.png",
    amountMonth: 2.29,
    amountYear: 21.99,
  },
  {
    company: "Disney+",
    icon1: "src/assets/images/Disney+_logo.svg.png",
    amountMonth: 5.99,
    amountYear: 57.59,
  },
];

const currentSubscription = ref([
  {
    company: "Youtube",
    subStartDate: 1616256000000,
    billing: "Monthly",
    subEndDate: 1688918400000,
    reminderIsActive: false,
    reminderMsg: "none",
    description: null,
    paymentMethodId: "9023953423",
  },
  {
    company: "Netflix",
    subStartDate: 1623686400000,
    billing: "Yearly",
    subEndDate: 1686758400000,
    reminderIsActive: true,
    reminderMsg: "one month",
    description: "Mindlessly consuming content is my purpose in life",
    paymentMethodId: "9023897234",
  },
  {
    company: "Spotify",
    subStartDate: 1632153600000,
    billing: "Monthly",
    subEndDate: 1668960000000,
    reminderIsActive: true,
    reminderMsg: "one day",
    description: "It is better to pay for a subscription than to own things.",
    paymentMethodId: "9023953423",
  },
]);

const carouselSubscription = ref([]);
const tempSelectedSubscription = ref();
const newSubBilling = ref("Monthly");
const monthlyBtnRef = ref();
const yearlyBtnRef = ref();

const addNewTransferModalIsVisible = ref(false);
const selectSubscription = ref(true);
const newTransferOptions = ref(false);
const subTransactSummary = ref(false);
const setModalCloseBtnKeyboardTrap = ref(false)

/////////////////////////////////////
// Add New Transfer
/////////////////////////////////////

function toggleModalNewTransfer() {
  // prevent the keyboard trap on the close button in the modal. The keyboard trap is for the success window at the end of the new transfer process. 
  setModalCloseBtnKeyboardTrap.value = false

  // prevent modal from being closed while the new transfer/subscription is being processed
  if (processNewSubscription.value) return;

  // Edit transfer button will be reverted back to its default state
  if (editTransferEnabled.value) {
    editTransferEnabled.value = false;
  }

  // toggle add new subscription modal visibility
  addNewTransferModalIsVisible.value = !addNewTransferModalIsVisible.value;

  // reset ALL state inside add new AND edit subscription modal
  tempSelectedSubscription.value = [];
  selectSubscription.value = true;
  newTransferOptions.value = false;
  subTransactSummary.value = false;
  showSuccessWindow.value = false;
  newSubBilling.value = "Monthly";
  monthConditional.value =
    currentMonth.value !== 11 ? currentMonth.value + 1 : 0;
  durationYear.value = currentYear;
  durationErrorMonth.value = false;
  durationErrorYear.value = false;
  durationErrorCurrentYear.value = false;
  checkboxState.value = false;
  reminderChoice.value = "one day";
  descriptionVmodel.value = null;
  paymentNetworkVModel.value = paymentMethodArr.value[0];

  if(!addNewTransferModalIsVisible.value) {
    addNewBtnRef.value.focus()
  }

  if(editTransferModalIsVisible.value) {
    editBtnRef.value.focus()
  }

  // edit subscription related states
  editTransferModalIsVisible.value = false;
  editTransferOptions.value = false;
}

function goToTransferOptions(event) {
  selectSubscription.value = false;
  newTransferOptions.value = true;
  tempSelectedSubscription.value = allCompanies.find(
    (company) => company.company === event.target.dataset.company
  );
}

function createCarouselSubscription() {
  carouselSubscription.value = [];
  currentSubscription.value.forEach((sub) => {
    let index = allCompanies.findIndex(
      (company) => company.company === sub.company
    );
    carouselSubscription.value.push({
      ...allCompanies[index],
      billing: sub.billing,
    });
  });
}

const outputCarouselItemsToShow = computed(() => {
  if (carouselSubscription.value.length > 3) {
    return 3;
  } else {
    return carouselSubscription.value.length;
  }
});

const isActiveSubscription = computed(() =>
  currentSubscription.value.map((sub) => sub.company)
);

function backBtnNewTransfer() {
  newTransferOptions.value = false;
  selectSubscription.value = true;
}

const billingMonthlyAriaChecked = ref(true)
const billingYearlyAriaChecked = ref(false)

function changeBilling(event) {
  newSubBilling.value = event.target.textContent.trim();

  if (event.target.textContent.trim() === "Monthly") {
    billingMonthlyAriaChecked.value = true
    billingYearlyAriaChecked.value = false
    durationErrorYear.value = false;
  }

  if (event.target.textContent.trim() === "Yearly") {
    billingMonthlyAriaChecked.value = false
    billingYearlyAriaChecked.value = true
    durationErrorMonth.value = false;
  }
}

const billingIsMonthly = computed(() => newSubBilling.value === "Monthly");

const billingIsYearly = computed(() => newSubBilling.value === "Yearly");

const outputBillingText = computed(() =>
  newSubBilling.value === "Monthly" ? "month" : "year"
);

const outputPrice = computed(() => {
  if (newSubBilling.value === "Monthly")
    return tempSelectedSubscription.value.amountMonth;

  if (newSubBilling.value === "Yearly")
    return tempSelectedSubscription.value.amountYear;
});

///////////////
// Duration
///////////////

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = currentDate.getFullYear();

const monthArr = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const monthConditional = ref(
  currentMonth.value !== 11 ? currentMonth.value + 1 : 0
); // show the next month

const durationYear = ref(currentYear);
const durationMonth = ref(monthArr.value[monthConditional.value]);
const durationErrorYear = ref(false);
const durationErrorMonth = ref(false);
const durationErrorCurrentYear = ref(false);

function updateDurationMonth(data) {
  durationMonth.value = data;
  monthConditional.value = monthArr.value.findIndex(
    (month) => month === durationMonth.value
  );
}

//////////////////
// Reminder
//////////////////

const checkboxState = ref(false);
const reminderChoice = ref();

function updateReminderChoice(data) {
  reminderChoice.value = data;
}

const reminderOptions = ref(["one day", "one week", "one month"]);

////////////////////
// Description
////////////////////

const descriptionVmodel = ref();

///////////////////
// Payment Method
///////////////////

const paymentMethodArr = ref([
  {
    id: "9023897234",
    paymentNetwork: "Visa",
    cardNumber: "3232 2323 3232 3232",
    expireDate: "2/23",
    cvc: 1234,
    status: "active",
    current: true,
  },
  {
    id: "9023953423",
    paymentNetwork: "MasterCard",
    cardNumber: "7235 1287 5432 8711",
    expireDate: "5/26",
    cvc: 5678,
    status: "active",
    current: false,
  },
]);

const paymentNetworkVModel = ref(paymentMethodArr.value[0]);

function ariaLabelPaymentMethod(card) {
  return `Payment method. ${
    card.paymentNetwork
  }. Last 4 digits of card number ${card.cardNumber.slice(
    15,
    card.cardNumber.length
  )}. Expires on ${monthArr.value[parseInt(card.expireDate.charAt(0)) - 1]}, ${
    2000 + parseInt(card.expireDate.slice(2))
  }`;
}

function outputLast4CardNum(srcData) {
  return srcData.cardNumber.slice(15, srcData.cardNumber.length);
}

//////////////////////////
// Warning Dialog Box
//////////////////////////

const warningModalIsVisible = ref(false);

function goToSubTransactSummary() {
  if (!editTransferModalIsVisible.value) {
    newTransferOptions.value = false;
  } else {
    editTransferOptions.value = false;
  }
  subTransactSummary.value = true;
  warningModalIsVisible.value = false;
}

function closeWarningModal() {
  warningModalIsVisible.value = false;
  monthlyBtnRef.value.focus();
}

//////////////////////////
// Next Button
//////////////////////////

const totalDurationMonths = ref();

function subscriptionNextBtnPreventDefault(e) {
  if (!editTransferOptions.value) {
    e.preventDefault();
    return;
  }
}

function subscriptionNextBtn() {
  durationErrorYear.value = false;
  durationErrorMonth.value = false;
  durationErrorCurrentYear.value = false;

  // show error message for invalid year
  if (durationYear.value < currentYear) {
    durationErrorYear.value = true;
    return;
  }

  // show error message for selecting a date that is less than a month

  const durationInMilliseconds = Date.parse(
    `${currentDate.getDate()} ${durationMonth.value} ${durationYear.value}`
  );

  const monthToMillliseconds = 2629800000;

  totalDurationMonths.value = Math.round(
    (durationInMilliseconds - currentDate) / monthToMillliseconds
  );

  if (totalDurationMonths.value < 1) {
    durationErrorMonth.value = true;
    return;
  }

  // show error when billing cycle is yearly and user chose the current year
  if (newSubBilling.value === "Yearly" && durationYear.value === currentYear) {
    durationErrorCurrentYear.value = true;
    return;
  }

  // if billing cycle is per month and client opted to subscribe for a year or more, show a dialog box to inform client that they can choose to pay per year at a discounted price

  if (newSubBilling.value === "Monthly" && totalDurationMonths.value > 11) {
    warningModalIsVisible.value = true;
    return;
  }

  // Go to subscription transcription summary (Next page)
  if (!editTransferModalIsVisible.value) {
    newTransferOptions.value = false;
  } else {
    editTransferOptions.value = false;
  }
  subTransactSummary.value = true;
  console.log(backBtnSummaryRef.value)
  baseModalRef.value?.closeBtnRef.focus()
}

/////////////////////
// Subscription Summary Page
/////////////////////

function backBtnSummaryWindow() {
  if (!editTransferModalIsVisible.value) {
    newTransferOptions.value = true;
  } else {
    editTransferOptions.value = true;
  }
  subTransactSummary.value = false;
}

const outputSummaryDuration = computed(() => {
  const tempYear = totalDurationMonths.value / 12;
  const tempYearInteger = Math.floor(tempYear);

  // if the user selected "Monthly" as the billing cycle but set the duration to exactly 1, 2, 3... years.
  if (
    newSubBilling.value === "Monthly" &&
    totalDurationMonths.value > 11 &&
    Number.isInteger(tempYear)
  ) {
    return `${tempYearInteger} year${tempYearInteger > 1 ? "s" : ""}`;
  }

  // if the user selected "Monthly" as the billing cycle but the duration is more than 1 year plus a few months.
  if (
    newSubBilling.value === "Monthly" &&
    totalDurationMonths.value > 11 &&
    !Number.isInteger(tempYear)
  ) {
    const tempMonth = totalDurationMonths.value - tempYearInteger * 12;
    return `${tempYearInteger} year${
      tempYearInteger > 1 ? "s" : ""
    } and ${tempMonth} month${tempMonth > 1 ? "s" : ""}`;
  }

  // if the user selected "Monthly" and will pay for less than 12 months
  if (newSubBilling.value === "Monthly" && totalDurationMonths.value < 12) {
    return `${totalDurationMonths.value} month${
      totalDurationMonths.value > 1 ? "s" : ""
    }`;
  }

  // if the user selected "Yearly" as the billing cycle
  if (newSubBilling.value === "Yearly") {
    return `${tempYearInteger} year${tempYearInteger > 1 ? "s" : ""}`;
  }
});

const processNewSubscription = ref(false);
const showSuccessWindow = ref(false);
const baseModalRef = ref()

function addSubscription(type) {
  processNewSubscription.value = true;

  function getSubEndDate() {
    if (newSubBilling.value === "Monthly") {
      return Date.parse(
        `${currentDate.getDate()} ${durationMonth.value} ${durationYear.value}`
      );
    }

    if (newSubBilling.value === "Yearly") {
      return Date.parse(
        `${currentDate.getDate()} ${monthArr.value[currentDate.getMonth()]} ${
          durationYear.value
        }`
      );
    }
  }

  setTimeout(() => {
    let notificationMsg = ''
    const data = {
      company: tempSelectedSubscription.value.company,
      billing: newSubBilling.value,
      subStartDate: Date.now(),
      subEndDate: getSubEndDate(),
      reminderIsActive: checkboxState.value,
      reminderMsg: !checkboxState.value ? "none" : reminderChoice.value,
      description: descriptionVmodel.value,
      paymentMethodId: paymentNetworkVModel.value.id,
    }

    if(type === 'submit') {
      currentSubscription.value.unshift(data);
      notificationMsg = `${tempSelectedSubscription.value.company} was added to your scheduled transfer`
    }

    if(type === 'update') {
      const index = currentSubscription.value.findIndex(sub => sub.company === tempSelectedSubscription.value.company)
      currentSubscription.value[index] = data
      notificationMsg = `${tempSelectedSubscription.value.company} subscription details were updated. ` 
    }

    subTransactSummary.value = false;
    processNewSubscription.value = false;
    showSuccessWindow.value = true;
    setModalCloseBtnKeyboardTrap.value = true
    baseModalRef.value?.closeBtnRef.focus()

    createCarouselSubscription();

    // Toast and Notification
    toast.success(
      notificationMsg,
      {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
        transition: toast.TRANSITIONS.SLIDE,
      }
    );

    const notificationId =
      dashboard.lastNotificationId + Math.floor(getRandomNumber(1, 500));
    dashboard.updateNotifications({
      id: notificationId,
      type: "transfer",
      status: "successful",
      company: tempSelectedSubscription.value.company,
      message: notificationMsg,
      showCancelBtn: false,
      showRemoveBtn: true,
    });
    dashboard.updateLastNotificationId(notificationId);
  }, 5000);
}

/////////////////////////////////////
// Edit and Remove Transfer
/////////////////////////////////////

// Edit Transfer

const editTransferEnabled = ref(false);
const editTransferModalIsVisible = ref(false);
const editTransferOptions = ref(false);
const durationMonthEditTransfer = ref();
const durationYearNotVModel = ref();
const reminderIndex = ref(0);
const startMonthAndYear = ref({ month: null, year: null });
const carouselRefList = ref([])

const editTransferBtnLabel = computed(() => {
  if(!editTransferEnabled.value) {
    return "Edit Transfer"
  } else {
    return "Cancel Edit"
  }
})

function startEditTransfer(e) {
  editTransferEnabled.value = !editTransferEnabled.value;

  if(editTransferEnabled.value) {
    carouselRefList.value[0].$el.focus()
  }
}

function cancelEditTransfer() {
  editTransferEnabled.value = false
  editBtnRef.value.focus()
}

function selectEditTransfer(sub) {
  if (!editTransferEnabled.value) return;

  tempSelectedSubscription.value = sub;

  const selectedSubscriptionInfo = currentSubscription.value.find(
    (comp) => comp.company === sub.company
  );

  // Start Date
  const startDate = new Date(selectedSubscriptionInfo.subStartDate);

  startMonthAndYear.value.month = monthArr.value[startDate.getMonth()];

  startMonthAndYear.value.year = startDate.getFullYear();

  // Billing Cycle
  newSubBilling.value = selectedSubscriptionInfo.billing;

  if(selectedSubscriptionInfo.billing === 'Monthly') {
    billingMonthlyAriaChecked.value = true
    billingYearlyAriaChecked.value = false
  }

  if(selectedSubscriptionInfo.billing === 'Yearly') {
    billingMonthlyAriaChecked.value = false
    billingYearlyAriaChecked.value = true
  }

  // Duration
  const endDate = new Date(selectedSubscriptionInfo.subEndDate);

  durationMonthEditTransfer.value = endDate.getMonth();
  durationYear.value = endDate.getFullYear();
  durationYearNotVModel.value = durationYear.value;

  // Reminder
  checkboxState.value = selectedSubscriptionInfo.reminderIsActive;

  reminderIndex.value = reminderOptions.value.findIndex(
    (reminder) => reminder === selectedSubscriptionInfo.reminderMsg
  );

  // Description
  descriptionVmodel.value = selectedSubscriptionInfo.description;

  // Payment Method
  const getPaymentMethodObj = paymentMethodArr.value.find(
    (pay) => pay.id === selectedSubscriptionInfo.paymentMethodId
  );

  paymentNetworkVModel.value = getPaymentMethodObj;

  // Set State
  addNewTransferModalIsVisible.value = true;
  selectSubscription.value = false;
  editTransferModalIsVisible.value = true;
  editTransferOptions.value = true;
  editTransferEnabled.value = false;
}

// Delete Transfer

const deleteBtnRef = ref(null);

function openDeleteTransferModal() {
  dashboard.openDeleteTransferModal();
}

function closeDeleteTransferModal() {
  dashboard.closeDeleteTransferModal();
  deleteBtnRef.value.focus();
}

function deleteTransfer() {
  // get the company name for the notification and toast
  const companyToBeDeleted =
    tempSelectedSubscription.value.company || dashboard.deleteTransferCompany;

  // Remove the "Remove transfer" button from the "New transfer added notification"
  dashboard.removeTransferBtnFromNotification(companyToBeDeleted);

  // update the carousel
  currentSubscription.value = currentSubscription.value.filter(
    (sub) => sub.company !== companyToBeDeleted
  );

  createCarouselSubscription();

  // reset states to close modals
  editTransferModalIsVisible.value = false;
  addNewTransferModalIsVisible.value = false;

  // Toast and Notification
  toast.info(`${companyToBeDeleted} was removed from your scheduled transfer`, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "dark",
    transition: toast.TRANSITIONS.SLIDE,
  });

  const notificationId =
    dashboard.lastNotificationId + Math.floor(getRandomNumber(1, 500));
  dashboard.updateNotifications({
    id: notificationId,
    type: "transfer",
    status: "deleted",
    company: companyToBeDeleted,
    message: `${companyToBeDeleted} was removed from your scheduled transfer`,
    showCancelBtn: false,
    showRemoveBtn: false,
  });
  dashboard.updateLastNotificationId(notificationId);

  dashboard.closeDeleteTransferModal();
}

onMounted(() => {
  carouselRefList.value = []
  createCarouselSubscription();
});
</script>

<style>
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: white;
}

.carousel__next:hover,
.carousel__prev:hover {
  outline: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width))
    white;
  color: white;
  border-radius: 10px;
}

.carousel__next:focus-visible,
.carousel__prev:focus-visible {
  outline: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width))
    white;
  color: white;
  border-radius: 10px;
}

.carousel__prev {
  left: -35px;
}

.carousel__next {
  right: -35px;
}

.durationError-enter-from,
.durationError-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.durationError-enter-active,
.durationError-leave-active {
  transition: all 0.3s ease;
}

.durationError-enter-to,
.durationError-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
