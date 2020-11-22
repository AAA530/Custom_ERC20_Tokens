// SPDX-License-Identifier: MIT
pragma solidity >=0.5.21 <=0.7.0;

contract KaspTokens {
    uint256 public totalSupply = 0;
    mapping(address => uint256) public balanceOf;
    string public name;
    string public symbol;
    
    constructor(uint256 _initial_supply,string memory _name,string memory _symbol) public {
        totalSupply = _initial_supply;
        balanceOf[msg.sender] = totalSupply;
        name = _name;
        symbol = _symbol;
    }
}
