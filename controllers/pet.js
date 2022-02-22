const Pet = require('../models/pet')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const date=new Date()

require('dotenv').config();

const login=(req,res)=>{
  const name=req.body.username
  const password=req.body.password
  const user={name:name,password:password} 
  const accessToken=jwt.sign(user,process.env.strForJWT)  
  res.status(200).json({accessToken:accessToken})
}

const getAllPets= async (req,res)=>{

  let limit=req.query.limit

  if(!limit)
  {
    limit=10
  }

  const result=await Pet.find({},(err,data)=>{
    if(err)
    {
      res.send(500).send("error in Pet.find in getAllPets: ",err)
    }

    const response={
      results:data,
      totalItems:data.length
    }

    res.status(200).send(response)
  }).limit(limit)
  
}

const addPet= async (req,res)=>{
  try {
    
  const {name,type,age}=req.body
  
  const pet=new Pet({name:name,id:uuid.v4(),created_at:date,type:type,age:age})

  const result= await pet.save()

  if(result)
  {
    console.log("pet saved successfully")
    res.status(200).send("pet saved successfully")
  }
    
  } catch (error) {
    console.log("error in addPet: ",error)
    res.send("error in addPet is: ",error)
  }
}

const deletePet= async (req,res)=>{
  const name=req.body.name

  if(name==null)
  {
    res.send("didn't input name")
  }
  try {
    
  
  const result=await Pet.findOne({name:name})
  if(result){
    const deleteRes=await Pet.findOneAndUpdate({name:name},{deleted_at:date})
    if(deleteRes){
      console.log("deletion succeded")
      res.send("deletion succeded")
    }
    else{
      console.log("something went wrong with deletion")
      res.send("something went wrong with deletion")
    }
  }
  else{
    console.log("pet doesn't exist in that name")
    res.send("pet doesn't exist in that name")
  }

} catch (error) {
 console.log("error in deletePet is: ",error)
 res.send("error in deletePet is: ",error)   
}

}

const petsAges= async (req,res)=>{
  
    const result=await Pet.find({},(err,data)=>{
      if(err)
      {
        console.log(err)
        res.send("an error in petsAges: ",err)
      }

      let sum=0

      data.forEach((pet)=>{
        sum+=pet.age
      })

      res.send("pets' ages: "+sum)
    })
  
}
module.exports = {login,getAllPets,addPet,deletePet,petsAges}