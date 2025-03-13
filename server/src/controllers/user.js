import User from  "../models/user.js"

export const getUser = async(req,res)=>{
    try{
        // console.log(req.params.id)
        const user = await User.findById(req.params.id);
        // console.log(user)
        res.json({message:"User retrieved",user})
    }catch(err){
        res.json({message:"User not found"})
        console.log(err)
    }
}

