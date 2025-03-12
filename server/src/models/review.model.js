import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    Reviewer:{
        type:mongoose.ObjectId,
    },
    ReviewerName:{
        type:String,
    },
    ReviewedUser:{
        type:mongoose.ObjectId,
    },
    Rating:{
        type:Number,
        required:true,
        trim:true
    },
    Comment:{
        type:String,
    },
    Date:{
        type:Date
    }
},{timestamps: true});

export default mongoose.model("Review",reviewSchema)