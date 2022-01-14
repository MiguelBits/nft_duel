// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBase.sol";

contract Duel_NFTs is ERC721, VRFConsumerBase{

    modifier isMinted(uint tokenId){
        require(_tokenCounter > tokenId, "TokenId has not been minted yet!");
        require(tokenIdToRandomNumber[tokenId] > 0, "Need to wait for the Chainlink node to respond!");    
        bytes memory card = bytes(getCard(tokenId));
        require(card.length == 0);
        _;
    }
    uint256 private _tokenCounter;

    //events that trigger randomness functions
    event requestedRandom(bytes32 indexed requestId, uint256 indexed tokenId); 
    event CreatedUnfinishedRandom(uint256 indexed tokenId, uint256 randomNumber);    
    //chainlink randomness vars
    bytes32 internal keyHash;
    uint fee;
    uint randomResult;
    mapping(bytes32 => address) public requestIdToSender;
    //Card associated with a tokenId
    mapping(uint256 => Card) public tokenIdToCard;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    mapping(uint256 => uint256) public tokenIdToRandomNumber;
    mapping(address => uint[]) public cardsAtAddress;

    enum Heroes{Yugi,Kaiba}
    mapping(Heroes => Card[]) public HeroesDeck;
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

    //create decks / boosters
    //YUGI
    Card[] yugi_deck;
    //KAIBA
    Card[] kaiba_deck;
    function create() internal{
        
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
        //5 push 
        yugi_deck.push(Card("Pot of Greed",0,0,0,"spell","normal","","Draw 2 cards.",1,5));
        //6 push 
        yugi_deck.push(Card("Exodia the Forbidden One",3,1000,1000,"effect","dark","spellcaster","If you have Right Leg of the Forbidden One, Left Leg of the Forbidden One, Right Arm of the Forbidden One and Left Arm of the Forbidden One in addition to this card in your hand, you win the Duel.",10,3));
        //7 push Feral Imp
        yugi_deck.push(Card("Feral Imp",4,1300,1400,"normal","dark","fiend"," A playful little fiend that lurks in the dark, waiting to attack an unwary enemy. ",1,10));
        //8 push Monster Reborn
        yugi_deck.push(Card("Monster Reborn",0,0,0,"spell","normal",""," Target 1 monster in either GY; Special Summon it. ",8,10));
        //9 push Swords of Revealing Light
        yugi_deck.push(Card("Swords of Revealing Light",0,0,0,"spell","normal",""," After this card's activation, it remains on the field, but you must destroy it during the End Phase of your opponent's 3rd turn. When this card is activated: If your opponent controls a face-down monster, flip all monsters they control face-up. While this card is face-up on the field, your opponent's monsters cannot declare an attack. ",10,5));
        //10 push Black Luster Ritual  
        yugi_deck.push(Card("Black Luster Ritual ",0,0,0,"spell","ritual","","This card is used to Ritual Summon 'Black Luster Soldier'. You must also Tribute monsters from your hand or field whose total Levels equal 8 or more. ",4,10));

        
        kaiba_deck.push(Card("Blue-Eyes White Dragon",8,3000,2500,"normal","light","dragon"," This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",8,3));
        kaiba_deck.push(Card("La Jinn the Mystical Genie of the Lamp",4,1800,1000,"normal","dark","fiend"," A genie of the lamp that is at the beck and call of its master.",3,5));
        kaiba_deck.push(Card("Kaiser Sea Horse",4,1700,1650,"effect","light","sea serpent"," This card can be treated as 2 Tributes for the Tribute Summon of a LIGHT monster.",8,20));
        kaiba_deck.push(Card("Battle Ox",8,1700,1000,"normal","earth","warrior"," A monster with tremendous power, it destroys enemies with a swing of its axe.",5,10));
        kaiba_deck.push(Card("Blue-Eyes Ultimate Dragon",12,4500,3800,"fusion","light","dragon","Blue-Eyes White Dragon + Blue-Eyes White Dragon + Blue-Eyes White Dragon",10,5));
        //5 push 
        kaiba_deck.push(Card("Megamorph",0,0,0,"spell","normal","","While your LP is lower than your opponent's, the equipped monster's ATK becomes double its original ATK. While your LP is higher, the equipped monster's ATK becomes half its original ATK.",1,5));
        //6 push 
        kaiba_deck.push(Card("Lord of D.",4,1200,1100,"effect","dark","spellcaster","Neither player can target Dragon monsters on the field with card effects.",3,10));
        kaiba_deck.push(Card("Kaibaman",3,200,700,"effect","light","warrior","You can Tribute this card; Special Summon 1 Blue-Eyes White Dragon from your hand.",5,20));
        kaiba_deck.push(Card("Monster Reborn",0,0,0,"spell","normal",""," Target 1 monster in either GY; Special Summon it. ",8,10));
        kaiba_deck.push(Card("Ookazi",0,0,0,"spell","normal",""," Inflict 800 points of damage to your opponent's Life Points. ",10,5));
        kaiba_deck.push(Card("Polymerization",0,0,0,"spell","fusion","","Fusion Summon 1 Fusion Monster from your Extra Deck, using monsters from your hand or field as Fusion Material.",4,10));

    }


    constructor ()  
    VRFConsumerBase(0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9,0xa36085F69e2889c224210F603D836748e7dC0088)
    ERC721("Duel Cards","DM"){
        
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1*10**18; //chainlink gas fee of 0.1LINK

        create();
        //no of cards in deployed in the blockchain
        _tokenCounter = 0;
    }


    //mint token
    function openBooster() public returns(bytes32 requestId){
        //kick off randomness from oracle
        requestId = requestRandomness(keyHash, fee);
        
        requestIdToSender[requestId] = msg.sender;
        uint256 tokenId = _tokenCounter; 
        requestIdToTokenId[requestId] = tokenId;

        _tokenCounter++;      

        cardsAtAddress[msg.sender].push(tokenId);

        emit requestedRandom(requestId, tokenId);

    }

    //function to use random Number
    function finishMint_Kaiba(uint256 tokenId) public isMinted(tokenId){
        
        uint256 randomNumber = tokenIdToRandomNumber[tokenId];
        
        Card memory randCard = kaiba_deck[randomNumber];
        tokenIdToCard[tokenId] = randCard;

    }
    function finishMint_Yugi(uint256 tokenId) public isMinted(tokenId){
       
        uint256 randomNumber = tokenIdToRandomNumber[tokenId];
        
        Card memory randCard = yugi_deck[randomNumber];
        tokenIdToCard[tokenId] = randCard;

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

    function getCard(uint _id) public view returns(string memory){
        return tokenIdToCard[_id].name;
    }
    function getCardsAtAddress(address user)public view returns(uint[] memory array){
        array = cardsAtAddress[user];
        return array;
    }
}