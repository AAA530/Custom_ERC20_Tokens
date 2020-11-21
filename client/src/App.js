// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState();
  const [SimpleStorageInstance, setSimpleStorageInstance] = useState();
  const [obj, setObj] = useState({
    loaded: false,
    kycAddress: "",
  });
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    async function ConfigureWithTruffle() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        setAccounts(accounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const SimpleStorageInstance = new web3.eth.Contract(
          SimpleStorage.abi,
          SimpleStorage.networks[networkId] &&
            SimpleStorage.networks[networkId].address
        );
        setSimpleStorageInstance(SimpleStorageInstance);

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setObj({ ...obj, loaded: true });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    ConfigureWithTruffle();
  }, []);

  console.log(obj);
  return (
    <div>
      <h1>Starter Project Files</h1>
    </div>
  );
}

export default App;
