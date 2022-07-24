import Order from "../models/Order.js";

export const getOrders = async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const addNewOrder = async(req,res)=>{
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json("Sorry , Please Try again");
    }
}

export const getOrderById = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateOrder = async(req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId,
        req.body,{
            new: true,
        });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteOrder =async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.orderId);
        res.status(200).json("The Order has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getOrdersByUserId = async(req,res)=>{
    try {
        const {userId} = req.params;
        const orders = await Order.find({userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}