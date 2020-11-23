const KaspTokenSale = artifacts.require("./KaspTokenSale.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("KaspTokenSale", async (accounts) => {
  it("Initialize Token Sale with correct values", async () => {
    const KaspTokensInstance = await KaspTokenSale.deployed();
    let tokenprice = 1000000000000000;
    return expect(
      await KaspTokensInstance.tokenprice()
    ).to.be.a.bignumber.equal(new BN(tokenprice));
  });
});
