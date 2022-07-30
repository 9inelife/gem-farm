<template>
  <div class="nes-container with-title">
    <p class="title">Bank Details</p>
    <div class="mb-2">Bank address: {{ bank.toBase58() }}</div>
    <div class="mb-2">Bank manager: {{ bankAcc.bankManager.toBase58() }}</div>
    <div class="mb-2">Vault count: {{ bankAcc.vaultCount }}</div>
    <div class="mb-2">
      Whitelisted creators: {{ bankAcc.whitelistedCreators }}
    </div>
    <div class="mb-2">Whitelisted mints: {{ bankAcc.whitelistedMints }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    bank: Object,
    bankAcc: Object,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>

.nes-container{
  color: white;
  border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
   width: 100%;
   padding: 8px;
   text-align: center;
}
</style>
