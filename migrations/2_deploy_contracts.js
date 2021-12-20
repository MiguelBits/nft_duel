const ERC20Contract=artifacts.require('./contracts/DuelToken.sol');
const helper=artifacts.require('./contracts/DuelHelper.sol');

module.exports = function(deployer){
    deployer.deploy(ERC20Contract);
    deployer.deploy(helper);
}

