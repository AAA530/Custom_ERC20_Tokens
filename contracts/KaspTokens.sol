// SPDX-License-Identifier: MIT
pragma solidity >=0.5.21 <=0.7.0;

contract KaspTokens {
    uint256 public totalSupply = 0;
    mapping(address => uint256) public balanceOf;
    string public name;
    string public symbol;
    mapping(address => mapping(address=>uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(
        uint256 _initial_supply,
        string memory _name,
        string memory _symbol
    ) public {
        totalSupply = _initial_supply;
        balanceOf[msg.sender] = totalSupply;
        name = _name;
        symbol = _symbol;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(_value < balanceOf[msg.sender], "Not enough balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    function approve(address _spender, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] > _value,"Not enough balance to spend");

        allowance[_spender][msg.sender] = _value;

        emit Approval(msg.sender,_spender,_value);
        return true;
    }
}
