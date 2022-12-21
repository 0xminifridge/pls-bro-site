import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { web3ModalSetup } from "./Components/util/web3ModalUtil";
import PageNotFound from "./Components/PageNotFound";
import Footer from "./Components/Footer";

export default function App() {
  const [account, setAccount] = useState("");
  const [web3Provider, setWeb3Provider] = useState(null);
  const web3Modal = web3ModalSetup();

  // logout function
  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (
      web3Provider &&
      web3Provider.provider &&
      typeof web3Provider.provider.disconnect == "function"
    ) {
      await web3Provider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  // multiple wallet support
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setWeb3Provider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", (chainId) => {
      console.log(`Chain changed to -- ${chainId}`);
      setWeb3Provider(new ethers.providers.Web3Provider(provider));
      setTimeout(() => {
        window.location.reload();
      }, 1);
    });

    provider.on("accountsChanged", () => {
      console.log(`Account changed`);
      setWeb3Provider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log("Disconnecting...");
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setWeb3Provider]);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      console.log("loading");
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    const getAddress = async () => {
      if (web3Provider && web3Provider.getSigner()) {
        const newAddress = await web3Provider.getSigner().getAddress();
        setAccount(newAddress);
      }
    };
    getAddress();
  }, [web3Provider]);

  let docTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "Pls bro come back bro";
  });
  window.addEventListener("focus", () => {
    document.title = docTitle;
  });

  const Routing = () => {
    return (
      <BrowserRouter>
        <Navbar
          account={account}
          setAccount={setAccount}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          web3Provider={web3Provider}
          setWeb3Provider={setWeb3Provider}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/404" exact component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  };
  return (
    <>
      <Routing />
    </>
  );
}
