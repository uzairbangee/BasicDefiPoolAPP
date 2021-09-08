import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from "web3";
import UzairToken from "./abi/UzairToken.json";
import PoolToken from "./abi/PoolToken.json";

const web3 = new Web3(Web3.givenProvider);

declare global {
  interface Window {
      ethereum: any;
      web3: any;
  }
}

function App() {

  const [loading, setLoading] = useState<Boolean>(false);
  const [account, setAccount] = useState("");
  const [uzairAdress, setUzairAdress] = useState<any>();
  const [poolAdress, setPoolAdress] = useState<any>();
  const [uzairToken, setUzairToken] = useState<any>({});
  const [uzairTokenBalance, setUzairTokenBalance] = useState(0);
  const [poolTokenBalance, setPoolTokenBalance] = useState(0);
  const [poolToken, setPoolToken] = useState<any>({});

  console.log("uzairToken ", uzairToken?.methods);
  console.log("poolToken ", poolToken?.methods);

  useEffect(() => {
    (async() => {
      await initialize();
    })();
  }, []);

  const checkBalance = async () => {
    const ubalance = await uzairToken?.methods.balanceOf(account).call();
    setUzairTokenBalance(Number(web3.utils.fromWei(ubalance, 'ether')));
    const pBalance = await uzairToken?.methods.balanceOf(poolAdress).call();
    setPoolTokenBalance(Number(web3.utils.fromWei(pBalance, 'ether')));
  }

  const initialize = async () => {
    if(Web3.givenProvider){
      const addresses = await web3.eth.getAccounts();
      if(addresses.length > 0){
        setAccount(addresses[0]);
        const UzairNetworkData = UzairToken.networks["5777"];
        const PoolNetworkData = PoolToken.networks["5777"];
        if(UzairNetworkData && PoolNetworkData) {
          setUzairAdress(UzairNetworkData.address);
          setPoolAdress(PoolNetworkData.address);
          const uToken: any = new web3.eth.Contract(UzairToken.abi as any, UzairNetworkData.address)
          const pToken: any = new web3.eth.Contract(PoolToken.abi as any, PoolNetworkData.address)
          setUzairToken(uToken);
          setPoolToken(pToken);
          const ubalance = await uToken?.methods.balanceOf(addresses[0]).call();
          setUzairTokenBalance(Number(web3.utils.fromWei(ubalance, 'ether')));
          const pBalance = await uToken?.methods.balanceOf(PoolNetworkData.address).call();
          setPoolTokenBalance(Number(web3.utils.fromWei(pBalance, 'ether')));


        } else {
          window.alert('Marketplace contract not deployed to detected network.')
        }
      }
    }
  }

  const getAccount = async () => {
    setLoading(true);
    try{
      if(typeof window !== undefined){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
      }
      setLoading(false);
    }
    catch(err){
      setLoading(false);
    }
  }

  const deposit = async () => {
      const amount = web3.utils.toWei("100", "ether");
      await uzairToken.methods.approve(poolAdress, amount).send({ from: account });
      await poolToken!.methods.deposit(amount).send({ from: account });
      await checkBalance();
  }

  const withdraw = async () => {
    const amount = web3.utils.toWei("100", "ether");
    // await uzairToken.methods.approve(poolAdress, amount).send({ from: account });
    await poolToken!.methods.withdraw(amount).send({ from: account });
    await checkBalance();
  }


  return (
    <div className="App">
      {
        account
        ?
        <>
          <h3>Connected Account : {account}</h3>
          <h3>BALANCE : {uzairTokenBalance} UZT</h3>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <h3>Pool Account : {poolAdress}</h3>
          <h3>BALANCE : {poolTokenBalance} PTK</h3>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <button onClick={deposit}> ADD 100 UZT to Pool </button>
          <button onClick={withdraw}> WithDraw 100 UZT from Pool </button>

        </>
        :
          loading
          ?
          <button className="enableEthereumButton" disabled={true}>loading ....</button>
          :
          <button className="enableEthereumButton" onClick={getAccount}>Connect Wallet</button>

      }

      
    </div>
  );
}

export default App;
