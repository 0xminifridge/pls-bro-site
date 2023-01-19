import AVVY from "@avvy/client";
import { ethers, utils, providers, Contract } from "ethers";
import { FIRE_ABI, FIRE_ADDRESS } from "../../contracts/CampfireUsernames.js";
import { parseWalletAddress } from "./walletUtil.js";

const rpcProvider = "https://api.avax.network/ext/bc/C/rpc";

export async function lookupAvvy(address) {
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
  if (provider) {
    console.log(provider);
    const avvy = new AVVY(provider);
    if (avvy) {
      const hash = await avvy.reverse(AVVY.RECORDS.EVM, address);

      if (hash) {
        const name = await hash.lookup();
        if (name) {
          return name.name;
        }
      }
    }
  }

  return undefined;
}

export async function lookupFire(address) {
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
  if (provider) {
    const contract = new Contract(FIRE_ADDRESS, FIRE_ABI, provider);

    const fireDomain = await contract.usernameFor(address);
    if (fireDomain) {
      return fireDomain;
    }
  }
  return undefined;
}

export async function getUsernameForAddress(address) {
  const avvyDomain = await lookupAvvy(address);
  const fireDomain = await lookupFire(address);

  if (avvyDomain) {
    return avvyDomain;
  } else if (fireDomain) {
    return fireDomain;
  } else {
    return address;
  }
}

// module.exports = {
//   getUsernameForAddress,
// };
