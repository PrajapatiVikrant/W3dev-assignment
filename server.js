const express=require('express')
require('dotenv').config();
const cors = require('cors');
const app = express()
const PORT = process.env.PUBLIC_PORT || 4000;
app.use(cors())
app.get('/',(req,res)=>{res.send('hello world')})
app.use('/auth',require('./Route/Auth'))
app.use('/todo',require('./Route/Crud'))
app.listen(PORT,()=>{
  console.log(`server listen at ${PORT}`)
})
