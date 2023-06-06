// Customer API
// 1. Get all customers List with status ACTIVE [GET]
// 2. Delete customer. [DELETE]
// 3. Create new customer [POST]

const custModel = require('../models/custModel')
const uuid =require("uuid")

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
    // console.log(x)
    if(!x) return res.status(404).send({status:true,message:"No customers"})
    res.status(200).send({status:true,data:x})
}catch(er){
    return res.status.send({status:false,message:er.message})
}
}


const delCust = async function(req,res){
    try {
      let input = req.params.id;
    //   console.log(input);

      let x = await custModel.findOne({ _id: input });
    //   console.log(x);
      if (!x)
        return res.status(404).send("There is no customer with this filter");
      if (x.status == "INACTIVE")
        return res
          .status(400)
          .send({ status: false, message: "Already deleted" });
      let result = await custModel.findOneAndUpdate(
        { _id: input },
        { status: "INACTIVE" }
      );
      return res.status(200).send({ status: true, data: result });
    } catch (er) {
      return res.status(500).send({ status: false, message: er.message });
    }

}


const newCust = async function(req,res){
    try {
      let input = req.body;
      if (!Object.keys(input).length>0)
        return res.send({
          status: false,
          message: "Please enter data for creating new customer",
        });
        if (!input.firstName)
        return res.send({
          status: false,
          message: "Please enter first name for creating new customer",
        });
        if (!input.lastName)
        return res.send({
          status: false,
          message: "Please enter last name for creating new customer",
        });
        if (!input.mobileNumber)
        return res.send({
          status: false,
          message: "Please enter mobile Number for creating new customer",
        });
        if (input.mobileNumber<10 || input.mobileNumber>10)
        return res.send({
          status: false,
          message: "Please enter mobile Number greater than 10 digits  for creating new customer",
        });
      let generateID = uuid.v4();
      input.customerID = generateID;
    //   console.log(input);
      let result = await custModel.create(input);
      res.send({ status: true, data: result });

    } catch (er) {
      return res.status(500).send({ status: false, message: er.message });
    }
}
module.exports.getCust=getCust
module.exports.delCust=delCust
module.exports.newCust=newCust