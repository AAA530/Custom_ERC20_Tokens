pragma solidity >=0.5.21 <=0.7.0;

import "./KaspTokens.sol";

contract KaspTokenSale {
    address payable owner;
    KaspTokens public tokenContract;
    uint256 public tokenprice;
    uint256 tokenSold;

    event Sell(address _buyer, uint256 _numberOfTokens);

    constructor(KaspTokens _tokenContract, uint256 _tokenprice) public {
        owner = msg.sender;
        tokenContract = _tokenContract;
        tokenprice = _tokenprice;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == _numberOfTokens * tokenprice,
            "Send money accordingly to purchase"
        );
        require(
            tokenContract.balanceOf(address(this)) >= _numberOfTokens,
            "Not enough Tokens to Sell"
        );
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == owner, "Only Owner can excute this function");
        require(
            tokenContract.transfer(
                owner,
                tokenContract.balanceOf(address(this))
            )
        );

        selfdestruct(owner);

    }
}
