<template>
  <div class="nes-container with-title">
    <p class="title">Whitelist settings</p>
    <form @submit.prevent="updateWhitelist">
      <label style=" width:50%;">
        <input type="radio" class="nes-radio" value="add" v-model="action" />
        <span style="color:#fcbb1f ; ">Add</span>
      </label>
      <label style=" width:50%;">
        <input type="radio" class="nes-radio" value="remove" v-model="action" />
        <span style="color:#fcbb1f ;">Remove</span>
      </label>

      <div class="nes-field class=mt-5">
        <label for="address">Address:</label>
        <input type="text" id="address" class="nes-input" v-model="address" />
      </div>

      <div class="mt-5">
        <label style=" width:50%;">
          <input
            type="radio"
            class="nes-radio"
            :value="WhitelistType.Creator"
            v-model="type"
          />
          <span style="color:#fcbb1f ; ">Creator</span>
        </label>
        <label style=" width:50%;">
          <input
            type="radio"
            class="nes-radio"
            :value="WhitelistType.Mint"
            v-model="type"
          />
          <span style="color: #fcbb1f ;">Mint</span>
        </label>
      </div>

      <div class="mt-2">
        <button class="nes-btn is-primary">Update</button>
      </div>
    </form>

    <div class="mt-5">
      <div v-for="proof in proofs" :key="proof.address">
        {{ proof.account.whitelistedAddress.toBase58() }} -
        {{ parseWhitelistType(proof.account.whitelistType) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { WhitelistType } from '@gemworks/gem-farm-ts';
import useCluster from '@/composables/cluster';
import useWallet from '@/composables/wallet';
import { initGemBank } from '@/common/gem-bank';
import { PublicKey } from '@solana/web3.js';

export default defineComponent({
  props: {
    bank: { type: String, required: true },
  },
  setup(props, ctx) {
    const action = ref<string>('add');
    const address = ref<string>();
    const type = ref<WhitelistType>(WhitelistType.Creator);

    const { getConnection } = useCluster();
    const { getWallet } = useWallet();

    let gb: any;

    const proofs = ref([]);

    onMounted(async () => {
      gb = await initGemBank(getConnection(), getWallet()!);
    });

    //todo doesn't work
    watch(
      () => props.bank,
      async () => {
        const r = await gb.fetchAllWhitelistProofPDAs(
          new PublicKey(props.bank)
        );
        console.log(`found a total of ${r.length} whitelist proofs`);
        proofs.value = r;
      }
    );

    const updateWhitelist = async () => {
      console.log(props.bank);

      if (action.value === 'add') {
        const { txSig } = await gb.addToWhitelistWallet(
          new PublicKey(props.bank),
          new PublicKey(address.value!),
          type.value
        );
        console.log('added', txSig);
        proofs.value = await gb.fetchAllWhitelistProofPDAs(
          new PublicKey(props.bank)
        );
      } else {
        const { txSig } = await gb.removeFromWhitelistWallet(
          new PublicKey(props.bank),
          new PublicKey(address.value!)
        );
        console.log('removed', txSig);
        proofs.value = await gb.fetchAllWhitelistProofPDAs(
          new PublicKey(props.bank)
        );
      }
    };

    const parseWhitelistType = (numType: number) => {
      switch (numType) {
        case 1:
          return 'Creator';
        case 2:
          return 'Mint';
        case 3:
          return 'Mint + Whitelist';
        default:
          return 'unknown';
      }
    };

    return {
      WhitelistType,
      action,
      address,
      type,
      proofs,
      updateWhitelist,
      parseWhitelistType,
    };
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
.nes-radio{
 
}
.nes-input{
  padding: 5px;
  border: 1px solid #fcbb1f ;
  
  width: 100%;
  background-color: #131212;

}
</style>
