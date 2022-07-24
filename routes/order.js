import { 
    getOrders ,
    addNewOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
} from '../controllers/order.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../middlewares/jwt.js';

const orderRoutes = (app)=>{
    app.route('/orders')
    .get(verifyTokenAndAdmin,getOrders)
    .post(verifyTokenAndAuthorization,addNewOrder);

    app.route('/orders/:orderId')
    .get(verifyTokenAndAuthorization,getOrderById)
    .put(verifyTokenAndAdmin,updateOrder)
    .delete(verifyTokenAndAdmin,deleteOrder)
    
    app.route('/orders/user/:userId')
    .get(verifyTokenAndAuthorization,getOrdersByUserId)

}

export default orderRoutes;