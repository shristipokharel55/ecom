import productServices from "../services/productServices.js";


const createProduct = async(req, res)=>{
    try{
        const product = req.body
    if(!product){
        // return new Error('')
        return res.status(400).send("Product required");
    }

    if(!product.price){
        return res.status(400).send("price is required")
    }

    const data = await productServices.createProduct(product);

    res.status(200).json({
        message: "product created successful",
        data
    })
    } catch(error){
        console.log(error.message)
        res.status(501).send("error occured to create the product")
    }
}

export {createProduct}