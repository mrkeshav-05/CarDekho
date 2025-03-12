import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number
    },
    reviews:{
        type:[Object] //review id,rating,comment,written by whom,date,pfp of person
    },
    trips:{
        type:Array,
        default:[]
    },
    bookings:{
        type:Array,
        default:[]
    },
    requestedbookings:{
        type:Array,
        default:[],
    },
    requestedtrips:{
        type:Array,
        default:[],
    },
    active_trp:{
        type: mongoose.ObjectId
    },
    active_booking:{
        type: mongoose.ObjectId
    },
    role:{
        type:Boolean
    },
    resetToken: {
        type: String,
        default: 'hihhi'
      },
    resetTokenExpiration: {
        type: Date,
        default: new Date()
    },
    age:{
        type: Number,
        default: 18
    },
    gender:{
        type: String
    },
    address:{
        type: String
    },
    prof:{
        type: String
    }
},{timestamps: true});

export default mongoose.model("User",userSchema)