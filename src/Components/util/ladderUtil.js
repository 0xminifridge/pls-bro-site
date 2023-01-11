import { Contract, ethers } from "ethers";
import { LADDER_ADDRESS, LADDER_ABI } from "../../contracts/Ladder";
import { getCurrentNetwork } from "./walletUtil";

export const getContractParameters = async (address) => {
  let ethereum = window.ethereum;
  let isWhitelisted = false;
  let whitelistSale = false;
  let publicSale = false;
  let error;
  if (ethereum) {
    const currentNet = getCurrentNetwork();
    if (currentNet !== "43114") {
      error = `Invalid network with id: ${currentNet}`;
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if (LADDER_ADDRESS && LADDER_ABI && signer) {
        const contract = new Contract(LADDER_ADDRESS, LADDER_ABI, signer);
        if (address) {
          isWhitelisted = await contract.onAllowlist(address);
          whitelistSale = await contract.allowlistActive();
          publicSale = await contract.saleIsActive();
        } else {
          error = "Invalid address";
        }
      } else {
        error = "Issue with parameters - see admin";
      }
    }
  } else {
    error = "No wallet provider";
  }
  return {
    status: isWhitelisted,
    whitelistOpen: whitelistSale,
    publicSaleOpen: publicSale,
    error: error,
  };
};

export const mint = async (amount, price) => {};

export const mintWhitelist = async (amount, price) => {
  let ethereum = window.ethereum;
  let isWhitelisted = false;
  let error;
  if (ethereum) {
    const currentNet = getCurrentNetwork();
    if (currentNet !== "43114") {
      error = `Invalid network with id: ${currentNet}`;
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      if (LADDER_ADDRESS && LADDER_ABI && signer) {
        const contract = new Contract(LADDER_ADDRESS, LADDER_ABI, signer);
      } else {
        error = "Issue with parameters - see admin";
      }
    }
  } else {
    error = "No wallet provider";
  }
  return {
    status: isWhitelisted,
    error: error,
  };
};
