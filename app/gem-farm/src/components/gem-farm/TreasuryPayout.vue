<template>
  <div class="nes-container with-title">
    <p class="title">Treasury Payout</p>
    <div class="mb-5">Treasury balance: {{ balance }} lamports</div>

    <form @submit.prevent="payoutFromTreasury">
      <div class="nes-field mb-5">
        <label for="destination">Payout destination:</label>
        <input
          id="destination"
          type="text"
          v-model="destination"
          class="nes-input"
        />
      </div>
      <div class="nes-field mb-5">
        <label for="lamports">Amount to pay out (lamp):</label>
        <input id="lamports" type="text" v-model="lamports" class="nes-input" />
      </div>
      <button class="mb-5 nes-btn is-primary" type="submit">Payout</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import { findFarmTreasuryPDA } from '@gemworks/gem-farm-ts';

export default defineComponent({
  props: {
    farm: String,
  },
  setup(props, ctx) {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection } = useCluster();

    let gf: any;
    watch([wallet, cluster], async () => {
      gf = await initGemFarm(getConnection(), getWallet()!);
    });

    //need an onmounted hook because this component isn't yet mounted when wallet/cluster are set
    onMounted(async () => {
      if (getWallet() && getConnection()) {
        gf = await initGemFarm(getConnection(), getWallet()!);
        await getTresauryBalance();
      }
    });

    watch(
      () => props.farm,
      async () => {
        await getTresauryBalance();
      }
    );

    // --------------------------------------- payout
    const destination = ref<string>();
    const lamports = ref<string>();
    const balance = ref<string>();

    const payoutFromTreasury = async () => {
      await gf.treasuryPayoutWallet(
        new PublicKey(props.farm!),
        new PublicKey(destination.value!),
        lamports.value!
      );
      await getTresauryBalance();
    };

    const getTresauryBalance = async () => {
      const [treasury] = await findFarmTreasuryPDA(new PublicKey(props.farm!));
      console.log('treasury found:', treasury.toBase58());
      balance.value = await gf.getBalance(treasury);
    };

    return {
      balance,
      destination,
      lamports,
      payoutFromTreasury,
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
