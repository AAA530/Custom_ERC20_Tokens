const KaspTokens = artifacts.require("./KaspTokens.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);

chai.use(chainBN);

var chaiAsPromise = require("chai-as-promised");
chai.use(chaiAsPromise);

const expect = chai.expect;
contract("KaspTokens", async (accounts) => {
  it("Initial Balance check", async () => {
    const KaspTokensInstance = await KaspTokens.deployed();

    let totalSupply = await KaspTokensInstance.totalSupply();
    var Initial_supply = 1000000;
    return expect(
      await KaspTokensInstance.totalSupply()
    ).to.be.a.bignumber.equal(new BN(Initial_supply));
  });
});
