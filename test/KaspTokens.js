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
    let Initial_supply = 1000000;
    let account_bal = await KaspTokensInstance.balanceOf(accounts[0]);
    return expect(
      await KaspTokensInstance.totalSupply()
    ).to.be.a.bignumber.equal(account_bal);
  });

  it("Contract Deployed With Correct Values", async () => {
    const KaspTokensInstance = await KaspTokens.deployed();

    let name = await KaspTokensInstance.name();
    let Initial_supply = 1000000;
    let symbol = await KaspTokensInstance.symbol();
    expect(await KaspTokensInstance.name()).to.be.a.bignumber.equal("Kasper");

    return expect(await KaspTokensInstance.symbol()).to.be.a.bignumber.equal(
      "KASP"
    );
  });

  it("Testing Transfer Function", async () => {
    const KaspTokensInstance = await KaspTokens.deployed();

    expect(KaspTokensInstance.transfer(accounts[1], 100000000)).to.be.eventually
      .rejected;

    const res = await KaspTokensInstance.transfer(accounts[1], 20);
    return expect(
      await KaspTokensInstance.balanceOf(accounts[1])
    ).to.be.a.bignumber.equal(new BN(20));
  });
});
