import React, { useState } from 'react'
import { TextInput } from '../LaunchICO/LaunchICO'
import './CoinDetails.css'

const CoinDetails = ({tokenName, tokenSymbol, tokenSupply,tokenAddress, tokenStartDate, tokenEndDate, tokenRate}) => {
  const [open,setOpen] = useState(true)

  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div className="coinDetailsContainer">
       {open && ( <div className="coinDetails">
            <button className='close' onClick={closeModal}>
              &times;
            </button>
            <img />
            <h4>Token Name: {tokenName}</h4>
            <h4>Token Symbol: {tokenSymbol} </h4>
            <h4>Token Total Supply: {tokenSupply}</h4>
            <h4>ICO Start Date: {tokenStartDate}</h4>
            <h4>ICO End Date: {tokenEndDate}</h4>
            <h4>Rate: {tokenRate}</h4>
            <h4>Token Address: {tokenAddress}</h4>
            <TextInput label="Amount to buy" placeholder="amount to buy" />
            <button>Buy</button>
        </div>)}
    </div>
  )
}

export default CoinDetails