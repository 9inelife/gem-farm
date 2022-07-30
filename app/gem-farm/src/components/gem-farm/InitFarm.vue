<template>
  <div class="nes-container with-title">
    <p class="title">New Farm Config</p>
    <form @submit.prevent="initFarm">
      <!--reward A-->
      <div class="flex items-end mb-5">
        <div class="nes-field mr-5 w-9/12">
          <label for="mintA">Reward A mint:</label>
          <input type="text" id="mintA" class="nes-input" v-model="mintA" />
        </div>
        <div class="nes-select w-1/4">
          <select v-model="typeA" class="nes-selects">
            <option :value="RewardType.Variable">Variable</option>
            <option :value="RewardType.Fixed">Fixed</option>
          </select>
        </div>
      </div>
      <!--reward B-->
      <div class="flex items-end mb-5">
        <div class="nes-field mr-5 w-9/12">
          <label for="mintA">Reward B mint:</label>
          <input type="text" id="mintB" class="nes-input" v-model="mintB" />
        </div>
        <div class="nes-select w-1/4">
          <select v-model="typeB"  class="nes-selects">
            <option :value="RewardType.Variable">Variable</option>
            <option :value="RewardType.Fixed">Fixed</option>
          </select>
        </div>
      </div>
      <!--FarmConfig-->
      <div class="nes-field mb-5">
        <label for="minStakingPeriodSec">Min staking period (sec)</label>
        <input
          type="text"
          id="minStakingPeriodSec"
          class="nes-input"
          v-model="minStakingPeriodSec"
        />
      </div>
      <div class="nes-field mb-5">
        <label for="cooldownPeriodSec">Cooldown period (sec)</label>
        <input
          type="text"
          id="cooldownPeriodSec"
          class="nes-input"
          v-model="cooldownPeriodSec"
        />
      </div>
      <div class="nes-field mb-5">
        <label for="unstakingFeeLamp">Unstaking fee (lamports)</label>
        <input
          type="text"
          id="unstakingFeeLamp"
          class="nes-input"
          v-model="unstakingFeeLamp"
        />
      </div>
      <button class="nes-btn is-primary mb-5" type="submit">Start farm*</button>
      <p class="mb-5">* this creates an associated Spotter Bank automatically</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import useWallet from '../../composables/wallet';
import useCluster from '../../composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { RewardType } from '@gemworks/gem-farm-ts';

export default defineComponent({
  emits: ['new-farm'],
  setup(props, ctx) {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection } = useCluster();

    let gf: any;
    watch([wallet, cluster], async () => {
      gf = await initGemFarm(getConnection(), getWallet()!);
    });

    //needed coz mounts later
    onMounted(async () => {
      if (getWallet() && getConnection()) {
        gf = await initGemFarm(getConnection(), getWallet()!);
      }
    });

    // --------------------------------------- init farm
    const mintA = ref<string>();
    const typeA = ref<any>(RewardType.Variable);
    const mintB = ref<string>();
    const typeB = ref<any>(RewardType.Fixed);

    const minStakingPeriodSec = ref<string>();
    const cooldownPeriodSec = ref<string>();
    const unstakingFeeLamp = ref<string>();

    const initFarm = async () => {
      const { farm } = await gf.initFarmWallet(
        new PublicKey(mintA.value!),
        typeA.value,
        new PublicKey(mintB.value!),
        typeB.value,
        {
          minStakingPeriodSec: new BN(minStakingPeriodSec.value!),
          cooldownPeriodSec: new BN(cooldownPeriodSec.value!),
          unstakingFeeLamp: new BN(unstakingFeeLamp.value!),
        }
      );

      ctx.emit('new-farm', farm.publicKey.toBase58());
    };

    return {
      wallet,
      RewardType,
      mintA,
      typeA,
      mintB,
      typeB,
      minStakingPeriodSec,
      cooldownPeriodSec,
      unstakingFeeLamp,
      initFarm,
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

.nes-selects{
    background-color:black; 
  padding: 5px;
  border: 1px solid #fcbb1f;
  border-radius: 1rem;
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
