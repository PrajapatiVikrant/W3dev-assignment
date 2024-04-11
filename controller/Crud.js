require('../config/db')
const User = require('../model/User')
const Crud = {
   getData:async(req,res)=>{
  
     try {
        const data = await User.findOne({email:req.body.email});
        if(!data){
            res.status(404).json({
                message:"Not found"
            })
        }else{
            
            res.status(200).json({
                message:data.data
            })
        }
     } catch (error) {
        console.log(error)
        res.status(502).json({
            message:"server error"
        })
     }
   },
   addData:async(req,res)=>{
    console.log('hello world')
    try {
        const data = await User.findOne({email:req.body.email});
        const updatedArray = [...data.data,req.query.newData];
        data.data = updatedArray;
        await User.updateOne({email:req.body.email},{data:data.data});
       
        res.status(201).json({
            message:"Add successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(502).json({
            message:"server error"
        })
    }
   },
   updateData:async(req,res)=>{
    try {
        const data = await User.findOne({email:req.body.email});
        if(!data){
            res.status(404).json({
                message:"Not found"
            })
        }else{
          let updatedArray =  data.data.map((elem,ind)=>{
            if(ind == req.params.id){
                elem = req.query.updateData;
            }
            
            return elem;
          })
      
          data.data = updatedArray;
          await User.updateOne({email:req.body.email},{data:data.data});
          res.status(200).json({
            message:"Edit Successfully"
          })
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({
            message:"server error"
        })
    }
   },
   deleteData:async(req,res)=>{
    try {
      const data = await User.findOne({email:req.body.email});
      const updatedArray = data.data.filter((elem,ind)=>{
        return ind != req.params.id;
      })
    
      data.data = updatedArray
      await User.updateOne({email:req.body.email},{data:data.data})
      res.status(200).json({
        message:"delete item"
    })
    } catch (error) {
        console.log(error)
        res.status(502).json({
            message:"server error"
        })
    }
   }

}
module.exports = Crud;