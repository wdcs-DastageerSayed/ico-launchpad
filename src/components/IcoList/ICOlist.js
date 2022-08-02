import React from 'react'
import './ICOlist.css'

const ICOlist = ({tokenName, tokenSymbol, tokenAddress, tokenSupply, isHeader }) => {
  return (
    <div className="list">
        <img />
        <h4>{tokenSymbol}</h4>
        <h4>{tokenName}</h4>
        <h4>{tokenAddress}</h4>
        <h4>{tokenSupply}</h4>
        {isHeader ? (<div></div>) : ( <button>"View Details"</button>)}
    </div>
  )
}

export default ICOlist