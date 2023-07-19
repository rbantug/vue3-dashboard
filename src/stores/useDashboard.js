import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        recentTransactionData,
        addedAccountsList,
    }),
    getters: {},
    actions: {
         removeMessage(id) {
          const index = this.msgNotification.findIndex(notify => notify.id === id)

          this.msgNotification.splice(index, 1)
        },
        addNewAccount(acct) {
          this.addedAccountsList.push(acct)
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

let addedAccountsList = []