// Customer API
// 1. Get all customers List with status ACTIVE [GET]
// 2. Delete customer. [DELETE]
// 3. Create new customer [POST]

const custModel = require('../models/custModel')

const loginUser = async function (req, res) {
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
    let token = jwt.sign({userId: user._id.toString()},"secret-key");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };

const getCust = async function(req,res){
    try{let x = await custModel.find({status:"ACTIVE"})
    if(!x) return res.status(404).send({status:true,message:"No customers"})
    res.status(200).send({status:true,data:x})
}catch(er){
    return res.status.send({status:false,message:er.message})
}
}
const delCust = async function(req,res){
    try{let input =req.query
    let x = await custModel.findOne(input)
    if(!x)  return res.status(404).send("There is no customer with this filter")
    if(x.status=="INACTIVE") return res.status(400).send({status:false,message:"Already deleted"})
    let res = await custModel.findOneAndUpdate(input,{status:"INACTIVE"})
    return res.status(200).send({status:true,data:res})
}catch(er){
    return res.status.send({status:false,message:er.message})
}

}
const newCust = async function(req,res){
    try{let input = req.body
    if(!input) return res.send({status:false,message:"Please enter data for creating new customer"})
    let res= await custModel.create(input)
    res.status(201).send({status:true,data:res})
}catch(er){
    return res.status.send({status:false,message:er.message})
}
}
module.exports.getCust=getCust
module.exports.delCust=delCust
module.exports.newCust=newCust