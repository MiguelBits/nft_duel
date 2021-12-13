const FirstContract=artifacts.require('./contracts/DuelContract.sol');

const ERC20Contract=artifacts.require('./contracts/DuelToken.sol');
const _name = "MyDuelToken";
const _symbol = "MDT";

module.exports = function(deployer){
    deployer.deploy(FirstContract);
    deployer.deploy(ERC20Contract, _name, _symbol);
}

