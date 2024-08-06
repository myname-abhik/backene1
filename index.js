const cors = require('cors');
const express  = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const app = express();
const fileUpload  =require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true,
    
}))
require('dotenv').config();
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT
// app.use()
mongoose.connect(`mongodb+srv://abhik16chakrabortty:1214@cluster0.rwp58am.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('Connected to MongoDB');
  })
  .catch((err)=>{  
    console.log('Error connecting to MongoDB',err);
  })
const {connectToCloudinary} = require('./cloudinary')
connectToCloudinary();

app.use((err,res,req,next)=>{
    err.statusCode = err.statusCode || 500;
    err.staus = err.status||'error'
    res.status(err.statusCode).json({
        status: error.status,
        message : err.message,

    })
})
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  app.use('/api/auth', authRouter)
