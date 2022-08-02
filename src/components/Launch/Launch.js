import React from 'react'
import { TextInput } from '../LaunchICO/LaunchICO'
import './Launch.css'

const Launch = () => {
  return (
    <div className="launch">
        <TextInput label="Supply Amount"  placeholder="Amount To Supply" />
        <TextInput label="Token Address"  placeholder="Token Address" />
        <input type="submit" placeholder="Submit" name="Submit" />   
    </div>
  )
}

export default Launch