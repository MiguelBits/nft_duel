let web3 = new Web3(Web3.givenProvider);
//CTRL + SHIFT + [ to hide variable
var duel_nfts_abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "randomNumber",
                "type": "uint256"
            }
        ],
        "name": "CreatedUnfinishedRandom",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "requestedRandom",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "cardsAtAddress",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "i",
                "type": "uint256"
            }
        ],
        "name": "finishMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getCard",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCardAtUser",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "array",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "openBooster_Kaiba",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "openBooster_Yugi",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "randomness",
                "type": "uint256"
            }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "requestIdToSender",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "requestIdToTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tokenIdToCard",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "stars",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "attack",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "defense",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "typeofCard",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "element",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "class",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount_available",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tokenIdToHeroBooster",
        "outputs": [
            {
                "internalType": "enum Duel_NFTs.Heroes",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tokenIdToRandomNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const duel_nfts_Address = "0x9E176921b23de6829Be974aCE4d9Ab829353f085"
let nftContract = new web3.eth.Contract(duel_nfts_abi, duel_nfts_Address)
var user;

async function refresh(){
    document.getElementById("refresh-button").style.display = "none"
    display_mint_packages();
}

async function balance(){
    let balance;
    web3.eth.getBalance(user, (error, balanceInWei) => {
      balance = web3.utils.fromWei(balanceInWei, 'ether')
      //write balance on html
      //format to 4 decimals, change 1000 and 4 for other decimals point
      document.getElementById("balance").innerHTML = (Math.round(balance * 10000) / 10000).toFixed(4);;
      });
    
  }
  

//create mint button in collections\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function finishMint(i){

    const nonce = await web3.eth.getTransactionCount(user, 'latest'); //get latest nonce

    //the transaction
    const tx = {
      'from': user,
      'to': duel_nfts_Address,
      'nonce': nonce,
      'gas': 5000000,
      'maxPriorityFeePerGas': 1999999987,
      'data': nftContract.methods.finishMint(i).encodeABI()
    };
    const transactionReceipt = await web3.eth.sendTransaction(tx)
    //printCard(tokenId);
}
async function display_mint_packages(){
    let i = 0;
    await nftContract.methods.balanceOf(user).call().then(function(lengthOfCollection){
        for(i;i<lengthOfCollection-1;i++){
            duplicate(i)
        }
        
    });
    
}
//duplicate button
async function duplicate(i) {

    let original;
    if(i==0){
        original = document.getElementById('mint_package');
        document.getElementById('collection-section').style.display = "block";
        nftContract.methods.getCardsAtUser().call().then(async function(cardArray){
            //    console.log(cardArray);
                nftContract.methods.getCard(cardArray[0]).call().then(async function(cardName){
                    //unminted
                    if(cardName == ""){
                        let imgSrc = "https://raw.githubusercontent.com/mcruzvas/nft_duel/main/static/images/product/cardback.jpg"
                        original.innerHTML += '<img class="boosters" src="'+imgSrc+'" onclick="finishMint('+i+')" alt="" style="max-width: 73%; margin: auto; margin-bottom: -25%; margin-top: 12%;" />'

                    }
                    //minted
                    else{
                        let imgSrc = "https://raw.githubusercontent.com/mcruzvas/nft_duel/main/static/images/product/cards/"+cardName+".jpg"

                        original.innerHTML += '<img class="boosters" src="'+imgSrc+'"  onclick="finishMint('+i+')" alt="" style="max-width: 73%; margin: auto; margin-bottom: -25%; margin-top: 5%;" />'

                    }
                })
            });
    }
    else{
        original = document.getElementById('mint_package'+i);
    }  

    let clone = original.cloneNode(true); // "deep" clone
    nftContract.methods.getCardsAtUser().call().then(async function(cardArray){
    //    console.log(cardArray);
        nftContract.methods.getCard(cardArray[i]).call().then(async function(cardName){
            //unminted
            if(cardName == ""){
                let imgSrc = "https://raw.githubusercontent.com/mcruzvas/nft_duel/main/static/images/product/cardback.jpg"
                clone.innerHTML += '<img class="boosters" src="'+imgSrc+'" onclick="finishMint('+i+')" alt="" style="max-width: 73%; margin: auto; margin-bottom: -25%; margin-top: 12%;" />'

            }
            //minted
            else{
                clone.innerHTML += cardName
                let imgSrc = "https://raw.githubusercontent.com/mcruzvas/nft_duel/main/static/images/product/cards/"+cardName+".jpg"

                clone.innerHTML += '<img class="boosters" src="'+imgSrc+'" onclick="finishMint('+i+')" alt="" style="max-width: 73%; margin: auto; margin-bottom: -25%; margin-top: 5%;" />'

            }
            
        })
    });
    clone.id = "mint_package" + ++i;
    original.parentNode.appendChild(clone);
    
}
//show cards next to balance
async function duel_nfts_amount(){
    nftContract.methods.balanceOf(user).call().then(function(result){
      document.getElementById("cards").innerHTML = result;
    });
  }

async function printCard(tokenId){
    nftContract.methods.getCard(tokenId).call().then(function(result){
        window.alert("You obtained a new card : "+result+" !")
      });
}


document.getElementById("refresh-button").addEventListener("click", refresh);

var mycollectionScroll = document.getElementById("wrapper")
if(mycollectionScroll){
    mycollectionScroll.onscroll = function() {
        wrapper1.scrollLeft = wrapper2.scrollLeft;
      };
}

