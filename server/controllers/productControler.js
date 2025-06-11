import { v2 as cloudinary } from "cloudinary"
import product from "../models/product"
//add product: /api/product/add
export const addProduct =async (req, res)=>{
    try{
        let productData=JSON.parse(req.body.productData)

        const image= req.files

        let imgesUrl= await Promise.all(
            ImageTrackList.map(async (item)=>{
                let result= await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )
        await product.create({...productData, image: imagesUrl})

        res.json({success: true, message:'Product Added'})

    }catch(error){
        console.log(error.message);
        res.json({ success:false, message:error.message})

    }

}

//add product: /api/product/list
export const productList=async (req, res)=>{
    try{
        const products = await product.find({})
        res.json({success:true, products})

    }catch(error){
         console.log(error.message);
        res.json({ success:false, message:error.message})

    };
    

}

//get single product: /api/product/id
export const productById=async (req, res)=>{
    try{
        const {id}=req.body
        const products = await product.findById({id})
        res.json({success:true, product})

    } catch(error){
         console.log(error.message);
        res.json({ success:false, message:error.message})

    }

}

//change product: /api/product/stock
export const changeStock=async (req, res)=>{
    try{
        const {id, inStock}=req.body
        await product.findByIdAndUpdate(id, {inStock})
        res.json({ success:true, message:"stock updated"})

    }catch(error){
        console.log(error.message);
        res.json({ success:false, message:error.message})

    }

}