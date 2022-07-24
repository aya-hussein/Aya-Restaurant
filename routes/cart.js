import { 
    getCarts ,
    addNewCart,
    getCartById,
    updateCart,
    deleteCart,
    getCartByUserId
} from '../controllers/cart.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../middlewares/jwt.js';

const cartRoutes = (app)=>{
    app.route('/carts')
    .get(verifyTokenAndAdmin,getCarts)
    .post(verifyTokenAndAuthorization,addNewCart);

    app.route('/carts/user/:userId')
    .get(verifyTokenAndAuthorization,getCartByUserId)

    app.route('/carts/:cartId')
    .get(verifyTokenAndAuthorization,getCartById)
    .put(verifyTokenAndAuthorization,updateCart)
    .delete(verifyTokenAndAuthorization,deleteCart)
}

export default cartRoutes;