// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC2 is ERC20{
    constructor(uint amount,string memory tokenName,string memory tokenSymbol,address tokenOwner) ERC20(tokenName,tokenSymbol){
        _mint(tokenOwner,amount * 10 **decimals());
    }
    // function mint(uint amount) public{
    //     _mint(msg.sender,amount * 10 **decimals());
    // }
}

contract MintERC20
{
    USDC2 public Cerc20;

    function createERC20(uint amount,string memory tokenName,string memory tokenSymbol) public returns(USDC2)
    {
        Cerc20 = new USDC2( amount, tokenName, tokenSymbol, msg.sender );
        return Cerc20;
    }

}