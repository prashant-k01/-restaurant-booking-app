const mongoose=require('mongoose')

const connectDB= async () => {
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MOngoDB connected");
    }catch(err){
        console.error(err.message);
        
    }
}
module.exports=connectDB