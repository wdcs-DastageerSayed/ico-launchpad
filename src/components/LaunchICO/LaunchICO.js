import React from 'react'
import Popup from 'reactjs-popup'
import Launch from '../Launch/Launch'
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
      <Popup modal trigger={<button>Already have a token? </button>}><Launch /></Popup>
      <div className="line"></div>
      <TextInput name="tokenName" label="Token Name" />
      <TextInput name="tokenSymbol" label="Token Symbol" />
      <TextInput name="initialAmount" label="Initial Amount" />
      <button>Mint</button>
    </div>
  )
}

export default LaunchICO