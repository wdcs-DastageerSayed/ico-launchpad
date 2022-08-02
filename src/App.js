import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

import './App.css';
import CoinDetails from './components/CoinDetails/CoinDetails';
import ICOlist from './components/IcoList/ICOlist';
import LaunchICO from './components/LaunchICO/LaunchICO';

const List = [
  
]

function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState("")

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
      // <Navigate to="/launchico"
  }


 
  return (
    <div className="App">
      <header className="appHeader">
        <div className="connectButton" onClick={metamask}>{connected && account ? account : "connect Wallet"}</div>
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
        {/* */}
        <Popup trigger={ <div className="launchButton" onClick={launchIPO}>Launch ICO</div>} 
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
