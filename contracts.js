const Web3 = require("web3")
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        process.env.PROVIDER_URL
    )
)
const sateNftAbi = require("./abis/sateNftAbi.json")
const contractAddr = process.env.CONTRACT_ADDR
const sateNftContract = new web3.eth.Contract(sateNftAbi, contractAddr)

module.exports = {
    web3,
    sateNftContract
}