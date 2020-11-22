var KaspTokens = artifacts.require("./KaspTokens.sol");

module.exports = function (deployer) {
  deployer.deploy(KaspTokens);
};
