<template>
  <div class="mb-2 nes-containers">Associated bank: {{ farmAcc.bank }}</div>
  <!--config-->
  <div class="mb-2 " style="text-align: center;">Farm config:</div>
<div class="nes-containers">
  <div class="mb-2 ml-5">
    Min staking period: {{ farmAcc.config.minStakingPeriodSec }} sec
  </div>
  <div class="mb-2 ml-5">
    Cooldown period: {{ farmAcc.config.cooldownPeriodSec }} sec
  </div>
  <div class="mb-2 ml-5">
    Unstaking fee: {{ farmAcc.config.unstakingFeeLamp }} lamp
  </div>

  <!--participating farmers/gems-->
  <div class="mb-2">Initialized farmer count: {{ farmAcc.farmerCount }}</div>
  <div class="mb-2">Staked farmer count: {{ farmAcc.stakedFarmerCount }}</div>
  <div class="mb-5">Gems staked: {{ farmAcc.gemsStaked }}</div>
</div>
  <div class="flex">
    <!--reward A-->
    <div class="flex-1 mr-5">
      <RewardDisplay
        :key="farmAcc.rewardA"
        :reward="farmAcc.rewardA"
        title="Reward A"
      />
    </div>
    <!--reward B-->
    <div class="flex-1">
      <RewardDisplay
        :key="farmAcc.rewardB"
        :reward="farmAcc.rewardB"
        title="Reward B"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RewardDisplay from '@/components/gem-farm/RewardDisplay.vue';
export default defineComponent({
  components: { RewardDisplay },
  props: {
    farmAcc: Object,
  },
  setup() {
    return {};
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

.nes-containers{
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
