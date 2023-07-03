<template>
    <div class="flex w-64 flex-col px-4 pt-10 pb-6">
        <!-- Logo -->
        <h1>
            <a href="#" class="text-white flex items-center gap-x-4 px-8 font-medium">
                <Icon icon="carbon:cics-transaction-server-zos" class="h-8 w-8"/>
                <div class="text-2xl">Transfer</div>
            </a>
        </h1>
    
        <!-- Menu -->
        <aside>
            <ul class="flex flex-1 flex-col gap-y-7 px-8 pt-16">
                <li v-for="item of menu">
                    <a href="#" class="flex items-center gap-x-4 p-1 text-gray-300 outline-none hover:ring-1 hover:ring-white hover:text-white  focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white rounded-md duration-300">
                        <Icon :icon="item.icon" class="h-6 w-6"/>
                        <span>{{ item.text }}</span>
                    </a>
                </li>
            </ul>
        </aside>

        <!-- Invite modal -->
        <div class="p-6 mt-72 bg-gray-900 rounded-xl">
            <h2 class="text-white">Refer a friend and <span class="font-bold">get $5</span></h2>
            <div class="text-gray-300 text-sm mt-3">The reward of transfer.</div>
            <button class="px-6 py-2 mt-5 bg-gray-700 rounded-md w-full text-gray-300 text-sm font-normal outline-none hover:ring-1 hover:ring-white hover:text-white  focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300" aria-describedby="btnDescription">
                Invite
            </button>
            <div id="btnDescription" hidden>Refer a friend to get $5. Press this button to invite a friend</div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const menu = [
    {text: 'Home', icon: 'carbon:home'},
    {text: 'USA Payor', icon: 'bi:cash-coin'},
    {text: 'Invoices', icon: 'mdi:file-document-outline'},
    {text: 'My Banks', icon: 'mdi:bank'},
    {text: 'Withdraw', icon: 'uil:money-withdraw'},
    {text: 'Settings', icon: 'uil:setting'}
]

</script>