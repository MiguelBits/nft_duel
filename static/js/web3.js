
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
  
  balances = getBalance();
  console.log("logged in user:", user);
  console.log("balances of user:", balances);

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
}

async function getBalance(){
  const balances = await Moralis.Web3.getAllERC20();
  //document.getElementById("balance").innerHTML = balances;
  return balances
}
/*//HUGE TODO
async function addToken_Metamask(){

}

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
