<template>
<p class="spot">WELCOME SPOTTER </p>

<!-- <p class="spot">stake your NFTs</p> -->
  
     <div >
     <!-- class="nes-containe with-title mb-10" -->
    <p class="mt-5 bom">
      Spotter Farm Address is Deployed At:
    </p>
    <!-- <div class="nes-field mb-10">
    <p class="mom">{{ GEM_FARM_PROG_ID }}</p>
    </div> -->
     <div class="mom mb-5 nes-input">
    <p >DpkHSv9AWsP8h4x4miLt6WEHibRtM1REtPDDyaCkJ1FS </p>
    </div>
  </div>

  
   
    <div class="nes-container with-title ">
      <p class="title">Start your staking Journey!!!</p>
    
      <router-link to="farmer"><br>
        <button class="nes-btn is-primary">Start</button>
      </router-link>
    </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GEM_FARM_PROG_ID } from '@gemworks/gem-farm-ts';
export default defineComponent({
  setup() {
    return {
      GEM_FARM_PROG_ID,
    };
  },
});
</script>
<style scoped>
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
  
.spot{
  color: #fcbb1f;
  font-weight: bolder;
  font-size: x-large;
}
.sop{
  font-size: medium;
 
}
p{
  color: white;

}
p:hover{
  color: white; 
}
 .so{
    color: white;
  border: 1px solid #fcbb1f;
  border-radius: 1rem;
  background-color: black;
  padding: 10px;
 }

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
.nes-container{
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
  display: flex;
  width: 100%;
  background-color: #131212;

}
   .mom{
    overflow-x: scroll;
  }


.spot{
  text-align: center;
}
.bom{
   text-align: center;
}
</style>
