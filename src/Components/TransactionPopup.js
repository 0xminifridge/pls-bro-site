// import LoadingData from "./LoadingData";

export default function TransactionPopup({
  transactionProcessing,
  transactionHash,
}) {
  if (transactionProcessing) {
    return (
      <>
        <div class="bg-black border-white border-solid border-2 rounded-lg z-[2000] w-auto fixed bottom-4 left-7 animate-pulse">
          <div class="flex flex-row justify-left px-2 py-4">
            <div class="flex">
              <svg
                class="m-auto bg-transparent block text-gray-400"
                width="50px"
                height="50px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  r="35"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            </div>

            <div class="flex flex-col items-center left-0 text-gray-400">
              {transactionHash !== "" ? (
                <div>
                  <h3 class="text-gray-400 font-bold">Please Wait</h3>
                  <h5 class="">
                    Transaction{" "}
                    <a
                      class="text-white"
                      href={`https://snowtrace.io/tx/${transactionHash}`}
                      target="_blank"
                    >
                      {transactionHash.substring(0, 4) +
                        "..." +
                        transactionHash.substring(transactionHash.length - 4)}
                    </a>{" "}
                    processing!
                  </h5>
                </div>
              ) : (
                <div class="">
                  <h3 class="text-gray-400 font-bold">Please Wait</h3>
                  <h5>Check your wallet for interaction!</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
