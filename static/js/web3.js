let web3 = new Web3(Web3.givenProvider);
//CTRL + SHIFT + [ to hide variable
var duel_nfts_abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_VRFCoordinator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_LinkToken",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "_keyHash",
                "type": "bytes32"
            }
        ],
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
                "internalType": "uint256",
                "name": "tokenId",
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
        "name": "openBooster",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            }
        ],
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
                "name": "rarity",
                "type": "uint256"
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
const duel_nfts_Address = "0xCa76eD3d5bf9A383F1bBa8000EBAC2D72c0112E0"
let nftContract = new web3.eth.Contract(duel_nfts_abi, duel_nfts_Address)
var user;


                            // Functions below \\
sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function login() {
  //login method
  ethereum.request({ method: 'eth_requestAccounts' });
  //get user to var
  web3.eth.getAccounts().then(function(result){
    user = web3.utils.toChecksumAddress(result[0])

    //console.log(user)
    //display and fetch balance of current user
    balance();
    duel_nfts_amount();
    //console.log(user)
  })
  
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

//create/mint nft
function open_booster_pack_Yugi(){open_booster_pack("Yugi")}
async function open_booster_pack(_hero){
  const nonce = await web3.eth.getTransactionCount(user, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': user,
    'to': duel_nfts_Address,
    'nonce': nonce,
    'gas': 5000000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.openBooster().encodeABI()
  };
  const transactionReceipt = await web3.eth.sendTransaction(tx);
  
  //this is bugged because I need to wait chainlink response???
  await sleep(60000); // Sleep 1000 milliseconds (1 second)
  //nftContract.getPastEvents('requestedRandom',{}).then(result => finish_mint_card(Number(result[0].returnValues.tokenId)));
  let tokenId = Number(document.getElementById("cards").innerHTML);
  
  finish_mint_card(tokenId)
  
}

async function finish_mint_card(tokenId){

    console.log(tokenId)

    const nonce = await web3.eth.getTransactionCount(user, 'latest'); //get latest nonce

    //the transaction
    const tx = {
      'from': user,
      'to': duel_nfts_Address,
      'nonce': nonce,
      'gas': 5000000,
      'maxPriorityFeePerGas': 1999999987,
      'data': nftContract.methods.finishMint(tokenId).encodeABI()
    };
    const transactionReceipt = await web3.eth.sendTransaction(tx)
    printCard(tokenId);
}
async function printCard(tokenId){
    nftContract.methods.getCard(tokenId).call().then(function(result){
        window.alert("You obtained a new card : "+result+" !")
      });
}
//show cards next to balance
async function duel_nfts_amount(){
  nftContract.methods.balanceOf(user).call().then(function(result){
    document.getElementById("cards").innerHTML = result;
  });
}

document.getElementById("yugi").addEventListener("click", open_booster_pack_Yugi);
document.getElementById("login-button").addEventListener("click", login);