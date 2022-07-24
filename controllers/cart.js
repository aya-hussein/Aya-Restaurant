import Cart from "../models/Cart.js";

export const getCarts = async(req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const addNewCart = async(req,res)=>{
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getCartById = async(req,res)=>{
    try {
        const cart = await Cart.findById(req.params.cartId);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getCartByUserId = async(req,res)=>{
    try {
        const {userId} = req.params;
        const cart = await Cart.findOne({userId});
        if(cart===null){
            res.status(200).json({cart,availCart:false});
        }else{
            const {userId,...others} = cart._doc;
            res.status(200).json({userId,...others,availCart:true});
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateCart = async(req,res)=>{
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cartId,
        req.body,{
            new: true,
        });
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json("error");
    }
}

export const deleteCart =async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.cartId);
        res.status(200).json("The Cart has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
}