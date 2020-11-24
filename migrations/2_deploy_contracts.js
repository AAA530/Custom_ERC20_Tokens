var KaspTokens = artifacts.require("./KaspTokens.sol");
var KaspTokenSale = artifacts.require("./KaspTokenSale.sol");

module.exports = async function (deployer) {
  let tokenprice = 1000000000000000;
  await deployer.deploy(KaspTokens, 1000000, "Kasper", "KASP");
  await deployer.deploy(KaspTokenSale, KaspTokens.address, tokenprice);

  const KaspTokensInstance = await KaspTokens.deployed();
  const KaspTokensSaleInstance = await KaspTokenSale.deployed();
  let availableToken = 75000;

  await KaspTokensInstance.transfer(
    KaspTokensSaleInstance.address,
    availableToken
  );
};
