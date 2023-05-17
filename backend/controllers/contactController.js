const asyncHandler=require('express-async-handler');
const Contact=require('../models/contactModel');


const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});



const postContact=asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const {name,email,phoneNo}=req.body;

    if(!name || !email || !phoneNo){
        res.status(400);
        throw new error("All fields are mandatory.");
    }
    const contact=await Contact.create({
        // name:name,email:email,phone:phone
        name,email,phoneNo,user_id:req.user.id
    });
    res.status(201).json(contact);
});



const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new error("Contact not found.");
    }

        res.status(200).json(contact);
});


const putContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new error("Contact not found.");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new error("User is Not authorized to update contact of other user.");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});


const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new error("Contact not found.");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new error("User is Not authorized to update contact of other user.");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});


module.exports={getContact,getContacts,postContact,putContact,deleteContact}
