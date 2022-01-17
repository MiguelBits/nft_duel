const main = async () => {
    let vrfCoordinatorAddress = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
    let linkTokenAddress = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
    let keyHash = "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";
    let fee = 10000;
    args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee]

    const factory = await ethers.getContractFactory("Duel_NFTs");

    const Duel_NFTs = await factory.deploy(vrfCoordinatorAddress,linkTokenAddress,keyHash,fee)
    console.log(`You have deployed an NFT contract to ${Duel_NFTs.address}`)
  
    
    // let txn;
    //txn = await gameContract.openBooster_Yugi();
    //await txn.wait();
    //console.log("Minted NFT #1");

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