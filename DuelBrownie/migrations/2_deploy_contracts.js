const FirstContract=artifacts.require('./contracts/DuelContract.sol');
module.exports = function(deployer){
    deployer.deploy(FirstContract)
}