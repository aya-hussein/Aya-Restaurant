import Product from "../models/Product.js";

export const getProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const addNewProduct = async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getProductById = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId,
        req.body,{
            new: true,
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteProduct =async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json("The product has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
}