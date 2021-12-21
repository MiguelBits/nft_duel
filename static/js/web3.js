async function login() {
  ethereum.request({ method: 'eth_requestAccounts' });
}