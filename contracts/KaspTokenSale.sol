pragma solidity >=0.5.21 <=0.7.0;

import "./KaspTokens.sol";

contract KaspTokenSale {
    address owner;
    KaspTokens public tokenContract;
    uint256 public tokenprice;
    constructor(KaspTokens _tokenContract,uint256 _tokenprice) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
        tokenprice = _tokenprice;
    }
}