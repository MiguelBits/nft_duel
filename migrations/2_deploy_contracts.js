const ERC20Contract=artifacts.require('./contracts/DuelToken.sol');


module.exports = function(deployer){
    deployer.deploy(ERC20Contract);
}

