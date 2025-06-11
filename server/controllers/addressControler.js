import Address from "../models/Address";


//add address : /api/address/add
export const addAddress =async(req, res)=>{
    try{
        const { address , userId}=req.body
        await Address.create({...address,userId})
        res.json({success:true, message: "address added suceesfully"})


    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});

    }
}

//get address : /api/address/get
export const getAddress = async(req, res)=>{
    try{
        const {userId}=req.body
        const address = await Address.find({userId})
         res.json({success:true, addAddress})

    }catch(error){
         console.log(error.message);
        res.json({success:false,message:error.message});

    }
}