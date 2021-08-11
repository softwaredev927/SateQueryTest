const model = require('../model')
const {sateNftContract} = require('../contracts')

const SatePage = async (req,res) => {
    let tokenId = req.query.tokenId
    if(tokenId){
        const sate = await sateNftContract.methods.sateInfo(parseInt(tokenId)).call()
        const sateObj = {
            st_id: tokenId,
            st_launchPrice: sate.st_launchPrice,
            st_launchTime: new Date(parseInt(sate.st_launchTime) * 1000),
            st_apr: parseInt(sate.st_apr)
        }
        try {
            await model.sate.add(sateObj)
        } catch(ex) {
            console.log("already exist")
        }
        const sateRes = await model.sate.get(tokenId)
        res.render("sate", sateRes[0])
    }else{
        res.render("error")
    }
}
    
module.exports = SatePage;