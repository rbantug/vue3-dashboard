import { defineStore } from "pinia";

export const useTransferStore = defineStore("transfer", {
  state: () => ({
    deleteTransferModalIsVisible,
    deleteTransferCompany,
    allCompanies,
    currentSubscription
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
    updateCurrentSubscription(val) {
      this.currentSubscription = val
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
