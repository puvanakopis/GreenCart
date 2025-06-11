import Order from '../models/order.js'
import product from '../models/product.js';
import stripe from 'stripe'
import User from "../models/User.js" 

//place order : /api/order/cod
export const placeOrderCOD=async (req, res)=>{
    try{
        const {userId, items, address}=req.body;
        if(!address || items.length ===0){
            return res.json({success:false, message:"Invalid data"})
        }

        //calculate amount using items
        let amount =await items.reduce(async (ActiveXObject, item)=>{
            const product= await  product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        //add taxchage 2%
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'COD'
        });
        return res.json({success:true, message:"order placed sucessfully"})


    }catch(error){
        return res.json({success:false, message:error.message});

    }
}

//place orderstripe:/api/ordeer/stripe
export const placeOrderStripe=async (req, res)=>{
    try{
        const {userId, items, address}=req.body;
        const { origin } = req.header;


        if(!address || items.length ===0){
            return res.json({success:false, message:"Invalid data"})
        }

        let productData= [];

        //calculate amount using items
        let amount =await items.reduce(async (ActiveXObject, item)=>{
            const product= await  product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            })
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        //add taxchage 2%
        amount += Math.floor(amount * 0.02);
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'online'
        });

        //stripe gateway initialize
        const stripInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items forstripe
        const line_items = productData.map(()=>{
            return  {
                price_data:{
                    currency :"usd",
                    product_data:{
                        name: item.name,
                    },
                    unit_amount : Math.floor(item.price + item.price *0.02) *100
                },
                quantity: item.quantity,
            }
        })

        //createsession
        const  session = await stripInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader ? next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata:{
                orderId: order._id.toString(),
                userId
            }
        })



        return res.json({success:true, url: session.url});


    }catch(error){
        return res.json({success:false, message:error.message});

    }
}

// stripe webhooks to verify payments action:/stripe
export const stripeWebhooks =async (request, response)=>{
    // stripe gateway initialize
    const stripInstance =new stripe(process.env.STRIPE_SECRET_KEY)

    const sig=request.headers["stri[e-signature"]
    let event;

    try{
        event = stripInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    }catch(error){
        response.status(400).send(`webhooks error: ${error.message}`)

    }

    //handle event
    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent= event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session metadata
            const session =await stripInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const { orderId, userId }= session.data[0].metadata;

            //mark payment as paid
            await Order.findByIdAndUpdate(orderId,{isPaid: true})
            //clear user data
            await  UserActivation.findByIdAndUpdate(userId,{cartItems: {}});
            break;
        }
        case "payment_intent.failed":{
            const paymentIntent= event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session metadata
            const session =await stripInstance.checkout.sessions.list({
                payment_intent:paymentIntentId,
            });

            const { orderId }= session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }

        default:
            console.error(`unhandled event type${event.type}`)
            break;
    }
    response.json({received: true})
}

//get order by user id: /api/order/user

export const getUserOrders =async (req,res)=>{
    try{
        const{ usrtId}=req.body;
        const orders= await Order.find({
            userId,
            $or: [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createAt:-1});
        res.json({success:true, orders})

    }catch(error){
        res.json({success:false, message:error.message});

    }
}
//get all orders (for seller/admin) : /api/order/seller
export const getAllOrders =async (req,res)=>{
    try{
        
        const orders= await Order.find({            $or: [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createAt:-1});
        res.json({success:true, orders});

    }catch(error){
        res.json({success:false, message:error.message});

    }
}