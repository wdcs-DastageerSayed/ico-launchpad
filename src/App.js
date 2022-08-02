import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import CoinDetails from './components/CoinDetails/CoinDetails';
import ICOlist from './components/IcoList/ICOlist';
import ERC20_abi from "./erc20_abi.json";

const List = [
  
]

function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState("")

  let web3 = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/93cb9b09ad17492ebf579b891db201c9");

  const deploy = async() => {
    const dep = await new web3.eth.Contract(ERC20_abi).deploy({})
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

  const launchIPO = () => {
    alert("launch")
  }

  useEffect(() => {
    
  }, [])
  
  return (
    <div className="App">
      <header className="appHeader">
        <div className="connectButton" onClick={metamask}>{connected ? account : "connect Wallet"}</div>
      </header>
      <div className="appBody">
        <div className="icoList">
          <h2>Listed Coins</h2>
           <ICOlist tokenSymbol="SAGA" tokenName="SAGA" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="100000" />
          <ICOlist  tokenSymbol="ABC" tokenName="ABC" tokenAddress="0xe35e0d8be7d7e20fedde7a7e2ed2dc646291855b" tokenSupply="10000000"/>
          <ICOlist />
        </div>
      </div>
      <div className="footer">
        <div className="launchButton" onClick={launchIPO}>Launch ICO</div>
      </div>

    </div>
  );
}

export default App;
