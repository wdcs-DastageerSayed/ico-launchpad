import React from 'react'
import Popup from 'reactjs-popup'
import CoinDetails from '../CoinDetails/CoinDetails'
import './ICOlist.css'

const ICOlist = ({tokenName, tokenSymbol, tokenAddress, tokenSupply }) => {
  return (
    <div className="list">
        <img />
        <h4>{tokenSymbol}</h4>
        <h4>{tokenName}</h4>
        <h4>{tokenAddress}</h4>
        <h4>{tokenSupply}</h4>
        <Popup trigger={<button>View Details</button>} modal>
          <div><CoinDetails /></div>
        </Popup>
    </div>
  )
}

export default ICOlist