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
        const updatedArray = [...data.data,{checkstatus:false,text:req.query.newData}];
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
    const {id,updateData} = req.query;
    try {
        const data = await User.findOne({email:req.body.email});
        if(!data){
            res.status(404).json({
                message:"Not found"
            })
        }else{
         
      
          
          await User.updateOne({email:req.body.email,'data._id':id},{$set:{ 'data.$.text':updateData});
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
   checkHandle:async(req,res)=>{
    const { checkstatus,id} = req.params;
    try{
        if(checkstatus){
          await User.updateOne({email:req.body.email,'data._id':id},{set:{'data.$.checkstatus':false}})
        }else{
          await User.updateOne({email:req.body.email,'data._id':id},{set:{'data.$.checkstatus':true}})
        }
        res.json({message:"checked"})

    }catch{

    }

   },
   deleteData:async(req,res)=>{
    const {id} = req.query;
    try {
      await User.updateOne({email:req.body.email},{
        $pull:{
            data:{
                _id:id
            }
        }
      })
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