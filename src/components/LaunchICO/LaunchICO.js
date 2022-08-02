import React from 'react'
import Popup from 'reactjs-popup'
import Launch from '../Launch/Launch'
import './LaunchICO.css'

export const TextInput = ({label, placeholder}) => {
    return(
        <div className='textContainer'>
            <label>{label}</label>
            <input type="text" placeholder={placeholder} /> 
        </div>
    )
}

const LaunchICO = () => {
  return (
    <div className='modalContainer'>
      <Popup modal trigger={<button>Already have a token? </button>}><Launch /></Popup>
      <div className="line"></div>
      <TextInput name="tokenName" label="Token Name" placeholder="Token Name" />
      <TextInput name="tokenSymbol" label="Token Symbol" placeholder="Token Symbol" />
      <TextInput name="initialAmount" label="Initial Amount" placeholder="Initial Amount" />
      <button>Mint</button>
    </div>
  )
}

export default LaunchICO