<template>
  <div class="nes-container with-title">
    <p class="title">{{ title }}</p>
    <div class="mb-2">
      Type:
      <p class="inline-block bg-yellow-200">{{ parseRewardType(reward) }}</p>
    </div>
    <div class="mb-2">Mint: {{ parseRewardMint(reward) }}</div>

    <!--config-->
    <div class="mb-2 w-full bg-black text-white">Config:</div>
    <div v-if="parseRewardType(reward) === 'variable'">
      <div class="mb-2">
        Reward rate:
        {{
          numeral(reward.variableRate.rewardRate.n / 10 ** 3).format('0,0.0')
        }}
        tokens/s
      </div>
      <div class="mb-2">
        Accrued reward/gem:
        {{
          numeral(
            reward.variableRate.accruedRewardPerRarityPoint.n / 10 ** 3
          ).format('0,0.0')
        }}
      </div>
      <div class="mb-2">
        Reward last updated:
        {{ parseDate(reward.variableRate.rewardLastUpdatedTs) }}
      </div>
      <div class="mb-2"></div>
    </div>
    <div v-else>
      <div class="mb-2">
        Reserved amount: {{ reward.fixedRate.reservedAmount }}
        <FixedScheduleDisplay :schedule="reward.fixedRate.schedule" />
      </div>
    </div>

    <!--funds-->
    <div class="mb-2 w-full bg-black text-white">Funds:</div>
    <div class="mb-2">Funded: {{ reward.funds.totalFunded }}</div>
    <div class="mb-2">Refunded: {{ reward.funds.totalRefunded }}</div>
    <div class="mb-2">Accrued: {{ reward.funds.totalAccruedToStakers }}</div>

    <!--times-->
    <div class="mb-2 w-full bg-black text-white">Times:</div>
    <div class="mb-2">Duration: {{ reward.times.durationSec }} sec</div>
    <div class="mb-2">
      Reward end: {{ parseDate(reward.times.rewardEndTs) }}
    </div>
    <div class="mb-2">Lock end: {{ parseDate(reward.times.lockEndTs) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FixedScheduleDisplay from '@/components/gem-farm/FixedScheduleDisplay.vue';
import { parseDate } from '@/common/util';
import numeral from 'numeral';

export default defineComponent({
  components: { FixedScheduleDisplay },
  props: {
    reward: Object,
    title: String,
  },
  setup() {
    // todo ideally should be using one from client, but n/a during render
    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    const parseRewardConfig = (reward: any) => {
      const type = parseRewardType(reward);
      if (type === 'variable') {
        return reward.variableRate;
      } else {
        return reward.fixedRate;
      }
    };

    const parseRewardMint = (reward?: any) => {
      return `${reward.rewardMint.toBase58().substr(0, 10)}...`;
    };

    return {
      parseRewardType,
      parseRewardConfig,
      parseRewardMint,
      parseDate,
      numeral,
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
.nes-container{
  color: white;
   border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
   width: 100%;
   padding: 8px;
   text-align: center;
}
.bom{
  background-color: black;
  color: white;
}
</style>
