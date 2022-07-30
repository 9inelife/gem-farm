<template>
  <div class="nes-container">
    <!--todo need to write a bytes to string fn-->
    <!--<div class="mb-2">Name: {{ vaultAcc.name }}</div>-->
    <div class="mb-2">Creator: {{ vaultAcc.creator.toBase58() }}</div>
    <div class="mb-2">Current owner: {{ vaultAcc.owner.toBase58() }}</div>
    <div class="mb-2">
      Currently locked:
      <p class="inline-block bg-black-200">{{ vaultAcc.locked }}</p>
    </div>
    <div class="mb-2">Mints stored: {{ vaultAcc.gemBoxCount }}</div>
    <div class="mb-2">Gems stored: {{ vaultAcc.gemCount }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    vaultAcc: Object,
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
