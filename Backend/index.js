const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const customerRouter = require("./routes/customer.route");
const auth = require("./middlewares/auth.middleware");
const authorize = require("./middlewares/authorization.middleware");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT ;

app.use(express.json());
app.use("/user",userRouter)
app.use("/customer",auth,authorize(["user","admin"]),customerRouter)
app.get("/",(req,res)=>{
    res.send("heyyyyyy ")
})

app.listen(PORT,async()=>{
try {
    await connection;
    console.log("Server is running")
} catch (error) {
    console.log(error)
}
})