let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')

const main = async () => {

    let vrfCoordinatorAddress = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
    let linkTokenAddress = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
    let keyHash = "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";
    let fee = 100000000000000;
    args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee]

    const factory = await ethers.getContractFactory("Duel_NFTs");

    const gameContract = await factory.deploy(vrfCoordinatorAddress,linkTokenAddress,keyHash,fee)
    console.log(`You have deployed an NFT contract to ${gameContract.address}`)

    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    
    // fund with LINK
    let networkId = await getNetworkIdFromName(network.name)
    const fundAmount = networkConfig[networkId]['fundAmount']
    const linkTokenContract = await ethers.getContractFactory("LinkToken")
    const linkToken = new ethers.Contract(linkTokenAddress, linkTokenContract.interface, signer)
    let fund_tx = await linkToken.transfer(gameContract.address, fundAmount)
    await fund_tx.wait(1)
    console.log("Funded with Link")
    // await new Promise(r => setTimeout(r, 5000))

    console.log("Let's create an NFT now!")
    tx = await gameContract.getCardAtUser({ gasLimit: 300000 })
    //let receipt = await tx.wait(1)
    //let tokenId = receipt.events[3].topics[2]
    //console.log(`You've made your NFT! This is number ${tokenId}`)
    console.log("Let's wait for the Chainlink VRF node to respond...")

    //txn = await gameContract.finishMint(0);
    //await txn.wait();
    //console.log("Minted NFT #1");

  
    console.log("Done deploying and minting!");

    // Get the value of the NFT's URI.
    //let returnedTokenUri = await gameContract.tokenURI(1);
    //console.log("Token URI:", returnedTokenUri);
    
    //txn = await gameContract.getCard(1);
    //await txn.wait();
    //console.log("SEE NFT #1");
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();