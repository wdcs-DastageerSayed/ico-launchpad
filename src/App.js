import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Web3 from 'web3';
import Launch_abi from "./metadata/Launch.json";
import './App.css';

import CoinDetails from './components/CoinDetails/CoinDetails';
import ICOlist from './components/IcoList/ICOlist';
import LaunchICO from './components/LaunchICO/LaunchICO';
import Launch from "./components/Launch/Launch";


let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9"));


// console.log(List);
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
  // fetch()


  const fetch = async() => {
    const contract = new web3.eth.Contract(Launch_abi, "0x86F02E3AD9c061931dEAA7209327Fb3a969bdc00");
    const counter = await contract.methods.counter().call()
    console.log(counter);

    for(let i=0; i < counter; i++){
      const parr = await contract.methods.parr(i).call()
      List.push(parr);
    }
    setList(List)
    setFetchList(true)
  }

 

  // const deploy = async() => {
  //   console.log(account);
  //   const dep = await new web3.eth.Contract(ERC_abi).deploy({
  //     data: ERC_bytecode,
  //     arguments: [tokenName,tokenSymbol, tokenSupply]
  //   }).send({from:account, gas:3000000});
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

  useEffect(() => {
  metamask()
  fetch()
  }, [account])

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
      
          {!fetchList ? (<h4 className="icoNot">No ICO available</h4> ) :( 
            // List.map((key) => {<ICOlist tokenSymbol={key.symbol} tokenName={key.name} tokenAddress={key.projectAdd} tokenSupply={key.noTokens} tokenStartDate={key.startDate} tokenEndDate={key.endDate} tokenRate={key.rate} />
            
            //  console.log(key)})
          // List.forEach((i) => {<ICOlist tokenSymbol={List[i].symbol} tokenName={List[i].name} tokenAddress={List[i].projectAdd} tokenSupply={List[i].noTokens} tokenStartDate={List[i].startDate} tokenEndDate={List[i].endDate} tokenRate={List[i].rate} />})
           <ICOlist tokenSymbol={List[0].symbol} tokenName={List[0].name} tokenAddress={List[0].projectAdd} tokenSupply={List[0].noTokens} tokenStartDate={List[0].startDate} tokenEndDate={List[0].endDate} tokenRate={List[0].rate} />
            )}
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
      <Popup modal trigger={<button>Already have a token? </button>}>
        <Launch />
      </Popup>
      </div>

    </div>
  );
}

export default App;