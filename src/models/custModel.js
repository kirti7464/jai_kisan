const mongoose = require('mongoose')

const custSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    mobileNumber:{
        type:String,
        maxlength:10
    },
    DOB:date,
    emailID:{
        type:String,
        match:/^([...(a-z)])+@([/a-z/]+\.(com|in|org)$)/gi
    },
    address:String,
    customerID:{
        type:String,
        uppercase:true
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"]
    }

})

module.exports = mongoose.model('cust',custSchema)

