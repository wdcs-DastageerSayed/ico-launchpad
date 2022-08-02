import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Web3 from 'web3';

import './App.css';

import CoinDetails from './components/CoinDetails/CoinDetails';
import ICOlist from './components/IcoList/ICOlist';
import LaunchICO from './components/LaunchICO/LaunchICO';
import ERC_abi from "./metadata/ERC.json";
import ERC_bytecode from "./metadata/ERC_bytecode.json";


const List = []

let web3 = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9");

function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState("")
  const [connectionStatus, setConnectionStatus] = useState()

  // const deploy = async() => {
  //   const dep = await new web3.eth.Contract(ERC_abi).deploy({
  //     data: ERC_bytecode,
  //     arguments: [tokenName,tokenSymbol, tokenSupply]
  //   }).send({from:account[0], gas:3000000});
  //   console.log(dep);
  //   alert(dep.address);
  // }


  const metamask = async() => {
    if (window.ethereum) {
      if (!connected) {
      const account = await window.ethereum.request({method: "eth_requestAccounts" })
      setAccount(account[0])
      setConnected(true)
      }
      else {

      }
    } else {
      alert("Install Metamask extension!!!")
    }
  }

  // useEffect(() => {
  //   if (connected && account) 
  //   setConnectionStatus(account);
  //   else setConnectionStatus("Connect Wallet")
  //   // data()
  // })
 
  return (
    <div className="App">
      <header className="appHeader">
        {/* <h1>ICO LaunchPad</h1> */}
        <div className="connectButton" onClick={metamask}>{connected && account ? account : "Connect Wallet"}</div>
      </header>
      <div className="appBody">
        <div className="icoList">
          <h2>Listed ICOs</h2>
          <div className="line"></div>
          <ICOlist tokenSymbol="SAGA" tokenName="SAGA" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="100000" />
          <ICOlist  tokenSymbol="ABC" tokenName="ABC" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="10000000"/>
          <ICOlist />
          {/* {List ? (<h4 className="icoNot">No ICO available</h4> ) : <div></div>} */}
        </div>
      </div>
      <div className="footer">
        {/* */}
        <Popup trigger={ <div className="launchButton">Launch ICO</div>} 
        className="popup"
        modal
        contentStyle={{ padding: '0px', border: 'none', borderBlockColor: "red" }}
        >
          <LaunchICO />
      </Popup>
      </div>

    </div>
  );
}

export default App;
