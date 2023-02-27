const express=require("express")
const {connection}=require("./config/db")
const {authenticate}=require("./middlewares/authenticator")
const {men_jacketsRouter}=require("./routes/men_jackets.routes")
const {men_shooseRouter}=require("./routes/men.shoose.routes")
const {womenTshirtRouter}=require("./routes/women_tshirt.routes")
const {kidsJacketsRouter}=require("./routes/kids.routes")
const {cart_dataRouter}=require("./routes/cart.routes")
const {userRouter}=require("./routes/userRoutes")
const cors=require("cors")
const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/user",userRouter)

app.use("/menjackets",men_jacketsRouter)
app.use("/menshoose",men_shooseRouter)
app.use("/womentshirt",womenTshirtRouter)
app.use("/kidsjackets",kidsJacketsRouter)
app.use(authenticate);
app.use("/cart",cart_dataRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at http://localhost:4500/")
})