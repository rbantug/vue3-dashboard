import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        recentTransactionData,
        invoiceData,
        lastInvoiceId,
        invoiceDataToBeRemoved,
        deleteInvoiceModalIsVisible,
        pendingNotifyIdDeleteInvoice,
        clientList,
        msgNotification,
        notifications,
        notifyPingIsVisible,
        msgPingIsVisible,
        lastNotificationId,
        stateInvoicesViewAll,
        outputPendingBar,
        addedAccountsList,
        deleteTransferModalIsVisible,
        deleteTransferCompany,
    }),
    getters: {
        outputInvoiceData(state) {
            return state.invoiceData
        },
    },
    actions: {
        updateInvoices(obj) {
           this.invoiceData.unshift(obj)
        },
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
        showInvoicesViewAll() {
          this.stateInvoicesViewAll = true
        },
        closeInvoicesViewAll() {
          this.stateInvoicesViewAll = false
        },
        updateLastInvoiceId() {
          this.lastInvoiceId = this.invoiceData[0].id
        },
        deleteSingleInvoice(id) {
          const index = this.invoiceData.findIndex(invoice => invoice.id === id)

          if(index === -1) return

          this.invoiceData.splice(index, 1)
        },
        updateOutputPendingBar(obj) {
          this.outputPendingBar = obj
        },
        addNewAccount(acct) {
          this.addedAccountsList.push(acct)
        },
        deleteTransferFromNotification(company) {
          this.deleteTransferModalIsVisible = true
          this.deleteTransferCompany = company
          
        },
        removeTransferBtnFromNotification(companyName) {
          const index = this.notifications.findIndex(notify => notify.company === companyName
          )

          this.notifications[index].showRemoveBtn = false
        },
        openDeleteTransferModal() {
          this.deleteTransferModalIsVisible = true
        },
        closeDeleteTransferModal() {
          this.deleteTransferModalIsVisible = false
          this.deleteTransferCompany = ''
        }
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

let invoiceData = [
  {
    id: 138711,
    date: "Feb 21, 2021",
    client: "Cow Escoda",
    clientPhoto: "src/assets/images/cow.jpg",
    amount: 1550.0,
    status: "Successful",
  },
  {
    id: 126511,
    date: "Nov 15, 2020",
    client: "Bird Santos",
    clientPhoto: "src/assets/images/bird.jpg",
    amount: 1200,
    status: "Successful",
  },
  {
    id: 123456,
    date: "Sep 3, 2020",
    client: "Fish Lim",
    clientPhoto: "src/assets/images/fish.jpg",
    amount: 600,
    status: "Successful",
  },
  
];

let invoiceDataToBeRemoved = null

let deleteInvoiceModalIsVisible = false

let pendingNotifyIdDeleteInvoice = 0

const clientList = [
  {
    name: 'Fish Lim',
    photo: 'src/assets/images/fish.jpg'
  },
  {
    name: 'Bird Santos',
    photo: 'src/assets/images/bird.jpg'
  },
  {
    name: 'Cow Escoda',
    photo: 'src/assets/images/cow.jpg'
  },
  {
    name: 'Crane Popcorn',
    photo: 'src/assets/images/crane.jpg'
  },
  {
    name: 'Frog Tuiles',
    photo: 'src/assets/images/frog.jpg'
  },
  {
    name: 'Axolotl Joconde',
    photo: 'src/assets/images/axolotl.jpg'
  },
  
]

let lastInvoiceId = 0

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

let stateInvoicesViewAll = false

let outputPendingBar = null

let addedAccountsList = []

let deleteTransferModalIsVisible = false

let deleteTransferCompany = ''