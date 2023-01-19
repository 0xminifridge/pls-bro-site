import { useState } from "react";
// import getUsernameForAddress from "./util/usernames";
import {
  forwardLookupAvvy,
  forwardLookupfire,
  getUsernameForAddress,
  lookupAvvy,
  lookupFire,
} from "./util/usernames";
import { ethers } from "ethers";
import { parseWalletAddress } from "./util/walletUtil";

/**
 * search on 0x
 * search on .avax
 * search on .fire
 * search on .moo
 * search on .fires
 * search on .avaxe
 * search on 0xaaa
 */

export function ValidSearch({
  forwardLookup,
  reverseLookup,
  addressforAvvy,
  addressForFire,
  avvyDomain,
  validAvvy,
  dotFireDomain,
  validFire,
}) {
  console.log(
    forwardLookup,
    reverseLookup,
    addressforAvvy,
    addressForFire,
    avvyDomain,
    validAvvy,
    dotFireDomain,
    validFire
  );
  if (forwardLookup) {
    return (
      <ValidForwardLookup
        addressforAvvy={addressforAvvy}
        addressForFire={addressForFire}
      />
    );
  }
  if (reverseLookup) {
    console.log("reverse");
    return (
      <ValidReverseLookup
        avvyDomain={avvyDomain}
        validAvvy={validAvvy}
        dotFireDomain={dotFireDomain}
        validFire={validFire}
      />
    );
  }
  return <></>;
}

export function ValidReverseLookup({
  avvyDomain,
  validAvvy,
  dotFireDomain,
  validFire,
}) {
  return (
    <div class="">
      {avvyDomain && <h3>Registered .avax: {avvyDomain}</h3>}
      {!validAvvy && (
        <h3>
          No .avax domain registered. Get one{" "}
          <a
            class="hover:underline text-white"
            href="https://app.avvy.domains/register"
          >
            here
          </a>
          !
        </h3>
      )}
      {dotFireDomain && <h3>Registered .fire/.moo: {dotFireDomain}</h3>}
      {!validFire && (
        <h3>
          No .fire domain registered. Get one{" "}
          <a
            class="hover:underline text-white"
            href="https://campfire.exchange/minting/fire"
          >
            here
          </a>
          !
        </h3>
      )}
    </div>
  );
}

