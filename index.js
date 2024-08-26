const express=require("express");
const app=express();
const {connectMongoDb}=require('./connection')
const roomsRoute= require('./routes/roomsRoute')
const userRoutes=require('./routes/userRoutes')
const bookingsRoute=require('./routes/bookingsRoute')



//to receive data on the backend
app.use(express.json());

// Connect to MongoDB
connectMongoDb('mongodb://127.0.0.1:27017/hotel-app').then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error(err);
});

//using routes
app.use('/api/rooms',roomsRoute)
app.use('/api/users',userRoutes)
app.use('/api/bookings',bookingsRoute)





const port=8000;
app.listen(port,console.log('server started on port: 8000'));