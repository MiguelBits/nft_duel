// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract DuelCoin {
    uint value;
    address sender; 
    
    function getValue() external view returns(uint) { 
        return value;
    }
    
    function setValue(uint _value) external {
        sender = msg.sender;
        value = _value;
    }
    
    function getMsgSender() external view returns(address) { 
        return sender;
    }
    
    
}