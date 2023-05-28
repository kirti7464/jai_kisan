const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber:String,//auro increment C001
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"]
    },
    customerName:String,
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    vision:String,
    customerID:{
        type:String,
        ref:"cust"
    }

})

module.exports = mongoose.model('card',cardSchema)

// Field Type Description
// cardNumber string Auto_increment e.g: C001
// cardType String [REGULAR/SPECIAL]
// customerName string
// status string [ACTIVE/INACTIVE] Default: ACTIVE
// vision string
// customerID string Reference from customer

// table