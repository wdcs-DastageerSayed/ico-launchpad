var USDC2 = artifacts.require("USDC2");

module.exports = function(deployer) {
  deployer.deploy(USDC2,"1000000000000000000", "DevCoin", "DC") ;
};
