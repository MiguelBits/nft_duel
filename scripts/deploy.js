const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('Duel_NFTs');
    const gameContract = await gameContractFactory.deploy();
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
  
    
    let txn;
    txn = await gameContract.finishMint(0);
    await txn.wait();
    console.log("Minted NFT #1");
  
    txn = await gameContract.finishMint(1);
    await txn.wait();
    console.log("Minted NFT #2");
  
    txn = await gameContract.finishMint(2);
    await txn.wait();
    console.log("Minted NFT #3");
  
    txn = await gameContract.finishMint(3);
    await txn.wait();
    console.log("Minted NFT #4");
  
    console.log("Done deploying and minting!");

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
    
    txn = await gameContract.getCard(1);
    await txn.wait();
    console.log("SEE NFT #1");
  
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