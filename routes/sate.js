const { createClient } = require('urql')
const APIURL = "https://gateway.thegraph.com/api/dcdad49933b01cb3b64b3b366cbf6865/subgraphs/id/0x7034196e9d67ac9fa4a736da1be9e99127a1124b-0"
const sateQuery = `
  query($tokenId:String) {
    sate(id:$tokenId) {
        id
        launchTime
        launchPrice
        apr
    }
  }
`
const client = createClient({
    url: APIURL
})
global.fetch = require("node-fetch")
const model = require('../model')

const SatePage = async (req,res) => {
    let tokenId = req.query.tokenId
    if(tokenId){
        const queryRes = await client.query(sateQuery, {tokenId: tokenId}).toPromise()
        if (queryRes && queryRes.data && queryRes.data.sate) {                
            const sate = queryRes.data.sate
            const sateObj = {
                st_id: tokenId,
                st_launchPrice: sate.launchPrice,
                st_launchTime: new Date(parseInt(sate.launchTime) * 1000),
                st_apr: parseInt(sate.apr)
            }
            try {
                await model.sate.add(sateObj)
                const sateRes = await model.sate.get(tokenId)
                res.render("sate", sateRes.length > 0 ? sateRes[0] : {})
            } catch(ex) {
                const sateRes = await model.sate.get(tokenId)
                if (sateRes.length > 0) {
                    res.render("sate", sateRes[0])
                } else {
                    res.render("error", {error_message: "A sate with the same launchTime or id is already exist."})
                }
            }
        } else {
            res.render("error", {error_message: "Sate with this tokenId isn't exist."})
        }
    }else{
        res.render("error")
    }
}
    
module.exports = SatePage;