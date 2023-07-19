import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    pendingNotifyIdDeleteInvoice,
    msgNotification,
    notifications,
    notifyPingIsVisible,
    msgPingIsVisible,
    lastNotificationId,
  }),
  actions: {
    removeMessage(id) {
      const index = this.msgNotification.findIndex(
        (notify) => notify.id === id
      );

      this.msgNotification.splice(index, 1);
    },
    toggleNotifyPing(boolean) {
      this.notifyPingIsVisible = boolean;
    },
    toggleMsgPing(boolean) {
      this.msgPingIsVisible = boolean;
    },
    updateNotifications(val) {
      this.notifications.unshift(val);
      this.toggleNotifyPing(true);
    },
    updateNotifyCancelBtn(id, type = "transfer") {
      const index = this.notifications.findIndex((notify) => {
        if(type === 'transfer') return notify.id === id;
        if(type === 'invoice') return notify.invoiceId === id;
      });

      notifications[index].showCancelBtn = false;
    },
    removeNotification(id) {
      const index = this.notifications.findIndex((notify) => notify.id === id);

      this.notifications.splice(index, 1);
    },
    updateLastNotificationId(id) {
      this.lastNotificationId = id;
    },
    updatePendingNotifyId(val) {
      this.pendingNotifyIdDeleteInvoice = val;
    },
    removeTransferBtnFromNotification(companyName) {
      const index = this.notifications.findIndex(
        (notify) => notify.company === companyName
      );
      if (index !== -1) {
        this.notifications[index].showRemoveBtn = false;
      }
    },
  },
});

let pendingNotifyIdDeleteInvoice = 0;

const msgNotification = [
  {
    id: 1000,
    title: "message 1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, error!",
    imageSrc: "src/assets/images/bird.jpg",
  },
  {
    id: 1001,
    title: "message 2",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum excepturi quae illo!",
    imageSrc: "src/assets/images/frog.jpg",
  },
  {
    id: 1002,
    title: "message 3",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, odit esse omnis recusandae odio amet.",
    imageSrc: "src/assets/images/cow.jpg",
  },
  {
    id: 1003,
    title: "message 4",
    message:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, odit esse omnis recusandae odio amet.",
    imageSrc: "src/assets/images/axolotl.jpg",
  },
];

let notifications = [];

let notifyPingIsVisible = false;

let msgPingIsVisible = true;

let lastNotificationId = 100000;
