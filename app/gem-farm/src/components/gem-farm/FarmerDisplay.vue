<template>
  <div class="nes-container with-title">
    <p class="title">Your Staking Account</p>
    <div class="mb-2">
      state:
      <p class="inline-block bg-yellow-200" >
        {{ parseFarmerState(farmerAcc) }}
      </p>
    </div>
    <div class="mom nes-input mb-2">Your identity: {{ farmerAcc.identity.toBase58() }}</div>
    <div class="mom nes-input mb-2">Associated vault: {{ farmerAcc.vault.toBase58() }}</div>
    <div class="mb-2">Spotters staked: {{ farmerAcc.gemsStaked }}</div>
    <div class="mb-2">
      Min staking ends: {{ parseDate(farmerAcc.minStakingEndsTs) }}
    </div>
    <div class="mb-5">
      Cooldown ends: {{ parseDate(farmerAcc.cooldownEndsTs) }}
    </div>

    <div class="flex mb-5">
      <!-- <div class="flex-1 mr-5">
        <FarmerRewardDisplay
          :key="farmerAcc.rewardA"
          :farmReward="farmAcc.rewardA"
          :reward="farmerAcc.rewardA"
          title="Reward A"
        />
      </div> -->
      <div class="flex-1">
        <FarmerRewardDisplay
          :key="farmerAcc.rewardB"
          :farmReward="farmAcc.rewardB"
          :reward="farmerAcc.rewardB"
          title="Spn Reward "
        />
      </div>
    </div>
    <button class="nes-btn is-primary mb-5" @click="refreshFarmer">
      Refresh account
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import FarmerRewardDisplay from '@/components/gem-farm/FarmerRewardDisplay.vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import { parseDate } from '@/common/util';

export default defineComponent({
  components: { FarmerRewardDisplay },
  props: {
    farm: String,
    farmAcc: Object,
    farmer: String,
    farmerAcc: Object,
  },
  emits: ['refresh-farmer'],
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
      }
    });

    // --------------------------------------- display farmer
    // todo ideally should be using one from client, but n/a during render
    const parseFarmerState = (farmer: any): string => {
      return Object.keys(farmer.state)[0];
    };

    const refreshFarmer = async () => {
      await gf.refreshFarmerWallet(
        new PublicKey(props.farm!),
        new PublicKey(props.farmer!)
      );
      ctx.emit('refresh-farmer');
    };

    return {
      refreshFarmer,
      parseFarmerState,
      parseDate,
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
.inline-block{
  background-color: black;
  color: white;
}
.mom{
    overflow-x: scroll;
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
