// SDPX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DuelToken is ERC20 {
    constructor() ERC20("DuelToken", "DDD") {
        _mint(msg.sender, 1000);
    }
    function decimals() public view virtual override returns (uint8){
        return 0;
    }
}