// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBase.sol";

contract Duel_NFTs is ERC721URIStorage, VRFConsumerBase{

    uint256 private _tokenCounter;

    //events that trigger randomness functions
    event requestedRandom(bytes32 indexed requestId, uint256 indexed tokenId); 
    event CreatedUnfinishedRandom(uint256 indexed tokenId, uint256 randomNumber);    
    //chainlink randomness vars
    bytes32 internal keyHash;
    uint fee;
    uint randomResult;
    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => string) public requestIdToTokenURI;
    //Card associated with a tokenId
    mapping(uint256 => Card) public tokenIdToCard;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    mapping(uint256 => uint256) public tokenIdToRandomNumber;
    

    struct Card{
        string name;
        uint stars;
        uint attack;
        uint defense;
        string typeofCard;
        string element;
        string class;
        string description;
        uint rarity;
        uint amount_available;
    }
    //YUGI
    Card[] yugi_deck;
    function create_Yugi_Deck() internal{
        //0 push Dark Magician
        yugi_deck.push(Card("Dark Magician",7,2500,2100,"normal","dark","spellcaster","The ultimate wizard in terms of attack and defense",7,3));
        //1 push Dark Magician Girl
        yugi_deck.push(Card("Dark Magician Girl",6,2000,1700,"effect","dark","spellcaster","Gains 300ATK for every Dark Magician on the field",9,3));
        //2 push Kuriboh
        yugi_deck.push(Card("Kuriboh",1,300,200,"effect","dark","fiend","You can discard this card and take no Damage",4,10));
        //3 push Black Luster Soldier
        yugi_deck.push(Card("Black Luster Soldier",8,3000,2500,"ritual","earth","warrior"," You can Ritual Summon this card with 'Black Luster Ritual'. ",8,5));
        //4 push Summoned Skull
        yugi_deck.push(Card("Summoned Skull",6,2500,1200,"normal","dark","fiend","A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",5,5));
        //5 push Celtic Guardian
        yugi_deck.push(Card("Celtic Guardian",4,1400,1200,"normal","earth","warrior","An elf who learned to wield a sword, he baffles enemies with lightning-swift attacks. ",2,10));
        //6 push Winged Dragon, Guardian of the Fortress #1 
        yugi_deck.push(Card("Winged Dragon, Guardian of the Fortress #1 ",4,1400,1200,"normal","wind","dragon"," A dragon commonly found guarding mountain fortresses. Its signature attack is a sweeping dive from out of the blue. ",3,10));
        //7 push Feral Imp
        yugi_deck.push(Card("Feral Imp",4,1300,1400,"normal","dark","fiend"," A playful little fiend that lurks in the dark, waiting to attack an unwary enemy. ",1,10));
        //8 push Monster Reborn
        yugi_deck.push(Card("Monster Reborn",0,0,0,"spell","normal",""," Target 1 monster in either GY; Special Summon it. ",8,10));
        //9 push Swords of Revealing Light
        yugi_deck.push(Card("Swords of Revealing Light",0,0,0,"spell","normal",""," After this card's activation, it remains on the field, but you must destroy it during the End Phase of your opponent's 3rd turn. When this card is activated: If your opponent controls a face-down monster, flip all monsters they control face-up. While this card is face-up on the field, your opponent's monsters cannot declare an attack. ",10,5));
        //10 push Black Luster Ritual  
        yugi_deck.push(Card("Black Luster Ritual ",0,0,0,"spell","ritual","","This card is used to Ritual Summon 'Black Luster Soldier'. You must also Tribute monsters from your hand or field whose total Levels equal 8 or more. ",4,10));



    }
        //select a card from deck
    function getCard_From_Yugi(uint _id) internal view returns(Card memory){
        return yugi_deck[_id];
    }
    //KAIBA\\
    Card[] kaiba_deck;
    function getCard_From_Kaiba(uint _id) internal view returns(Card memory){
        return kaiba_deck[_id];
    }


    constructor (address _VRFCoordinator, address _LinkToken, bytes32 _keyHash)  
    VRFConsumerBase(_VRFCoordinator,_LinkToken)
    ERC721("Duel Cards","DM"){
        
        keyHash = _keyHash;
        fee = 0.1*10**18; //chainlink gas fee of 0.1LINK

        create_Yugi_Deck();
        //no of cards in deployed in the blockchain
        _tokenCounter = 0;
    }

    //mint token
    function create() public returns(bytes32 requestId){
        //kick off randomness from oracle
        requestId = requestRandomness(keyHash, fee);
        
        requestIdToSender[requestId] = msg.sender;
        uint256 tokenId = _tokenCounter; 
        requestIdToTokenId[requestId] = tokenId;

        _tokenCounter++;      

        emit requestedRandom(requestId, tokenId);

    }
    function finishMint(uint256 tokenId) public {
        require(bytes(tokenURI(tokenId)).length <= 0, "tokenURI is already set!"); 
        require(_tokenCounter > tokenId, "TokenId has not been minted yet!");
        require(tokenIdToRandomNumber[tokenId] > 0, "Need to wait for the Chainlink node to respond!");

        uint256 randomNumber = tokenIdToRandomNumber[tokenId];
        Card memory randCard = getCard_From_Yugi(randomNumber);
        tokenIdToCard[tokenId] = randCard;
        
        //function to use random Number

        //_setTokenURI(tokenId, tokenURI);

    }
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address cardOwner = requestIdToSender[requestId];
        randomNumber = randomNumber % 10;
        //deploy/mint
        uint256 tokenId = requestIdToTokenId[requestId];
        _safeMint(cardOwner, tokenId);
        tokenIdToRandomNumber[tokenId] = randomNumber;

        emit CreatedUnfinishedRandom(tokenId, randomNumber);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }


    //returns random number 0-10
    function random() internal view returns (uint) {
        uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10;
        
        return randomnumber;
    }
    function getCard(uint _id) public view returns(string memory){
        return tokenIdToCard[_id].name;
    }
}