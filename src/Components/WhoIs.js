import { useState } from "react";
// import getUsernameForAddress from "./util/usernames";
import {
  getUsernameForAddress,
  lookupAvvy,
  lookupFire,
} from "./util/usernames";

export default function WhoIs() {
  const [inputText, setInputText] = useState(null);
  const [avvy, setAvvy] = useState();
  const [dotFire, setDotFire] = useState();
  const [avvyError, setAvvyError] = useState(false);
  const [fireError, setFireError] = useState(false);

  const handleUserInput = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const submitLookup = async (e) => {
    console.log(e);
    if (e.key === "Enter") {
      console.log("Lookup for: " + inputText);
      const dns = await getUsernameForAddress(inputText);
      const avvyDomain = await lookupAvvy(inputText);
      const fireDomain = await lookupFire(inputText);
      if (avvyDomain) {
        setAvvy(avvyDomain);
      } else {
      }
      if (fireDomain) {
        setDotFire(fireDomain);
      }
    }
  };

  return (
    <>
      <div class="h-[93vh] md:h-[100vh] bg-black">
        <div class="text-white flex justify-center flex-col w-full h-full">
          <div class="m-auto flex flex-col justify-center text-center">
            <h1 class="text-3xl md:text-7xl m-auto p-2 font-bold">(who, is)</h1>
            <div class="relative" onKeyUp={(event) => submitLookup(event)}>
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
                class="w-3 h-3 absolute top-1/2 left-2 -translate-y-1/2 z-20 text-stone-400 dark:text-gray-700"
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
              {avvy && <h3>Registered .avax: {avvy}</h3>}
              {avvyError && (
                <h3>
                  No .avax domain registerd. Get one{" "}
                  <a href="https://app.avvy.domains/register">here</a>!
                </h3>
              )}
              {dotFire && <h3>Registered .fire/.moo: {dotFire}</h3>}
              {fireError && (
                <h3>
                  No .fire domain registerd. Get one{" "}
                  <a href="https://campfire.exchange/minting/fire">here</a>!
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
