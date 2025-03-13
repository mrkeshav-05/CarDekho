import NotificationSchema from "../models/notifications.js";


export const getnotifications =async(req,res)=>{
  try{
    const id = req.params.id;
    const notifications = await NotificationSchema.find({ userId: id });
    console.log(notifications)
    res.status(200).json({notifications})
  }
  catch(e){
    console.log(e);
    res.status(500).json("error in retrieving notifications");
  }
}