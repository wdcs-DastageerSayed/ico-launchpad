import React, { useState } from "react";
import Popup from "reactjs-popup";
import Launch from "../Launch/Launch";
import { ethers, Wallet } from "ethers";
import EthereumTx from "@ethereumjs/tx";
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

// const rpcURL = "http://127.0.0.1:7545";
// // const web3 = new Web3(rpcURL);
// let web3 = new Web3(
//   new Web3.providers.HttpProvider(
//     "https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9"
//   )
// );

const LaunchICO = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initalAmount, setInitalAmount] = useState("");
  const [contractAddress, setContractAddress] =useState("")

  // let provider = ethers.getDefaultProvider('kovan');
  // let privateKey =  "d1277ddf595a6b84849582d89df944f3503ad5c2c8b06ec14ca6fad5401b7317"
  // let wallet = new ethers.Wallet(privateKey, provider);

  const deploy = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let factory = new ethers.ContractFactory(ERC.abi, ERC.bytecode, signer);
    let contract = await factory.deploy(
      initalAmount.toString(),
      tokenName.toString(),
      tokenSymbol.toString()
    );  

    await contract.deployed();
    alert(contract.address);
    setContractAddress(contract.address)

  };

  // const metamask = async () => {
  //   if (window.ethereum) {
  //     if (!connected) {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setAccount(accounts[0]);
  //       setConnected(true);
  //       // console.log(account);
  //     } else {
  //     }
  //   } else {
  //     alert("Install Metamask extension!!!");
  //   }
  // };
  // metamask();

  // const deploy = async () => {
  //   console.log(account);
  //   console.log(initalAmount, tokenName, tokenSymbol);
  //   // const dep = await new web3.eth.Contract(ERC.abi)
  //     window.ethereum.request({ method: "eth_sendTransaction" })
  //     .deploy({
  //       data: ERC.bytecode,
  //       arguments: [initalAmount, tokenName, tokenSymbol],
  //     })
  //     .send({ from: account, gas: 3000000 })
  //     // onsole.log(dep);
  //   // alert(dep.address);
  // };

  return (
    <div className="modalContainer">
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
