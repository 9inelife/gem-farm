import { PublicKey } from '@solana/web3.js';

export * from './gem-bank';
export * from './gem-farm';
export * from './gem-common';

export const GEM_BANK_PROG_ID = new PublicKey(
  'BaNKNEJcQzsTsTSSBxbbr1gnSaRDKe4cbSVhse1TWoVE'
);
export const GEM_FARM_PROG_ID = new PublicKey(
  'FarMdgVUznjgT5r1KiSRsfGpBJtT2xZVs1uDg86cGMEw'
);
