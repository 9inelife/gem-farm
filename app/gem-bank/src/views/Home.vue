<template>

  <div class="nes-container with-title mb-10">
    <p class="title spot" >WELCOME TO SPOTTER-NFT BANK</p>
    <p class="sop">
      This app is designed to illustrate the functionality of Spotter Bank. It is
      not production grade. Use at your own risk.
    </p>
  </div>
  <div class="flex flex-row so">
    <div class="nes-container with-title flex-1 mr-5 ">
      <p class="title sop">Start/manage a bank</p>
      <p class="mb-5 sop">
        Choose this if you want to be able to create / lock / unlock vaults for
        vault owners.
      </p>
      <router-link to="bank">
        <button class="nes-btn is-primary">Start a bank</button>
      </router-link>
    </div>
    <div class="nes-container with-title flex-1 ml-5 ">
      <p class="title sop">Use your Vault</p>
      <p class="mb-5 sop">
        Choose this if you'd like to use a vault opened with someone's bank.
        <br> <br> 
      </p>
      <router-link to="vault">
        <button class="nes-btn is-primary " >Use vault</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
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
  color:  black;
  background-color:  #fcbb1f;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px rgb(163, 124, 5);
}

.nes-btn:hover {background-color:  #dda72a}

.nes-btn:active {
  background-color:  #fcbb1f;
  box-shadow: 0 5px rgb(163, 124, 5);
  transform: translateY(4px);
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

</style>
