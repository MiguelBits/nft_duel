// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract DuelDecks{
    
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

    Card[] yugi_deck;

    constructor(){
        create_Yugi_Deck();
    }

    function create_Yugi_Deck() internal{
        //push Dark Magician
        yugi_deck.push(Card("Dark Magician",7,2500,2100,"normal","dark","spellcaster","The ultimate wizard in terms of attack and defense",7,3));
        //push Dark Magician Girl
        yugi_deck.push(Card("Dark Magician Girl",6,2000,1700,"effect","dark","spellcaster","Gains 300ATK for every Dark Magician on the field",9,3));
        //push Kuriboh
        yugi_deck.push(Card("Kuriboh",1,300,200,"effect","dark","fiend","You can discard this card and take no Damage",3,10));

    }
    //select a card from deck
    function getCardFrom_Yugi(uint id) external view returns(Card memory obtained_card){
        return yugi_deck[id];
    }
}