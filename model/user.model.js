const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    address:{type:String,required:true}
},{
    versionKey:false
});
const userModel=mongoose.model("User",userSchema);
module.exports={
    userModel
}