const UzairToken = artifacts.require("UzairToken")
const PoolToken = artifacts.require("PoolToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(UzairToken)
  const myToken = await UzairToken.deployed();
  ///Deploy Pool Token
  await deployer.deploy(PoolToken, UzairToken.address)
  const farmToken = await PoolToken.deployed()

}
