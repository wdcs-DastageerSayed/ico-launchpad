import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import Web3 from 'web3';
import Launch_abi from "./metadata/Launch.json";
import './App.css';

import ICOlist from './components/IcoList/ICOlist';
import LaunchICO from './components/LaunchICO/LaunchICO';
import Launch from "./components/Launch/Launch";


let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9"));

const List = []

// const fetch = async() => {
//   const contract = new web3.eth.Contract(Launch_abi, "0x86F02E3AD9c061931dEAA7209327Fb3a969bdc00");
//   const counter = await contract.methods.counter().call();
 
//   for(let i=0; i <= counter; i++){
//   const parr = await contract.methods.parr(i).call()
//   List.push(parr);
//   console.log(parr);
//   }
// }


function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState("")
  const [connectionStatus, setConnectionStatus] = useState()
  const [fetchList, setFetchList] = useState(false)
  const [list, setList] = useState([{}])

//  console.log(list);



  const fetch = async() => {
    const contract = new web3.eth.Contract(Launch_abi, "0xd8C64842901DC685b810e8712A4574a804314efB");
    const counter = await contract.methods.counter().call()
    console.log(counter);

    for(let i=0; i < counter; i++){
      const parr = await contract.methods.parr(i).call()
      List.push(parr);
    }
    // setList(List)
    setFetchList(true)
  }


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

  useEffect(() => {
  metamask()
  fetch()
  }, [account, connected])

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
          {/* <ICOlist tokenSymbol="SAGA" tokenName="SAGA" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="100000" /> */}
          {/* <ICOlist  tokenSymbol="ABC" tokenName="ABC" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="10000000"/> */}
      
          {!fetchList ? (<h4 className="icoNot">No ICO available</h4> ) : ( 
          List.map((list) => (<ICOlist tokenSymbol={list.symbol} tokenName={list.name} tokenAddress={list.projectAdd} tokenSupply={list.noTokens} tokenStartDate={list.startDate} tokenEndDate={list.endDate} tokenRate={list.rate} /> ))
            )}
        </div>
      </div>
      <div className="footer">
        <Popup trigger={ <div className="launchButton">Launch ICO</div>} modal>
          <LaunchICO />
      </Popup>
      <Popup modal trigger={<button className="launchButton">Already have a token? </button>}>
        <Launch />
      </Popup>
      </div>

    </div>
  );
}

export default App;