export function ValidForwardLookup({ addressforAvvy, addressForFire }) {
  return (
    <div class="w-60 break-words m-auto">
      {addressforAvvy && (
        <h3 class="hover:text-white flex flex-row">
          <a
            class="flex m-auto"
            target="_blank"
            href={`https://snowtrace.io/address/${addressforAvvy}`}
          >
            {parseWalletAddress(addressforAvvy)}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
      {addressForFire && (
        <h3 class="hover:text-white flex flex-row">
          <a
            class="flex m-auto"
            target="_blank"
            href={`https://snowtrace.io/address/${addressForFire}`}
          >
            {parseWalletAddress(addressForFire)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
    </div>
  );
}

export function InvalidSearch({ error }) {
  console.log(error);
  return (
    <>
      <div class="">
        {error && <h3>{error}</h3>}
        {!error && <h3 class="invisible">{error}</h3>}
      </div>
    </>
  );
}

export default function WhoIs() {
  const [inputText, setInputText] = useState(null);
  const [error, setError] = useState();

  // reverse lookup
  const [reverseLookup, setReverseLookup] = useState(false);
  const [avvyDomain, setAvvyDomain] = useState();
  const [dotFireDomain, setDotFireDomain] = useState();
  const [validAvvy, setValidAvvy] = useState(false);
  const [validFire, setValidFire] = useState(false);
  const [validSearch, setValidSearch] = useState();

  // forward lookup
  const [forwardLookup, setForwardLookup] = useState(false);
  const [addressforAvvy, setAddressForAvvy] = useState();
  const [addressForFire, setAddressForFire] = useState();

  const handleUserInput = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const performForwardLookup = async (domain) => {
    setAvvyDomain(null);
    setDotFireDomain(null);
    setValidAvvy(false);
    setValidFire(false);
    if (domain.endsWith(".avax")) {
      // .avax
      const { address, error } = await forwardLookupAvvy(domain);
      console.log(address, error);
      if (error) {
        setValidSearch(false);
        setError(error);
      } else {
        setValidSearch(true);
        setForwardLookup(true);
        setAddressForAvvy(address);
        setAddressForFire(null);
        setError(null);
      }
    } else if (domain.endsWith(".fire") || domain.endsWith(".moo")) {
      // .fire/moo
      const { address, error } = await forwardLookupfire(domain);
      console.log(address, error);
      if (error) {
        setValidSearch(false);
        setError(error);
      } else if (address === "0x0000000000000000000000000000000000000000") {
        setValidSearch(false);
        setError("No domain registered for " + domain);
      } else {
        console.log("forward", address);
        setValidSearch(true);
        setForwardLookup(true);
        setReverseLookup(false);
        setAddressForFire(address);
        setAddressForAvvy(null);
        setError(null);
      }
    } else {
      // invalid domain
      setValidSearch(false);
      setError("Invalid domain");
      // reset everything
      setForwardLookup(false);
      setAddressForAvvy(null);
      setAddressForFire(null);
    }
  };

  const performReverseLookup = async (address) => {
    const { avvy, avvyError } = await lookupAvvy(address);
    const { fireDomain, fireError } = await lookupFire(address);
    console.log("avvy", avvy, avvyError);
    console.log("fire", fireDomain, fireError);

    if (avvyError) {
      setValidSearch(false);
      setReverseLookup(false);
      setForwardLookup(false);
    } else {
      setValidSearch(true);
      setReverseLookup(true);
      setForwardLookup(false);
      console.log(avvy !== undefined);
      if (avvy) {
        console.log("setting avvy");
        setAvvyDomain(avvy);
        setValidAvvy(true);
      } else {
        setAvvyDomain(null);
        setValidAvvy(false);
      }
    }

    if (fireError) {
      setValidSearch(false);
      setReverseLookup(false);
      setForwardLookup(false);
    } else {
      setValidSearch(true);
      setReverseLookup(true);
      setForwardLookup(false);
      if (fireDomain) {
        console.log("setting fire");
        setDotFireDomain(fireDomain);
        setValidFire(true);
      } else {
        console.log("fire to null");
        setDotFireDomain(null);
        setValidFire(false);
      }
    }

    // if(!avvy && !fireDomain){
    //     // invalid domain
    //   setValidSearch(false);
    //   setError("No avvy or .fire regi");
    //   // reset everything
    //   setForwardLookup(false);
    //   setAddressForAvvy(null);
    //   setAddressForFire(null);
    // }
  };

  const submitLookup = async (e) => {
    console.log("Lookup for: " + inputText);
    if (inputText.startsWith("0x")) {
      // reverse lookup for address
      // check if address is valid otherwise display error
      const validAddress = ethers.utils.isAddress(inputText);
      if (validAddress) {
        performReverseLookup(inputText);
      } else {
        setValidSearch(false);
        setError("Invalid Address");
      }
    } else {
      // forward lookup
      performForwardLookup(inputText);
    }
  };

  const submitFromForm = async (e) => {
    await submitLookup(e);
  };

  const submitFromKey = async (e) => {
    if (e.key === "Enter") {
      submitLookup(e);
    }
  };
  return (
    <>
      <div class="h-[93vh] md:h-[100vh] bg-black">
        <div class="text-white flex justify-center flex-col w-full h-full">
          <div class="m-auto flex flex-col justify-center text-center">
            <h1 class="text-3xl md:text-7xl m-auto p-2 font-bold">(who, is)</h1>
            <div
              class="relative w-72 m-auto"
              onKeyUp={(event) => submitFromKey(event)}
            >
              <input
                type="text"
                class="w-full h-10 pl-6 bg-black outline-2 border-b-2 border-gray-400 focus:outline-none"
                // class="w-[250px] xl:w-[60px] 2xl:w-[100px] p-2 xl:px-6 xl:py-1 pl-6 h-full bg-stone-100 dark:bg-gray-800 text-stone-600 placeholder:text-stone-600 dark:text-gray-300 placeholder:dark:text-gray-300 outline-0 rounded-md border border-stone-200 dark:border-gray-900 focus:bg-white focus:border-cyan-500"
                placeholder="address or .avax/.fire/.moo"
                value={inputText}
                onChange={(event) => handleUserInput(event)}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="hover:text-white hover:cursor-pointer w-3 h-3 absolute top-1/2 left-2 -translate-y-1/2 z-20 text-stone-400 dark:text-gray-700"
                onClick={(e) => submitFromForm(e)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div class="text-gray-400 py-4">
              {validSearch ? (
                <ValidSearch
                  forwardLookup={forwardLookup}
                  reverseLookup={reverseLookup}
                  addressforAvvy={addressforAvvy}
                  addressForFire={addressForFire}
                  avvyDomain={avvyDomain}
                  validAvvy={validAvvy}
                  dotFireDomain={dotFireDomain}
                  validFire={validFire}
                />
              ) : (
                <InvalidSearch error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
