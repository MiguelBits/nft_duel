const tokenAddress = "0x8a57e436A724B07c9Ecc87c7F491542B02fF84e9";
document.getElementById("tokenAddress").innerHTML = tokenAddress;

// connect to Moralis server
const serverUrl = "https://gqbpmhmhaaty.usemoralis.com:2053/server";
const appId = "NdRMTKmJlhUcWjkBiSUPbQgv9h7Kl3v3GzZRwRsc";
Moralis.start({ serverUrl, appId });

// add fucntions from here down
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  
  getBalance();
  console.log("logged in user:", user);
  //console.log("balances of user:", balances);

  var x = document.getElementById("loginButton");
  x.style.display = "none";
  var y = document.getElementById("logoutButton");
  y.style.display = "block";


}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");

  var x = document.getElementById("logoutButton");
  x.style.display = "none";
  var y = document.getElementById("loginButton");
  y.style.display = "block";
  document.getElementById("balance").innerHTML = "?";
}

async function getBalance(){
  //this is how to handle promise value
  
  const balance = await Moralis.Web3.getERC20().then(value =>{
    //console.log(value["balance"]);
    document.getElementById("balance").innerHTML = value["balance"];
    //ether balance, TODO balance of DuelToken
  })

 
}
async function addToken(){
  window.alert(tokenAddress);
}

/*//HUGE TODO

async function getAllNFTS(){
  
  // get NFTs for current user on Mainnet

  const userEthNFTs = await Moralis.Web3.getNFTs();

  // get testnet NFTs for user

  const testnetNFTs = await Moralis.Web3.getNFTs({ chain: ‘ropsten’ });

  // get polygon NFTs for address

  const options = {address: Moralis.User.current()};

  const userNFTs = await Moralis.Web3.getNFTs(options);

  console.log(userEthNFTs)
}
*/
document.getElementById("loginButton").onclick = login;
document.getElementById("logoutButton").onclick = logOut;
