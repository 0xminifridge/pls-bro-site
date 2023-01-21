import { parseWalletAddress } from "./util/walletUtil";
import { getUsernameForAddress } from "./util/usernames";
import { useEffect, useState } from "react";

export default function WalletButton({
  account,
  setAccount,
  web3Modal,
  loadWeb3Modal,
  web3Provider,
  setWeb3Provider,
  logoutOfWeb3Modal,
}) {
  const isConnected = Boolean(account);
  const [walletAddress, setWalletAddress] = useState(
    parseWalletAddress(account)
  );

  useEffect(() => {
    const getVanityDomain = async () => {
      if (account) {
        const domain = await getUsernameForAddress(account);
        console.log("domain", domain);
        if (domain.avvy) {
          setWalletAddress(domain.avvy);
        } else if (domain.fireDomain) {
          setWalletAddress(domain.fireDomain);
        }
      }
    };

    getVanityDomain();
  }, [account]);

  const onClickConnect = async () => {
    console.log("Attempting to connect");
    loadWeb3Modal();
  };

  const onClickDisconnect = () => {
    console.log(`Disconnecting for account: ${account}`);
    logoutOfWeb3Modal();
  };

  const btnClasses =
    "border-gray-400 px-2 py-1 rounded text-lg border-2 text-gray-400 hover:text-white hover:border-white";

  if (isConnected) {
    return (
      <button class={btnClasses} onClick={() => onClickDisconnect()}>
        {walletAddress}
      </button>
    );
  } else {
    return (
      <button class={btnClasses} onClick={() => onClickConnect()}>
        Connect Wallet
      </button>
    );
  }
}
