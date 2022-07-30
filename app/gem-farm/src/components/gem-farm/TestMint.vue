<template>
  <div class="nes-container with-title">
    <p class="title">Create Test Reward Mint</p>
    <button class="nes-btn is-primary" @click="createTestReward">
      Create Test Mint
    </button>
    <div v-if="mint">
      <p class="my-2">
        🎉 New mint created and 1,000,000 tokens deposited into your wallet!
      </p>
      <p class="mb-5">Mint: {{ mint }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { BrowserWallet } from '@gemworks/gem-farm-ts';

export default defineComponent({
  setup() {
    const { getWallet } = useWallet();
    const { getConnection } = useCluster();

    const mint = ref<string>();

    const createTestReward = async () => {
      const bw = new BrowserWallet(getConnection(), getWallet() as any);

      const { mint: rewardMint } = await bw.createMintAndFundATA(0, 1000000);
      mint.value = rewardMint.toBase58();
    };

    return {
      mint,
      createTestReward,
    };
  },
});
</script>

<style scoped>
.text-center{
  color: white;
  border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
  width: 100%;
  padding: 7px;
  
}
.nes-field{
  display: flex;
 
   padding: 5px;

}
.title{
   color: white;
  border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
   width: 100%;
   padding: 8px;
   text-align: center;
}
.nes-input{
  padding: 5px;
  border: 1px solid  #e2a004 ;
  
  width: 100%;
  background-color: #131212;

}

.nes-container{
  color: white;
   border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
   width: 100%;
   padding: 8px;
   text-align: center;
}
.nes-btn {
  padding: 10px 10px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: black;
  background-color:   #e2a004;
   border-radius:1rem;
   border:1px solid black;

}



</style>
