const Notification = require ('../models/notification');
const User = require('../models/user') ; 

const CreateNotification = async (obj)=>{
    return Notification.create(obj) ;
}



exports.newNotification = async (req,res) =>{

    try{
        const user = await User.findById(req.params.userId); 
        
        if (!user)  
            return res
            .status(409)
            .json({ message: "User doesn't  exist ! " });
        
        const company = await User.findById(req.params.companyId); 
        
        if (!company)  
            return res
            .status(409)
            .json({ message: "Company doesn't  exist ! " });
        
        const createdAt = new Date();

        const newNotification = new Notification({
            content : req.body.content ,
            type : req.body.type ,
            createdAt : createdAt ,
            company : req.params.companyId,
            seen : false , 
            user : req.params.userId , 
        });

        const savedNotification = await newNotification.save() ; 
        res.status(200).json(savedNotification);

    }catch (err){
        res.json({message : err}); 
        console.log(err) ;
    }


}


exports.getall = async (req,res) =>{
    try {
        const notifications = await Notification.find()
        res.json(notifications)
    }
    catch(err){
        res.json({message: err})
    }
}


//get notiifcations by user
exports.getNotifications = async (req,res) =>{
    try {
        const notifications = await Notification.find({
            user : req.userData.user._id,
        })
        res.json(notifications)
    }
    catch(err){
        res.json({message: err})
    }
}




exports.updateNotification = async (req,res) =>{
    try {
        
        await  Notification.updateOne(
            {_id : req.params.notificationId} ,
             {
                 $set : {
                     seen : true
                 }
             }

        )
    }
    catch(err){
        res.json({message: err})
    }
}
