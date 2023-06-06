const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
    lastName: {
        type: String,
        required: true
      },
    mobileNumber: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 10
      },
    DOB: {
        type: Date
      },
    emailID : {
        type : String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
              // Regular expression to validate email format
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format'
          }
    },
    address : String,
    customerID : {
        type : String,
        unique : true
    },
    status : {
        type : String,
        enum : ["ACTIVE", "INACTIVE"],
        default: 'ACTIVE'
    }


},{timestamps : true})

module.exports = mongoose.model("cust",customerSchema);
