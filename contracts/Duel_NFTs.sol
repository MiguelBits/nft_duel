pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Duel_NFTs is ERC721{
    uint256 tokenCounter;
    constructor () public ERC721("Dark Magician","DM"){
        tokenCounter = 0;
    }
    function createCollectible() public returns(uint256){
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        tokenCounter++;
        return newItemId;
    }
}