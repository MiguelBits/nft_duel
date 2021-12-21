
let web3 = new Web3(Web3.givenProvider);

async function login() {
  //login method
  ethereum.request({ method: 'eth_requestAccounts' });
  //get user to var
  web3.eth.getAccounts().then(function(result){
    user = web3.utils.toChecksumAddress(result[0])

    //console.log(user)
    //display and fetch balance of current user
    balance(user);
  })
  
}

async function balance(user){
  let balance;
  web3.eth.getBalance(user, (error, balanceInWei) => {
    balance = web3.utils.fromWei(balanceInWei, 'ether')
    //write balance on html
    //format to 4 decimals, change 1000 and 4 for other decimals point
    document.getElementById("balance").innerHTML = (Math.round(balance * 10000) / 10000).toFixed(4);;
    });
  
}

