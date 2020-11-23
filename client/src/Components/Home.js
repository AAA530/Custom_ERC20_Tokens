import React, { useState, useEffect } from "react";
import KaspTokens from "./../contracts/KaspTokens.json";
import getWeb3 from "./../getWeb3";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const [accounts, setAccounts] = useState();
  const [KaspTokensInstance, setKaspTokensInstance] = useState();
  const [obj, setObj] = useState({
    loaded: false,
    address: "",
    token_name: "",
  });
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    async function ConfigureWithTruffle() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        console.log(accounts);
        setAccounts(accounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const KaspTokensInstance = new web3.eth.Contract(
          KaspTokens.abi,
          KaspTokens.networks[networkId] &&
            KaspTokens.networks[networkId].address
        );
        console.log(KaspTokensInstance);
        setKaspTokensInstance(KaspTokensInstance);

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

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(name);
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    const to_name = await KaspTokensInstance.methods.name().call();
    console.log(to_name);
    setObj({ ...obj, token_name: to_name });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          //   alignItems="center"
          xs={6}
          style={{
            minHeight: "50vh",
            backgroundColor: "#cfe8fc",
            borderRadius: "50px",
          }}
        >
          <Grid item xs={6} style={{ margin: "0 auto", textAlign: "center" }}>
            <p>Kasper Tokens</p>
            <input
              type="text"
              value={obj.address}
              name="address"
              onChange={handleInputChange}
            />
            <button type="submit" onClick={handleOnSubmit}>
              Submit
            </button>
            <br />
            <p>{obj.token_name}</p>
            <p>Kasper Tokens</p>
            <p>Kasper Tokens</p>
            <p>Kasper Tokens</p>
            <p>Kasper Tokens</p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
