// SDPX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DuelHelper{
    uint amount;

    function deposit() external payable{
        amount = msg.value;
    }
}