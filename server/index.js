import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { DB } from './db/config.js';
import cloudinaryConfig from './db/cloudinary.js';
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';   
import cartRoute from './routes/cart.route.js'
import ordersRoute from './routes/orders.route.js'
import paymentRoute from './routes/payment.route.js'


dotenv.config();

const allowedOrigins = ['https://tees-two.vercel.app']

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/payment', paymentRoute)


app.listen(PORT, ()=> {
   DB();
    cloudinaryConfig();
    console.log("Server is running");
})