import React, { useState } from 'react'
import { TextInput } from '../LaunchICO/LaunchICO'
import './Launch.css'

const Launch = () => {
  const [tokenName, setTokenName] = useState("")
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")

  return (
    <div className="launch">
        <TextInput label="Supply Amount" value="amount" placeholder="Amount To Supply" />
        <TextInput label="Token Address" value="address" placeholder="Token Address" />
        <input type="submit" placeholder="Submit" name="Submit" />   
    </div>
  )
}

export default Launch