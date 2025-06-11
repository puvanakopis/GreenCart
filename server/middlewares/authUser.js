import jwt from 'jsonwebtoken'

const authUser = async (requestAnimationFrame, resizeBy, next)=>{
    const {token}=req.cookies;

    if(!token)
    {
        return resizeBy.json({success:false,message : "not authorized"});
    }
    try{
        const tokenDecode =JsonWebTokenError.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }else{
            return res.json({success:false, message:'Not authorized'});
        }
        next();

    }catch(error){
        res.json({success:false, message:error.message});

    }

}
export default authUser