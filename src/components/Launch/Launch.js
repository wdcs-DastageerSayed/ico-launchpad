import React from 'react'
import { TextInput } from '../LaunchICO/LaunchICO'
import './Launch.css'

const Launch = () => {
  return (
    <div className="launch">
        <TextInput label="Supply Amount" value="amount" placeholder="Amount To Supply" />
        <TextInput label="Token Address" value="address" placeholder="Token Address" />
        <input type="submit" placeholder="Submit" name="Submit" />   
    </div>
  )
}

export default Launch