const express = require("express");
const CustomerModel = require("../models/customer.model");
const customerRouter = express.Router();

customerRouter.post("/add",async(req,res)=>{
    const {name,email,phone,company} = req.body;
    const userId = req.user._id;

    try {
        const customer = new CustomerModel({
            name,
            email,
            phone,
            company,
            userId
        })
        await customer.save();
        console.log(customer)
        res.status(201).json({
            message:"customer added successfully",
            customer
        }
        )
    } catch (error) {
        res.status(501).json({
            message:`error in contact adding ${error}`
        })
    }
})

//update
customerRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const customerId = req.params.id;
    const userId = req.user._id;

    try {
        const customer = await CustomerModel.findOne({_id:customerId});
        if(customer.userId.toString() == userId.toString()){
            
            await CustomerModel.findByIdAndUpdate({_id:customerId},payload);
            return res.status(201).json({
                message:"customer updated successfully"
            })
        }else{
            res.status(500).json({message:"customer not found"})
        }
    } catch (error) {
        res.status(501).json({
            message : `error in updation ${error}`
        })
    }
})

//delete
customerRouter.delete("/delete/:id",async(req,res)=>{
    const customerId = req.params.id;
    const userId = req.user._id;

    try {
        const customer = await CustomerModel.findOne({_id:customerId});
        if(customer.userId.toString() == userId.toString()){
            await CustomerModel.findByIdAndDelete({_id:customerId});
            return res.status(201).json({
                message:"customer Deleted successfully"
            })
        }else{
            res.status(500).json({message:"customer not exist"})
        }
    } catch (error) {
        res.status(501).json({
            message : `error in Deletion ${error}`
        })
    }
})

// //customer search and filter
customerRouter.get('/fetch', async (req, res) => {
    try {
      const { name, email, phone, company } = req.query;
        const query = {};
  
      if (name) {
        query.name = { $regex: name, $options: 'i' }; 
      }
        if (email) {
        query.email = { $regex: email, $options: 'i' }; 
      }
        if (phone) {
        query.phone = { $regex: phone, $options: 'i' }; 
      }
        if (company) {
        query.company = { $regex: company, $options: 'i' }; 
      }
  
      const customers = await CustomerModel.find(query);
      res.status(200).json(customers);
    } catch (error) {
      console.log('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  customerRouter.get("/",async(req,res)=>{
    try {
        const customers= await CustomerModel.find();
        res.status(200).json({customers})
    } catch (error) {
        res.status(501).json({
            message:`error in customer ${error}`
        })
    }
   
})
  
module.exports = customerRouter;