import React from 'react'
import './LaunchICO.css'

const TextInput = ({label}) => {
    return(
        <div className='textContainer'>
            <label>{label}</label>
            <input type="text" /> 
        </div>
    )
}

const LaunchICO = () => {
  return (
    <div className='modalContainer'>
      <TextInput name="tokenName" label="Token Name" />
      <TextInput name="tokenSymbol" label="Token Symbol" />
      <TextInput name="tokenAddress" label="Token Address" />
      <TextInput name="initialAmount" label="Initial Amount" />
      <button>Mint</button>
    </div>
  )
}

export default LaunchICO