import React from 'react'
import { TextInput } from '../LaunchICO/LaunchICO'
import './Launch.css'

const Launch = () => {
  return (
    <div className="launch">
        <TextInput label="Token Address" value="address" placeholder="Token Address" />
        <TextInput label="Supply Amount" value="amount" placeholder="Amount To Supply" />
        <TextInput label="Rate" value="amount" placeholder= "Rate" />
        <TextInput label="Token" value="amount" placeholder="No of Tokens"/>
        <TextInput label="Start Time" value="amount" placeholder="Start Time" />
        <TextInput label="End Time" value="amount" placeholder="End Time" />
        <input type="submit" placeholder="Submit" name="Submit" />   
    </div>
  )
}

export default Launch