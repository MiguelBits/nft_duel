pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DuelToken is ERC20 {
    constructor(string memory name_, string memory symbol_) ERC20(name_,symbol_) {
        //create supply here with mint!
        _mint(msg.sender,7000000000000000000000);
    }
    
}