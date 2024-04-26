<template>
  <Header />
  <div class="container">
    <div>
      <Balance :total="total" />
      <Income :income="+income" :expense="+expense" />
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="handleTransactionDeleted"
      />
    </div>
    <div>
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import Income from './components/Income.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import { ref, computed, onMounted } from 'vue'

const $toast = useToast()

const transactions = ref([])

onMounted(() => {
  const saveTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (saveTransactions) {
    transactions.value = saveTransactions
  }
})

//Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

//Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//Get expense
const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//Generate unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000)
}

//add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })

  saveTransactionToLocalstorage()

  $toast.success('expenses added')
}

//Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  saveTransactionToLocalstorage()
  $toast.success('Transaction deleted')
}

//Save to localstorage
const saveTransactionToLocalstorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
