 import { 
    getProducts ,
    addNewProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../middlewares/jwt.js';

const productRoutes = (app)=>{
    app.route('/products')
    .get(getProducts)
    .post(verifyTokenAndAdmin,addNewProduct);

    app.route('/products/:productId')
    .get(getProductById)
    .put(verifyTokenAndAuthorization,updateProduct)
    .delete(verifyTokenAndAdmin,deleteProduct)
}

export default productRoutes;