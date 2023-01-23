require("@nomicfoundation/hardhat-toolbox");
const account = "51b45e1e6ad3a17755910c278ca4f57c72ba31fbc754bde38cd8ac3c3f166c5d"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/ecce808847e94ac0acbf82a064057d47",
      accounts: ["51b45e1e6ad3a17755910c278ca4f57c72ba31fbc754bde38cd8ac3c3f166c5d"]
    },
    fren : {
      url : 'https://rpc-01tn.frenchain.app',
      accounts : [account],
      chainId :444,
    } ,
    kek : {
      url : 'https://testnet.kekchain.com',
      accounts : [account],
      chainId :420690,
    } 
  },

};





