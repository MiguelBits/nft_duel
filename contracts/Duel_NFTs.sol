// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
// Helper we wrote to encode in Base64
import "./libraries/Base64.sol";
// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Duel_NFTs is ERC721, VRFConsumerBase{
    
    using Counters for Counters.Counter;    
    Counters.Counter private _tokenIdCounter;

    enum Heroes{Yugi,Kaiba}
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
    mapping(uint256=>Heroes) public tokenIdToHeroBooster;
    mapping(uint256 => uint256) public tokenIdToRandomNumber;
    mapping(address => uint[]) public cardsAtAddress;

    struct Card{
        string name;
        string imageURI;  
        uint stars;
        uint attack;
        uint defense;
        string typeofCard;
        string element;
        string class;
        string description;
        uint amount_available;
    }

    //create decks / boosters
    //YUGI
    Card[] yugi_deck;
    //KAIBA
    Card[] kaiba_deck;
    function create() internal{
        
        //0 push Dark Magician
        yugi_deck.push(Card("Dark Magician","https://m.media-amazon.com/images/I/51d6q9hG3PL._AC_SY1000_.jpg",7,2500,2100,"normal","dark","spellcaster","The ultimate wizard in terms of attack and defense",7));
        //1 push Dark Magician Girl
        yugi_deck.push(Card("Dark Magician Girl","https://ygoprodeck.com/pics/38033121.jpg",6,2000,1700,"effect","dark","spellcaster","Gains 300ATK for every Dark Magician on the field",9));
        //2 push Kuriboh
        yugi_deck.push(Card("Kuriboh","https://static.wikia.nocookie.net/yugioh/images/6/6d/Kuriboh-YSYR-PT-C-1E.jpg/revision/latest?cb=20150716224841&path-prefix=pt",1,300,200,"effect","dark","fiend","You can discard this card and take no Damage",10));
        //3 push Black Luster Soldier
        yugi_deck.push(Card("Black Luster Soldier","https://storage.googleapis.com/ygoprodeck.com/pics/5405694.jpg",8,3000,2500,"ritual","earth","warrior"," You can Ritual Summon this card with 'Black Luster Ritual'. ",8));
        //4 push Summoned Skull
        yugi_deck.push(Card("Summoned Skull","https://storage.googleapis.com/ygoprodeck.com/pics/70781052.jpg",6,2500,1200,"normal","dark","fiend","A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",5));
        //5 push 
        yugi_deck.push(Card("Pot of Greed","https://m.media-amazon.com/images/I/51uITWtTYFL._AC_.jpg",0,0,0,"spell","normal","","Draw 2 cards.",1));
        //6 push 
        yugi_deck.push(Card("Exodia the Forbidden One","https://storage.googleapis.com/ygoprodeck.com/pics/33396948.jpg",3,1000,1000,"effect","dark","spellcaster","If you have Right Leg of the Forbidden One, Left Leg of the Forbidden One, Right Arm of the Forbidden One and Left Arm of the Forbidden One in addition to this card in your hand, you win the Duel.",10));
        //7 push Feral Imp
        yugi_deck.push(Card("Feral Imp","https://ms.yugipedia.com//thumb/9/96/FeralImp-SS01-EN-C-1E.png/300px-FeralImp-SS01-EN-C-1E.png",4,1300,1400,"normal","dark","fiend"," A playful little fiend that lurks in the dark, waiting to attack an unwary enemy. ",10));
        //8 push Monster Reborn
        yugi_deck.push(Card("Monster Reborn","https://static.wikia.nocookie.net/yugioh/images/1/18/MonsterReborn-YGLD-PT-C-1E.jpg/revision/latest?cb=20160131001341&path-prefix=pt",0,0,0,"spell","normal",""," Target 1 monster in either GY; Special Summon it. ",10));
        //9 push Swords of Revealing Light
        yugi_deck.push(Card("Swords of Revealing Light","https://ms.yugipedia.com//thumb/1/1c/SwordsofRevealingLight-EGS1-EN-C-1E.png/300px-SwordsofRevealingLight-EGS1-EN-C-1E.png",0,0,0,"spell","normal",""," After this card's activation, it remains on the field, but you must destroy it during the End Phase of your opponent's 3rd turn. When this card is activated: If your opponent controls a face-down monster, flip all monsters they control face-up. While this card is face-up on the field, your opponent's monsters cannot declare an attack. ",5));
        //10 push Black Luster Ritual  
        yugi_deck.push(Card("Black Luster Ritual ","https://m.media-amazon.com/images/I/71bERA9ARDL._AC_SL1006_.jpg",0,0,0,"spell","ritual","","This card is used to Ritual Summon 'Black Luster Soldier'. You must also Tribute monsters from your hand or field whose total Levels equal 8 or more. ",10));

        
        kaiba_deck.push(Card("Blue-Eyes White Dragon","https://m.media-amazon.com/images/I/51W6duELHdL._AC_.jpg",8,3000,2500,"normal","light","dragon"," This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",3));
        kaiba_deck.push(Card("La Jinn the Mystical Genie of the Lamp","https://ms.yugipedia.com//9/96/LaJinntheMysticalGenieoftheLamp-SBCB-EN-C-1E.png",4,1800,1000,"normal","dark","fiend"," A genie of the lamp that is at the beck and call of its master.",5));
        kaiba_deck.push(Card("Kaiser Sea Horse","https://static.wikia.nocookie.net/yugioh/images/9/96/KaiserSeaHorse-YSKR-EN-C-1E.png/revision/latest?cb=20170830155139",4,1700,1650,"effect","light","sea serpent"," This card can be treated as 2 Tributes for the Tribute Summon of a LIGHT monster.",8));
        kaiba_deck.push(Card("Battle Ox","https://ms.yugipedia.com//thumb/c/cf/BattleOx-SS02-EN-C-1E.png/300px-BattleOx-SS02-EN-C-1E.png",8,1700,1000,"normal","earth","warrior"," A monster with tremendous power, it destroys enemies with a swing of its axe.",10));
        kaiba_deck.push(Card("Blue-Eyes Ultimate Dragon","https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1104256.jpg",12,4500,3800,"fusion","light","dragon","Blue-Eyes White Dragon + Blue-Eyes White Dragon + Blue-Eyes White Dragon",10));
        //5 push 
        kaiba_deck.push(Card("Megamorph","https://static.wikia.nocookie.net/yugioh/images/e/ee/Megamorph-SDKS-PT027.jpg/revision/latest?cb=20171229212349&path-prefix=pt",0,0,0,"spell","normal","","While your LP is lower than your opponent's, the equipped monster's ATK becomes double its original ATK. While your LP is higher, the equipped monster's ATK becomes half its original ATK.",5));
        //6 push 
        kaiba_deck.push(Card("Lord of D.","https://m.media-amazon.com/images/I/51iXHtE1VJL._AC_.jpg",4,1200,1100,"effect","dark","spellcaster","Neither player can target Dragon monsters on the field with card effects.",10));
        kaiba_deck.push(Card("Kaibaman","https://ms.yugipedia.com//c/c6/Kaibaman-LDS2-EN-C-1E.png",3,200,700,"effect","light","warrior","You can Tribute this card; Special Summon 1 Blue-Eyes White Dragon from your hand.",20));
        kaiba_deck.push(Card("Monster Reborn","https://storage.googleapis.com/ygoprodeck.com/pics/83764718.jpgt",0,0,0,"spell","normal",""," Target 1 monster in either GY; Special Summon it. ",10));
        kaiba_deck.push(Card("Ookazi","https://m.media-amazon.com/images/I/71LenUWkq7L._AC_SY550_.jpg",0,0,0,"spell","normal",""," Inflict 800 points of damage to your opponent's Life Points. ",5));
        kaiba_deck.push(Card("Polymerization","https://ms.yugipedia.com//7/71/Polymerization-FUEN-EN-SR-1E.png",0,0,0,"spell","fusion","","Fusion Summon 1 Fusion Monster from your Extra Deck, using monsters from your hand or field as Fusion Material.",4));

    }


    constructor ()  
    VRFConsumerBase(0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9,0xa36085F69e2889c224210F603D836748e7dC0088)
    ERC721("Duel Monsters","DM"){
        
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1*10**18; //chainlink gas fee of 0.1LINK

        create();

        _tokenIdCounter.increment();

        //no of cards in deployed in the blockchain
    }


    //mint token
    function openBooster_Kaiba() public{
        //kick off randomness from oracle
        bytes32 requestId = requestRandomness(keyHash, fee);
        
        requestIdToSender[requestId] = msg.sender;
        uint tokenId = _tokenIdCounter.current(); 
        requestIdToTokenId[requestId] = tokenId;
    
        cardsAtAddress[msg.sender].push(tokenId);
        tokenIdToHeroBooster[tokenId] = Heroes.Kaiba;
        emit requestedRandom(requestId, tokenId);

    }
    //mint token
    function openBooster_Yugi() public{
        //kick off randomness from oracle
        bytes32 requestId = requestRandomness(keyHash, fee);
        
        requestIdToSender[requestId] = msg.sender;
        
        uint tokenId = _tokenIdCounter.current(); 
        requestIdToTokenId[requestId] = tokenId;

        cardsAtAddress[msg.sender].push(tokenId);
        tokenIdToHeroBooster[tokenId] = Heroes.Yugi;
        emit requestedRandom(requestId, tokenId);

    }
    //function to use random Number
    function finishMint(uint i) public {
        uint tokenId = _tokenIdCounter.current();
        
        _safeMint(msg.sender, tokenId);

        tokenIdToCard[tokenId] = yugi_deck[i];

        _tokenIdCounter.increment();
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
        console.log(tokenIdToCard[_id].name);
        return tokenIdToCard[_id].name;
    }

    function getCardAtUser()public view returns(uint[] memory array){
        array = cardsAtAddress[msg.sender];
        return array;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        Card memory cardAttributes = tokenIdToCard[_tokenId];

        string memory strStars = Strings.toString(cardAttributes.stars);
        string memory strAttack = Strings.toString(cardAttributes.attack);
        string memory strDefense = Strings.toString(cardAttributes.defense);
        string memory strAmount = Strings.toString(cardAttributes.amount_available);
        string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',
            cardAttributes.name,
            ' -- NFT #: ',
            Strings.toString(_tokenId),
            '","description": "Duel Monster cards", "image": "',
            cardAttributes.imageURI,'"}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        console.log(output);
        return output;
    }
}