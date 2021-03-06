const Migrations = artifacts.require("Migrations");
const ExfilOracle = artifacts.require("ExfilOracle");
const TellorPlayground = artifacts.require("TellorPlayground");

const mainnetAddress = "0x0Ba45A8b5d5575935B8158a88C631E9F9C95a2e5";
const testAddress = "0x20374E579832859f180536A69093A126Db1c8aE9";

module.exports = function (deployer, network) {
  if (network == "mainnet") {
    deployer.deploy(ExfilOracle, mainnetAddress);
  } else if (
    network == "rinkeby" ||
    network == "goerli" ||
    network == "kovan" ||
    network == "ropsten"
  ) {
    deployer.deploy(ExfilOracle, testAddress);
  } else {
    //deploy TellorPlayground
    deployer.deploy(TellorPlayground).then((instance) => {
      deployer.deploy(ExfilOracle, instance.address);
    });
  }
};
