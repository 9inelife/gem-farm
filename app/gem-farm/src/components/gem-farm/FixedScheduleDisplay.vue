<template>
  <div class="">
    <div class="mb-2">Base rate: {{ schedule.baseRate }} tokens/Spotter/s</div>
    <div class="mb-2" v-if="schedule.tier1">
      T1 reward rate:
      {{ schedule.tier1.rewardRate }} tokens/Spotter/s
    </div>
    <div class="mb-2" v-if="schedule.tier1">
      T1 required tenure:
      {{ schedule.tier1.requiredTenure }} sec
    </div>
    <!--tier 2-->
    <div class="mb-2" v-if="schedule.tier2">
      T2 reward rate:
      {{ schedule.tier2.rewardRate }} tokens/Spotter/s
    </div>
    <div class="mb-2" v-if="schedule.tier2">
      T2 required tenure:
      {{ schedule.tier2.requiredTenure }} sec
    </div>
    <!--tier 3-->
    <div class="mb-2" v-if="schedule.tier3">
      T3 reward rate:
      {{ schedule.tier3.rewardRate }} tokens/Spotter/s
    </div>
    <div class="mb-2" v-if="schedule.tier3">
      T3 required tenure:
      {{ schedule.tier3.requiredTenure }} sec
    </div>
    <div class="mb-2">
      Denominator:
      {{ schedule.denominator }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    schedule: Object,
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

.nes-container{
  color: white;
  
 
  background-color: black;
   width: 50%;
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
