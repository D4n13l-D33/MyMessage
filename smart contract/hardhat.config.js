require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const URL = "https://eth-sepolia.g.alchemy.com/v2/dxQbx8DUIKZTbw_qS1qSvmUBKm-GnJGH";

const KEY = "b6dc4a53ae4403fae162e3ccc725d4524cdc7ece70bdc204156404672f9a68dd";
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia : {
       url: URL,
       accounts: [`0x${KEY}`],
     },
   },
};
