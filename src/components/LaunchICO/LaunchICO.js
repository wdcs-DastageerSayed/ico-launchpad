import React from 'react'
import Popup from 'reactjs-popup'
import Launch from '../Launch/Launch'
import './LaunchICO.css'
import Web3 from 'web3';
import ERC_abi from "../../metadata/ERC.json";


let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/93cb9b09ad17492ebf579b891db201c9"));

export const TextInput = ({label, placeholder}) => {
    return(
        <div className='textContainer'>
            <label>{label}</label>
            <input type="text" placeholder={placeholder} /> 
        </div>
    )
}

const mintErc = async () => {

  const erc_abi = ERC_abi;
  const contract_address = "0x70d9bfa71fCaE72Cb841824Ed86aF441E703f123";

  const Contract =  new web3.eth.Contract(
    erc_abi,
    contract_address
  )

  console.log(Contract);
  const meth = Contract.methods.createERC20(1000000,"DDDDTTTT","DT").send({from:"0xf957d27Bda653991366481Eb62CF62668610D9AA", gas:3000000}) 
  console.log(meth);
}

mintErc();

const LaunchICO = () => {

 
  return (
    <div className='modalContainer'>
      <Popup modal trigger={<button>Already have a token? </button>}><Launch /></Popup>
      <div className="line"></div>
      <TextInput name="tokenName" label="Token Name" placeholder="Token Name" />
      <TextInput name="tokenSymbol" label="Token Symbol" placeholder="Token Symbol" />
      <TextInput name="initialAmount" label="Initial Amount" placeholder="Initial Amount" />
      <button  >Mint</button>
      {/* onClick={ mintErc()} */}
    </div>
  )
}

export default LaunchICO