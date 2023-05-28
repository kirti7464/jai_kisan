// Card API
// 1. Get all Card List[GET]
// 2. Create new card [POST]
const cardModel = require('../models/cardModel')

const getCards = async function(req,res){
    try{let x= await cardModel.find()
    if(!x) return res.status(404).send({status:true,messgae:"There is no card"})
    return res.status(200).send({status:true,data:x})
}catch(er){
    return res.status.send({status:false,message:er.message})
}

}
const createCard = async function(req,res){
    try{
        let input = req.body
    if(!input) return res.send({status:false,message:"Please enter data for creating new card"})
    let res= await cardModel.create(input)
    return res.status(201).send({status:true,data:res})
}catch(er){
    return res.status.send({status:false,message:er.message})
}

    
}
module.exports.createCard=createCard
module.exports.getCards=getCards