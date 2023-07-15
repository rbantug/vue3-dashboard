import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        recentTransactionData,
        pendingNotifyIdDeleteInvoice,
        msgNotification,
        notifications,
        notifyPingIsVisible,
        msgPingIsVisible,
        lastNotificationId,
        outputPendingBar,
        addedAccountsList,
    }),
    getters: {},
    actions: {
        removeMessage(id) {
          const index = this.msgNotification.findIndex(notify => notify.id === id)

          this.msgNotification.splice(index, 1)
        },
        toggleNotifyPing(boolean) {
          this.notifyPingIsVisible = boolean
        },
        toggleMsgPing(boolean) {
          this.msgPingIsVisible = boolean
        },
        updateNotifications(val) {
          this.notifications.unshift(val)
          this.toggleNotifyPing(true)
        },
        updateNotifyCancelBtn(id) {
          const index = this.notifications.findIndex(notify => notify.id === id)

          notifications[index].showCancelBtn = false
        },
        removeNotification(id) {
          const index = this.notifications.findIndex(notify => notify.id === id)

          this.notifications.splice(index, 1)
        },
        updateLastNotificationId(id) {
          this.lastNotificationId = id
        },
        updatePendingNotifyId(val) {
          this.pendingNotifyIdDeleteInvoice = val
        },
        updateOutputPendingBar(obj) {
          this.outputPendingBar = obj
        },
        addNewAccount(acct) {
          this.addedAccountsList.push(acct)
        },
        removeTransferBtnFromNotification(companyName) {
          const index = this.notifications.findIndex(notify => notify.company === companyName
          )
          if(index !== -1) {
            this.notifications[index].showRemoveBtn = false
          }
        },
    }   
    
})

const recentTransactionData = [
    {
      id: '000',
      type: 'receive',
      date: 'Jan 10, 2019',
      amount: 1100,
      balance: 1100
    },
    {
      id: '001',
      type: 'send',
      date: 'Jan 28, 2019',
      amount: 800,
      balance: 300
    },
    {
      id: '002',
      type: 'send',
      date: 'Feb 3, 2019',
      amount: 100,
      balance: 200
    },
    {
      id: '003',
      type: 'receive',
      date: 'Feb 16, 2019',
      amount: 1300,
      balance: 1500
    },
    {
      id: '004',
      type: 'receive',
      date: 'Feb 23, 2019',
      amount: 250,
      balance: 1750
    },
    {
      id: '005',
      type: 'send',
      date: 'Mar 1, 2019',
      amount: 340,
      balance: 1410
    },
    {
      id: '006',
      type: 'send',
      date: 'Apr 5, 2019',
      amount: 900,
      balance: 510
    },
    {
      id: '007',
      type: 'receive',
      date: 'May 19, 2019',
      amount: 4000,
      balance: 4510
    },
    {
      id: '008',
      type: 'send',
      date: 'Jun 11, 2019',
      amount: 1060,
      balance: 3450
    },
    {
      id: '009',
      type: 'send',
      date: 'Jun 28, 2019',
      amount: 700,
      balance: 2750
    },
    {
      id: '0010',
      type: 'receive',
      date: 'Jul 14, 2019',
      amount: 4000,
      balance: 6750
    }
  ]

let pendingNotifyIdDeleteInvoice = 0

const msgNotification = [
  {
    id: 1000,
    title: 'message 1',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, error!',
    imageSrc: 'src/assets/images/bird.jpg'
  },
  {
    id: 1001,
    title: 'message 2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum excepturi quae illo!',
    imageSrc: 'src/assets/images/frog.jpg'
  },
  {
    id: 1002,
    title: 'message 3',
    message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, odit esse omnis recusandae odio amet.',
    imageSrc: 'src/assets/images/cow.jpg'
  },
  {
    id: 1003,
    title: 'message 4',
    message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, odit esse omnis recusandae odio amet.',
    imageSrc: 'src/assets/images/axolotl.jpg'
  },
]

let notifications = []

let notifyPingIsVisible = false

let  msgPingIsVisible = true

let lastNotificationId = 100000

let outputPendingBar = null

let addedAccountsList = []