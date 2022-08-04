import React, { useState } from "react";
import { ethers } from "ethers";
import { TextInput } from "../LaunchICO/LaunchICO";
import "./Launch.css";

const Launch = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [rate, setRate] = useState("");
  const [returnToken, setReturnToken] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open,setOpen] =useState(true)

  const Data = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum) throw new Error("Wallet not connected");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      //console.log({ ether, addr });
    } catch (err) {
      console.log(err.message);
    }
    console.log(
      tokenAmount,
      tokenAddress,
      rate,
      returnToken,
      startDate,
      endDate
    );
  };

  const closeModal = () => {
    setOpen(false)
  }
  
  return (
   <div>
      {open && (
    <div className="launch">
       <button className="close" onClick={closeModal}>          
        &times;        
      </button>
    <TextInput
      onChange={(e) => {
        setTokenAmount(e.target.value);
      }}
      label="Supply Amount"
      value={tokenAmount}
      placeholder="Amount To Supply"
    />
    <TextInput
      onChange={(e) => {
        setTokenAddress(e.target.value);
      }}
      label="Token Address"
      value={tokenAddress}
      placeholder="Token Address"
    />
    <TextInput
      onChange={(e) => {
        setRate(e.target.value);
      }}
      label="Rate"
      value={rate}
      placeholder="Rate"
    />
    <TextInput
      onChange={(e) => {
        setReturnToken(e.target.value);
      }}
      label="Tokens"
      value={returnToken}
      placeholder="Number of Tokens"
    />
    <TextInput
      onChange={(e) => {
        setStartDate(e.target.value);
      }}
      label="Start Date"
      value={startDate}
      placeholder="Start date in Epoch"
    />
    <TextInput
      onChange={(e) => {
        setEndDate(e.target.value);
      }}
      label="End Date"
      value={endDate}
      placeholder="End Date in Epoch"
    />
    <button onClick={Data}>Submit</button>
  </div>)}
   </div>
  );
};

export default Launch;
