pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./DuelDecks.sol";

contract Duel_NFTs is ERC721{
    uint256 private _tokenCounter;

    DuelDecks DD;

    mapping(uint => DuelDecks.Card) private cards_everywhere;

    constructor () ERC721("Duel Cards","DM"){
        //cards in deployed in the blockchain
        _tokenCounter = 0;
    }
    function createCollectible(string memory _hero) public returns(uint256){
        uint256 newItemId = _tokenCounter;
        //map card to and id on chain
        cards_everywhere[newItemId] = getRandomCard(_hero);
        //deploy/mint
        _safeMint(msg.sender, newItemId);
        
        _tokenCounter++;

        return newItemId;
    }

    //get random card from booster deck
    function getRandomCard(string memory _hero) private view returns(DuelDecks.Card memory obtained_card){
        if(keccak256(bytes(_hero)) == keccak256(bytes("Yugi"))){
            return DD.getCardFrom_Yugi(1);
        }
    }
}
