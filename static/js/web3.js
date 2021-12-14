
// connect to Moralis server
const serverUrl = "https://gqbpmhmhaaty.usemoralis.com:2053/server";
const appId = "NdRMTKmJlhUcWjkBiSUPbQgv9h7Kl3v3GzZRwRsc";
Moralis.start({ serverUrl, appId });

// add from here down
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  const balances = await Moralis.Web3.getAllERC20();
  //document.getElementById("balance").innerHTML = balances;

  console.log("logged in user:", user);
  console.log("balances of user:", balances);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("loginButton").onclick = login;
document.getElementById("logoutButton").onclick = logOut;
