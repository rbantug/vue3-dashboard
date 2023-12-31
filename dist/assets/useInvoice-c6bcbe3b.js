import { defineStore } from "pinia";

export const useInvoicesStore = defineStore("invoice", {
  state: () => ({
    invoiceData,
    addInvoiceModalIsVisible,
    stateInvoicesViewAll,
    invoiceDataToBeRemoved,
    deleteInvoiceModalIsVisible,
    lastInvoiceId,
    clientList,
    outputPendingBar,
    hasPending,
    hasSuccess,
  }),
  actions: {
    updateAddInvoiceModalIsVisible(boolean) {
      this.addInvoiceModalIsVisible = boolean;
    },
    updateStateInvoicesViewAll(boolean) {
      this.stateInvoicesViewAll = boolean;
    },
    updateInvoices(obj) {
      this.invoiceData.unshift(obj);
    },
    showInvoicesViewAll() {
      this.stateInvoicesViewAll = true;
    },
    closeInvoicesViewAll() {
      this.stateInvoicesViewAll = false;
    },
    updateLastInvoiceId() {
      this.lastInvoiceId = this.invoiceData[0].id;
    },
    updateLastInvoiceIdFormSubmit(number) {
      this.lastInvoiceId = number;
    },
    deleteSingleInvoice(id) {
      const index = this.invoiceData.findIndex((invoice) => invoice.id === id);

      if (index === -1) return;

      this.invoiceData.splice(index, 1);
    },
    updateInvData2BeRemoved(val) {
      this.invoiceDataToBeRemoved = val;
    },
    updateDelInvModalVisibility(val) {
      this.deleteInvoiceModalIsVisible = val;
    },
    updateHasPending(boolean) {
      this.hasPending = boolean;
    },
    updateHasSuccess(boolean) {
      this.hasSuccess = boolean;
    },

    // outputPendingBar related actions
    updateEntireOPB(OPB) {
      this.outputPendingBar = OPB;
    },
    updateOPBAddNewProp(propId) {
      this.outputPendingBar.addNewProp(propId);
    },
    updateOPBPropValue(propName, val) {
      this.outputPendingBar[propName] = val;
    },
    OPBRemoveProp(propId) {
      this.outputPendingBar.removeProp(propId);
    },

    // Actions related to altering the state of the pending and successful message
    checkPendings() {
      //const currentInvoiceData = invoicesStore.invoiceData;
      const index = this.invoiceData.findIndex(
        (invoice) => invoice.status === "Pending"
      );

      if (index === -1) {
        this.updateHasPending(false);
      }

      //invoiceArr.value = [...invoicesStore.invoiceData];
    },
    checkSuccess() {
      //const currentInvoiceData = invoicesStore.invoiceData;
      const index = this.invoiceData.findIndex(
        (invoice) => invoice.status === "Successful"
      );

      if (index !== -1) {
        this.updateHasSuccess(true);
      } else {
        this.updateHasSuccess(false);
      }
    },
  },
  getters: {
    outputInvoiceData(state) {
      return state.invoiceData;
    },
  },
});

let invoiceData = [
  {
    id: 138711,
    date: "Feb 21, 2021",
    client: "Cow Escoda",
    clientPhoto: "assets/images/avif_images/cow.avif",
    amount: 1550.0,
    status: "Successful",
  },
  {
    id: 126511,
    date: "Nov 15, 2020",
    client: "Bird Santos",
    clientPhoto: "assets/images/avif_images/bird.avif",
    amount: 1200,
    status: "Successful",
  },
  {
    id: 123456,
    date: "Sep 3, 2020",
    client: "Fish Lim",
    clientPhoto: "assets/images/avif_images/fish.avif",
    amount: 600,
    status: "Successful",
  },
];

const clientList = [
  {
    name: "Fish Lim",
    photo: "assets/images/avif_images/fish.avif",
  },
  {
    name: "Bird Santos",
    photo: "assets/images/avif_images/bird.avif",
  },
  {
    name: "Cow Escoda",
    photo: "assets/images/avif_images/cow.avif",
  },
  {
    name: "Crane Popcorn",
    photo: "assets/images/avif_images/crane.avif",
  },
  {
    name: "Frog Tuiles",
    photo: "assets/images/avif_images/frog.avif",
  },
  {
    name: "Axolotl Joconde",
    photo: "assets/images/avif_images/axolotl.avif",
  },
];

// State that controls modal visibility
const addInvoiceModalIsVisible = false;
const stateInvoicesViewAll = false;
let deleteInvoiceModalIsVisible = false;

// element ref for focusing when using keyboard navigation

let invoiceDataToBeRemoved = null;
let lastInvoiceId = 0;

// State that controls messages that shows up when there are no invoices

const hasPending = null;
const hasSuccess = null;

// Misc

const outputPendingBar = {
  addNewProp(name) {
    this[name] = 0;
    this[`${name}SI`] = null;
    this[`${name}ST`] = null;
    this[`${name}invoiceId`] = name;
    this[`${name}notificationId`] = null;
  },
  removeProp(name) {
    delete this[name];
    delete this[`${name}SI`];
    delete this[`${name}ST`];
    delete this[`${name}invoiceId`];
  },
};
