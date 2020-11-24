import React, { useState, useEffect } from "react";
import KaspTokens from "./../contracts/KaspTokens.json";
import getWeb3 from "./../getWeb3";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Home() {
  const [accounts, setAccounts] = useState();
  const [KaspTokensInstance, setKaspTokensInstance] = useState();
  const [obj, setObj] = useState({
    loaded: false,
    amount: "",
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
          item
          xs={6}
          direction="column"
          justify="center"
          alignItems="center"
          style={{
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            // borderRadius: "50px",
          }}
        >
          <Typography
            variant="h4"
            style={{ margin: "50px auto" }}
            component="h2"
          >
            Kasper Tokens ICO Sale
          </Typography>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          xs={6}
          style={{
            minHeight: "100vh",
            backgroundColor: "#cfe8fc",
            // borderRadius: "50px",
          }}
        >
          <Grid container item xs={10} style={{ textAlign: "center" }}>
            <Grid container item spacing={3} direction="row">
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Enter Amount"
                  variant="outlined"
                  fullWidth
                  value={obj.address}
                  name="amount"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  color="primary"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleOnSubmit}
                >
                  BUY
                </Button>
              </Grid>
            </Grid>
            <br />
            <p>{obj.token_name}</p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
