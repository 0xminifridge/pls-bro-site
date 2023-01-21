import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { parseWalletAddress } from "./util/walletUtil";
import { getContractParameters, mintWhitelist } from "./util/ladderUtil";
import { mint } from "./util/ladderUtil";
import { Contract, ethers } from "ethers";
import { LADDER_ADDRESS, LADDER_ABI } from "../contracts/Ladder";
import { getCurrentNetwork } from "./util/walletUtil";
import { MintingCollectionData } from "./constants/Collections";
import { getCollectionDetails } from "./util/firebaseUtil";

export default function MintingCollectionPage({
  account,
  transactionProcessing,
  setTransactionProcessing,
  setTransactionHash,
}) {
  const [collectionDetails, setCollectionDetails] = useState({ name: "" });
  const [mintAmount, setMintAmount] = useState(1);
  const [whitelisted, setWhitelisted] = useState(null);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(3);
  const [whitelistOpen, setWhitelistOpen] = useState(false);
  const [publicSaleOpen, setPublicSaleOpen] = useState(false);

  const [mintOpen, setMintOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const MINT_ABI = [
    {
      inputs: [
        { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  useEffect(() => {
    const updateMintOpen = async () => {
      if (collectionDetails) {
        setMintOpen(
          new Date(collectionDetails.mintStartTime.seconds * 1000) < new Date()
        );
      }
    };
    updateMintOpen();
  }, [collectionDetails]);

  const mintPressed = async (address) => {
    console.log(address, amount);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (address && MINT_ABI && signer) {
          const contract = new Contract(address, MINT_ABI, signer);

          const totalPrice = parseFloat(collectionDetails.price) * amount;

          let tx = await contract.mint(amount, {
            value: ethers.utils.parseEther(totalPrice.toString()),
          });
          let hash = tx.hash;
          setTransactionHash(hash);
          await tx.wait();
        } else {
          console.log("Issue with address, abi, or signer");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTransactionProcessing(false);
    }
  };

  const { address } = useParams();

  const fetchCollectionDetails = async () => {
    console.log("fetching for: " + address);
    let collectionData = await getCollectionDetails(address);
    console.log(collectionData);

    if (collectionData) {
      console.log("details found");
      setCollectionDetails(collectionData);
      // console.log(
      //   new Date(collectionDetails.mintStartTime.seconds * 1000) < new Date()
      // );
      // setMintOpen(
      //   new Date(collectionDetails.mintStartTime.seconds * 1000) < new Date()
      // );
    } else {
      console.log(`No details for address ${address}`);
    }
  };

  useEffect(() => {
    fetchCollectionDetails();
  }, []);

  return (
    <div class="h-[93vh] md:h-[100vh] bg-black">
      <div class="text-white flex justify-center flex-col w-full h-full">
        <div class="m-auto flex flex-col justify-center">
          {account && (
            <span class="text-gray-400 m-auto">
              Authenticated as: {parseWalletAddress(account)}
            </span>
          )}

          <h1 class="text-3xl md:text-7xl m-auto p-2 font-bold hover:text-gray-400">
            <a href={collectionDetails.twitter} target="_blank">
              {collectionDetails.name}
            </a>
          </h1>

          <div class="flex justify-center flex-row text-gray-400">
            <span class="mx-2 my-1 hover:text-white">
              <a
                href={collectionDetails.twitter}
                target="_blank"
                class="hover:text-white"
              >
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="16"
                  height="16"
                >
                  <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                </svg>
              </a>
            </span>
            <span class="mx-2 my-1 hover:text-white">
              <a href={collectionDetails.discord} target="_blank">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 71 55"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="current"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </span>
            <span class="mx-2 my-1 hover:text-white">
              <a href={collectionDetails.website} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-globe"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </span>
          </div>

          <a
            href={`https://campfire.exchange/collections/${collectionDetails.address}`}
            target="_blank"
          >
            <div class="border-2 border-white rounded-xl overflow-hidden w-40 md:w-64 m-auto hover:opacity-80">
              <img
                src={collectionDetails.previewImageUrl}
                class="w-40 md:w-64"
              />
            </div>
          </a>
          {collectionDetails.mintStartTime && mintOpen ? (
            <span class="m-auto text-gray-400 text-xl py-2">Sale is live!</span>
          ) : (
            <span class="m-auto text-gray-400 text-xl py-2">
              Minting has not started
            </span>
          )}
          <span class="m-auto text-gray-400 text-xl py-2">
            Price: {collectionDetails.price} AVAX
          </span>
          <div class="w-40 m-auto">
            {/* <div class="flex flex-row justify-between m-4 items-center text-2xl">
              <button
                class="border-gray-400 px-2 py-1 rounded border-2 text-gray-400 hover:text-white hover:border-white"
                onClick={() => decrement()}
              >
                -
              </button>
              <span class=" px-2 py-1 rounded text-white">{mintAmount}</span>
              <button
                class="border-gray-400 px-2 py-1 rounded border-2 text-gray-400 hover:text-white hover:border-white"
                onClick={() => increment()}
              >
                +
              </button>
            </div> */}
            <select
              style={{
                visibility: collectionDetails.amountPerTx
                  ? "visible"
                  : "hidden",
              }}
              onChange={(event) => setAmount(event.target.value)}
              class="w-full mb-4 rounded-md bg-black py-2 px-3 grow focus:outline-none focus:ring-white hover:border-white focus:ring-1 border-2 border-gray-400"
            >
              {[...Array(collectionDetails.amountPerTx)].map(
                (element, index) => {
                  // return <option value={element + 1}>{element + 1}</option>;
                  return <option>{index + 1}</option>;
                }
              )}
            </select>
          </div>

          <button
            class="border-gray-400 px-2 py-1 rounded text-lg border-2 text-gray-400 hover:text-white hover:border-white w-20 m-auto disabled:text-black disabled:border-black"
            disabled={transactionProcessing}
            onClick={() => mintPressed(collectionDetails.address)}
          >
            Mint
          </button>
          {/* <div class="flex justify-center flex-col m-4 text-center text-gray-400">
            {whitelisted && !error && <span>You are on the allowlist</span>}
            {!whitelisted && !error && <span>You are not the allowlist</span>}
            {error && <span>Error: {error}</span>}
          </div> */}
        </div>
      </div>
    </div>
  );
}
