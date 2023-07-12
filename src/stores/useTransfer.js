import { defineStore } from "pinia";

export const useTransferStore = defineStore("transfer", {
  state: () => ({
    deleteTransferModalIsVisible,
    deleteTransferCompany,
    allCompanies,
    currentSubscription,
    selectSubscription,
    newTransferOptions,
    editTransferOptions,
    addNewTransferModalIsVisible,
    editTransferModalIsVisible,
    subTransactSummary,
    showSuccessWindow,
    tempSelectedSubscription,
    newSubBilling,
    durationErrorYear,
    durationErrorMonth,
    durationErrorCurrentYear,
    currentDate,
    currentMonth,
    currentYear,
    monthConditional,
    durationMonth,
    durationYear,
    monthArr,
    warningModalIsVisible,
    checkboxState,
    reminderChoice,
    descriptionVmodel,
    paymentMethodArr,
    paymentNetworkVModel
  }),
  actions: {
    deleteTransferFromNotification(company) {
      this.deleteTransferModalIsVisible = true;
      this.deleteTransferCompany = company;
    },
    openDeleteTransferModal() {
      this.deleteTransferModalIsVisible = true;
    },
    closeDeleteTransferModal() {
      this.deleteTransferModalIsVisible = false;
      this.deleteTransferCompany = "";
    },

    // Update state that controls the visibility of the modal content
    updateCurrentSubscription(array) {
      this.currentSubscription = array
    },
    updateSelectSubscription(boolean) {
      this.selectSubscription = boolean
    },
    updateNewTransferOptions(boolean) {
      this.newTransferOptions = boolean
    },
    updateEditTransferOptions(boolean) {
      this.editTransferOptions = boolean
    },
    updateEditTransferModalIsVisible(boolean) {
      this.editTransferModalIsVisible = boolean
    },
    updateAddNewTransferModalIsVisible(boolean) {
      this.addNewTransferModalIsVisible = boolean
    },
    updateSubTransactSummary(boolean) {
      this.subTransactSummary = boolean
    },
    updateShowSuccessWindow(boolean) {
      this.showSuccessWindow = boolean
    },

    // Update state used mostly in ScheduledTransferList.vue
    updateTempSelectedSubscription(obj) {
      this.tempSelectedSubscription = obj
    },

    // Update state used mostly in ScheduledTransferOptions.vue
    updateNewSubBilling(string) {
      this.newSubBilling = string
    },
    updateDurationErrorYear(boolean) {
      this.durationErrorYear = boolean
    },
    updateDurationErrorMonth(boolean) {
      this.durationErrorMonth = boolean
    },
    updateDurationErrorCurrentYear(boolean) {
      this.durationErrorCurrentYear = boolean
    },
    updateDurationMonth(monthString) {
      this.durationMonth = monthString
    },
    updateMonthConditional(number) {
      this.monthConditional = number
    },
    updateWarningModalIsVisible(boolean) {
      this.warningModalIsVisible = boolean
    },
    updateCheckboxState(boolean) {
      this.checkboxState = boolean
    },
    updateReminderChoice(string) {
      this.reminderChoice = string
    },
  },
});

let deleteTransferModalIsVisible = false;

let deleteTransferCompany = "";

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

const currentSubscription = [
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
];

const monthArr = [
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
]

// State that control the visibility of the modal itself
let addNewTransferModalIsVisible = false
let editTransferModalIsVisible = false

// State that controls the visibility of the modal's content
let selectSubscription = false
let newTransferOptions = false
let editTransferOptions = false
let subTransactSummary = false
let showSuccessWindow = false

// State that is mostly used in ScheduledTransferList.vue
let tempSelectedSubscription = null

// State that is mostly used in ScheduledTransferOptions.vue
let newSubBilling = 'Monthly'

let durationErrorYear = false
let durationErrorMonth = false
let durationErrorCurrentYear = false
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const monthConditional = currentMonth !== 11 ? currentMonth + 1 : 0
let durationYear = currentYear
let durationMonth = monthArr[monthConditional]

let checkboxState = false
let reminderChoice = ''

let descriptionVmodel = ''

let paymentMethodArr = [
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
]
let paymentNetworkVModel = paymentMethodArr[0]

// Warning Modal States
let warningModalIsVisible = false