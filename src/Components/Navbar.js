import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import WalletButton from "./WalletButton";

export default function Navbar({
  account,
  setAccount,
  web3Modal,
  loadWeb3Modal,
  web3Provider,
  setWeb3Provider,
  logoutOfWeb3Modal,
}) {
  const toggleNav = () => {
    const navToggle = document.getElementById("navbar-default");
    navToggle.classList.toggle("hidden");
    navToggle.classList.toggle("nav-default");
  };

  return (
    <nav class="bg-black border-gray-200 px-2 sm:px-4 py-2.5 sticky top-0 h-[10vh]">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <Link to={{ pathname: "/" }} class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white hover:text-gray-400">
            (pls, bro)
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-black focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => toggleNav()}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col items-center p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-black">
            {MenuItems.map((item, index) => {
              return (
                <li>
                  <Link
                    to={{ pathname: item.tlink }}
                    class="block py-2 pr-4 pl-3 rounded md:border-0 md:hover:text-cd-green md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    onClick={() => toggleNav()}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <WalletButton
              account={account}
              setAccount={setAccount}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              web3Provider={web3Provider}
              setWeb3Provider={setWeb3Provider}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
