const KaspTokenSale = artifacts.require("./KaspTokenSale.sol");
const KaspTokens = artifacts.require("./KaspTokens.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("KaspTokenSale", async (accounts) => {
  it("Initialize Token Sale with correct values", async () => {
    const KaspTokensSaleInstance = await KaspTokenSale.deployed();
    let tokenprice = 1000000000000000;
    return expect(
      await KaspTokensSaleInstance.tokenprice()
    ).to.be.a.bignumber.equal(new BN(tokenprice));
  });

  it("Tests Buy Tokens Function", async () => {
    const KaspTokensInstance = await KaspTokens.deployed();
    const KaspTokensSaleInstance = await KaspTokenSale.deployed();
    let tokenprice = 1000000000000000;
    let availableToken = 75000;

    let numberOfToken = 1;
    value = numberOfToken * tokenprice;

    await KaspTokensInstance.transfer(
      KaspTokensSaleInstance.address,
      availableToken
    );
    await KaspTokensSaleInstance.buyTokens(numberOfToken, {
      from: accounts[1],
      value: value,
    });

    return expect(
      await KaspTokensInstance.balanceOf(accounts[1])
    ).to.be.a.bignumber.equal(new BN(numberOfToken));
  });
});
