<template>
  <Header />
  <div class="container">
    <Balance />
    <Income />
    <TransactionList />
    <AddTransaction />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import Income from './components/Income.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'

export default {
  components: {
    Header,
    Balance,
    Income,
    TransactionList,
    AddTransaction
  }
}
</script>
