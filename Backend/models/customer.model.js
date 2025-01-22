const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone:{type:String, required: true}, 
    company: {type: String ,}
},{
    versionKey:false,
    timestamps:true
})

const CustomerModel = mongoose.model("Cutomers", customerSchema);

module.exports = CustomerModel

// id (unique identifier)
// name (string, required)
// email (string, required, unique)
// phone (string, required)
// company (string, optional)
// created_at (timestamp, auto-generated)
// updated_at (timestamp, auto-updated)