import { defineStore } from "pinia";

export const useTransferStore = defineStore("transfer", {
  state: () => ({
    deleteTransferModalIsVisible,
    deleteTransferCompany,
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
  },
});

let deleteTransferModalIsVisible = false;

let deleteTransferCompany = "";
