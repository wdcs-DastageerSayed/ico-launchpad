import React, { useState } from "react";
import Popup from "reactjs-popup";
import Launch from "../Launch/Launch";
import Web3 from "web3";
import ERC from "../../metadata/ERC.json";
import "./LaunchICO.css";

export const TextInput = ({ label, placeholder, onChange }) => {
  return (
    <div className="textContainer">
      <label>{label}</label>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9"
  )
);


const LaunchICO = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initalAmount, setInitalAmount] = useState(0);

  const metamask = async () => {
    if (window.ethereum) {
      if (!connected) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setConnected(true);
        // console.log(account);
      } else {
      }
    } else {
      alert("Install Metamask extension!!!");
    }
  };
  metamask();

  const deploy = async () => {
    console.log(account);
    console.log(initalAmount, tokenName, tokenSymbol);
    const dep = await new web3.eth.Contract(ERC.abi)
      .deploy({
        data: ERC.bytecode,
        arguments: [initalAmount, tokenName, tokenSymbol],
      })
      .send({ from:account, gas: 3000000 });
    console.log(dep);
    alert(dep.address);
  };

  return (
    <div className="modalContainer">
      <Popup modal trigger={<button>Already have a token? </button>}>
        <Launch />
      </Popup>
      <div className="line"></div>
      <TextInput
        value={tokenName}
        onChange={(e) => {
          setTokenName(e.target.value);
        }}
        name="tokenName"
        label="Token Name"
        placeholder="Token Name"
      />
      <TextInput
        value={tokenSymbol}
        onChange={(e) => {
          setTokenSymbol(e.target.value);
        }}
        name="tokenSymbol"
        label="Token Symbol"
        placeholder="Token Symbol"
      />
      <TextInput
        value={initalAmount}
        onChange={(e) => {
          setInitalAmount(e.target.value);
        }}
        name="initialAmount"
        label="Initial Amount"
        placeholder="Initial Amount"
      />
      <button onClick={deploy}>Mint</button>
    </div>
  );
};

export default LaunchICO;
