const mongoose= require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://zaidpanhalkar786:ZxpBFEFEBSz4BDef@cluster0.mijeqiy.mongodb.net/?retryWrites=true&w=majority",
         {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('connected to mongodb')
    }catch(error){ 
       console.error('error connecting to db', error)}
}

module.exports =  connectDB