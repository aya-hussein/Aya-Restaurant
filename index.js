import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cart.js';
import cors from 'cors';
import adminRouter from './routes/admin.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.json("hello DB work")
})
const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,
            {useNewUrlParser:true,useUnifiedTopology:true})
    } catch (error) {
        console.log(error)
    }
}
connectToDB()
productRoutes(app);
orderRoutes(app);
userRoutes(app);
cartRoutes(app);
app.use('/admin',adminRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})