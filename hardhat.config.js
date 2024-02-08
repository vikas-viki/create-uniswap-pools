require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.21",
  networks: {
    ethSepolia: {
      url: "https://sepolia.infura.io/v3/d6bedb7124704cd693692b7e7c5167c6",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: "D2CWJC32W63ZZUR2VD1C4IEAEIMUJNZ89R",
  },
};