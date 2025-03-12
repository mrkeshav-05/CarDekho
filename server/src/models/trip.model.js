import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    source:{
        type: Object,
        required: true,
    },
    destination:{
        type: Object,
        required: true,
    },
    driver:{
        type: mongoose.ObjectId,
        required: true,
    },
    availableSeats:{
        type: Number,
        required:true,
    },
    CarModel:{
        type:String,
        required:true
    },
    Max_Seats:{
        type: Number,
        required: true,
    },
    Riders:{
        type: [{
            location: String,
            name: String,
            age: Number
        }],
        default: []
    },
    Bookings:{
        type:[mongoose.ObjectId],
        default:[]
    },
    Bookers:{
        type:[mongoose.ObjectId],
        default:[]
    },
    completed:{
        type:Boolean,
        default:false
    },
    time:{
        type: Date,
    },
    totalTime:{
        type: String,
    },
    totalDistance:{
        type: String,
    },
    routes:{
        type: String
    },
    fare:{
        type:Number,
        required:true
    }
},{timestamps: true});

export default mongoose.model("Trip",tripSchema)