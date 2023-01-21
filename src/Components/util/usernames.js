import AVVY from "@avvy/client";
import { ethers, utils, providers, Contract } from "ethers";
import { FIRE_ABI, FIRE_ADDRESS } from "../../contracts/CampfireUsernames.js";
import { parseWalletAddress } from "./walletUtil.js";

const rpcProvider = "https://api.avax.network/ext/bc/C/rpc";

export async function lookupAvvy(address) {
  let error;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    if (provider) {
      const avvy = new AVVY(provider);
      if (avvy) {
        const hash = await avvy.reverse(AVVY.RECORDS.EVM, address);

        if (hash) {
          const name = await hash.lookup();
          if (name) {
            return { avvy: name.name, error: undefined };
          }
        }
      }
    }
  } catch (err) {
    error = err.reason;
  }

  return { avvy: undefined, error: error };
}

export async function forwardLookupAvvy(domain) {
  let error;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    if (provider) {
      const avvy = new AVVY(provider);

      if (avvy) {
        const address = await avvy.name(domain).resolve(AVVY.RECORDS.EVM);
        console.log("address: " + address);
        if (address) {
          return { address: address, error: undefined };
        }
      }
    }
  } catch (err) {
    console.log(err);
    error = err;
  }

  return { address: undefined, error: error };
}

export async function lookupFire(address) {
  let error;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    if (provider) {
      const contract = new Contract(FIRE_ADDRESS, FIRE_ABI, provider);

      const fireDomain = await contract.usernameFor(address);
      if (fireDomain) {
        return { fireDomain: fireDomain, error: undefined };
      }
    }
  } catch (err) {
    error = err;
  }

  return { fireDomain: undefined, error: error };
}

export async function forwardLookupfire(domain) {
  let error;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    if (provider) {
      const contract = new Contract(FIRE_ADDRESS, FIRE_ABI, provider);

      const addressForFire = await contract.addressFor(domain);
      if (addressForFire) {
        console.log(addressForFire);
        return { address: addressForFire, error: undefined };
      }
    }
  } catch (err) {
    console.log(err);
    error = err;
  }
  return { address: undefined, error: error };
}

export async function getUsernameForAddress(address) {
  const avvyDomain = await lookupAvvy(address);
  const fireDomain = await lookupFire(address);

  if (avvyDomain) {
    return avvyDomain;
  } else if (fireDomain) {
    return fireDomain;
  } else {
    return parseWalletAddress(address);
  }
}

// module.exports = {
//   getUsernameForAddress,
// };
