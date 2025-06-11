

//update user cartData :/api/cart/update

import User from "../models/User"

export const updateCart = async (req, res)=>{
    try {
        const {userID, cartItems}=req.body
        await User.findByIdAndUpdate(userID,{cartItems})
        res.json({success: true, messahe:"cart updated"})

    } catch(error){
        console.log(error.message)
        res.json({success:false, message: error.message})

    }
}