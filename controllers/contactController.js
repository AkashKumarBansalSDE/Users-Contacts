const asyncHandler = require("express-async-handler"); 
const Contact = require("../models/contactModel");
//when creating api method ..we will give label
//@des Get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async(req,res)=>{
    //res.send("Get all contacts");
    const contacts = await Contact.find({user_id:req.user.id});  
    res.status(200).json(contacts);
});

//@des create contacts
//@route POST /api/contacts
//@access private 
const createContact = asyncHandler(async(req,res)=>{
    //res.send("create contacts");
    console.log("The request body is:", req.body);
    const {name,email,phone} =req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory   !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);

});
//@des Get  contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req,res)=>{
    //res.send("Get all contacts");
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
 
//@des update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>{
    //res.send("Get all contacts"); 
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contacts not found");
    }

    //a different user is trying to update a contact on another user
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateContact);
})

//@des delete contacts
//@route DELETE /api/contacts/:id
//@access private  
const deleteContact = asyncHandler(async(req,res)=>{
    //res.send("Get all contacts");
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contacts not found");
    }
    //a different user is trying to update a contact on another user
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

   //this will remove all contacts await Contact.remove();
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
});


module.exports ={ getContacts,createContact,getContact,updateContact,deleteContact};