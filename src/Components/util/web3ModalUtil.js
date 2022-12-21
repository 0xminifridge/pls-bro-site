import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "7113848185274579883551d232e8d9a6", // required TODO: change
    },
  },
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Monkeez", // Required
      infuraId: "7113848185274579883551d232e8d9a6", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
};

export const web3ModalSetup = () =>
  new Web3Modal({
    cacheProvider: true,
    providerOptions: providerOptions,
  });
