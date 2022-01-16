require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/B7uY-UcCo1CRXp76-Om5GY4nPS3-5msx',
      accounts: ['1f85a57b25a0fbbfb776de78c1135650f810fb9754a994214d6f77f7029e82c0'],
    },
  },
};