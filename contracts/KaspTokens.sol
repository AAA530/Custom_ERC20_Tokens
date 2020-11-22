// SPDX-License-Identifier: MIT
pragma solidity >=0.5.21 <=0.7.0;

contract KaspTokens {
    uint256 public totalSupply = 0;
    mapping( address => uint256) public balanceOf;

    constructor(uint256 _initial_supply) public {
        totalSupply = _initial_supply;
    }
}
