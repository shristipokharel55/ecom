import Product from "../models/Product.js";


const createProduct = async(data)=>{
    return await Product.create(data);
}

export default {createProduct}