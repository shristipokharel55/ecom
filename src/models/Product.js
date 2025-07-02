import mongoose from 'mongoose';

const productSchma = new mongoose.Schema({
    productName:{
        type: String,
        required : true
    },
    description: {
        type: String
    },
    price: {
        type : Number,
        required : true
    },
    stock : {
        type: Number,
        default: 0
    },
    imageUrl:{
        type : String
    },
    featured:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default : true
    },
    rating:{
        type: Number,
        default: 0
    },

},
{
    timestamps:true
})




const product = mongoose.model("Product", productSchema)({

})

export default Product;