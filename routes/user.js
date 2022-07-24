import { 
    register,
    login,
    getUserById
} from '../controllers/user.js';
import {verifyTokenAndAuthorization} from '../middlewares/jwt.js';

const userRoutes = (app)=>{
    app.route('/login')
    .post(login)

    app.route('/register')
    .post(register)

    app.route('/users/:userId')
    .get(verifyTokenAndAuthorization,getUserById)
}

export default userRoutes;