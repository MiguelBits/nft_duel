const FirstContract=artifacts.require('./contracts/DuelCoin.sol');
module.exports = function(deployer){
    deployer.deploy(FirstContract)
}