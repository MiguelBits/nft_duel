let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')
const fs = require('fs')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, get, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    let linkTokenAddress
    let vrfCoordinatorAddress

    if (chainId == 31337) {
        let linkToken = await get('LinkToken')
        let VRFCoordinatorMock = await get('VRFCoordinatorMock')
        linkTokenAddress = linkToken.address
        vrfCoordinatorAddress = VRFCoordinatorMock.address
        additionalMessage = " --linkaddress " + linkTokenAddress
    } else {
        linkTokenAddress = networkConfig[chainId]['linkToken']
        vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
    }
    const keyHash = networkConfig[chainId]['keyHash']
    const fee = networkConfig[chainId]['fee']
    args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee]
    console.log("----------------------------------------------------")
    const RandomSVG = await deploy('Duel_NFTs', {
        from: deployer,
        args: args,
        log: true
    })
    console.log(`You have deployed an NFT contract to ${RandomSVG.address}`)
    const networkName = networkConfig[chainId]['name']
    console.log(`Verify with:\n npx hardhat verify --network ${networkName} ${RandomSVG.address} ${args.toString().replace(/,/g, " ")}`)
    const RandomSVGContract = await ethers.getContractFactory("Duel_NFTs")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const randomSVG = new ethers.Contract(RandomSVG.address, RandomSVGContract.interface, signer)

    // fund with LINK
    let networkId = await getNetworkIdFromName(network.name)
    const fundAmount = networkConfig[networkId]['fundAmount']
    const linkTokenContract = await ethers.getContractFactory("LinkToken")
    const linkToken = new ethers.Contract(linkTokenAddress, linkTokenContract.interface, signer)
    let fund_tx = await linkToken.transfer(RandomSVG.address, fundAmount)
    await fund_tx.wait(1)
    // await new Promise(r => setTimeout(r, 5000))
    console.log("Let's create an NFT now!")
    tx = await randomSVG.openBooster_Yugi({ gasLimit: 300000 })
    let receipt = await tx.wait(1)
    let tokenId = receipt.events[3].topics[2]
    console.log(`You've made your NFT! This is number ${tokenId}`)
    console.log("Let's wait for the Chainlink VRF node to respond...")
    
    await new Promise(r => setTimeout(r, 180000))
    
    console.log(`Now let's finish the mint... (on chain)`)
    tx = await randomSVG.finishMint(tokenId, { gasLimit: 2000000 })
    await tx.wait(1)
    console.log(`You can view the tokenURI here ${await randomSVG.tokenURI(0)}`)
    
}

module.exports.tags = ['all', 'rsvg']
