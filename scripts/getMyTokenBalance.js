const UzairToken = artifacts.require("UzairToken")
const PoolToken = artifacts.require("PoolToken")

module.exports = async function (callback) {
    // Deploy MyToken
    const accounts = await new web3.eth.getAccounts()
    const myToken = await UzairToken.deployed();
    ///Deploy Pool Token
    const farmToken = await PoolToken.deployed();

    // const allowanceBefore = await myToken.allowance(
    //     accounts[0],
    //     farmToken.address
    //   )
    //   console.log(
    //     "Amount of UzairToken PoolToken is allowed to transfer on our behalf Before: " +
    //       allowanceBefore.toString()
    //     )

    // await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"));

    // // Validate that the farmToken can now move x amount of MyToken on our behalf
    // const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
    // console.log(
    //     "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
    //     allowanceAfter.toString()
    // )

    // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
    balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
    balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
    console.log("*** My Token ***")
    console.log(
        "Balance MyToken Before accounts[0] " +
        web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
    )
    console.log(
        "Balance MyToken Before TokenFarm " +
        web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
    )

    console.log("*** Farm Token ***")
    balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
    balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
    console.log(
      "Balance FarmToken Before accounts[0] " +
        web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
    )
    console.log(
      "Balance FarmToken Before TokenFarm " +
        web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
    )

    console.log("Call Deposit Function")
    totalSend = web3.utils.toWei("100", "ether");
    console.log("Total to Send ", totalSend);
    await farmToken.deposit(totalSend)
    console.log("*** My Token ***")
    balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
    balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
    console.log(
      "Balance MyToken After accounts[0] " +
        web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
    )
    console.log(
      "Balance MyToken After TokenFarm " +
        web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
    )

    console.log("*** Farm Token ***")
    balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
    balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
    console.log(
        "Balance FarmToken After accounts[0] " +
        web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
    )
    console.log(
        "Balance FarmToken After TokenFarm " +
        web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
    )


    callback()
  
}
  