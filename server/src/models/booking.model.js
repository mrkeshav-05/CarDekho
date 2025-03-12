import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    Bookingperson:{
        type: mongoose.ObjectId,
    },
    Driver:{
        type: mongoose.ObjectId,
    },
    source:{
        type: String,
    },
    destination:{
        type: String,
    },
    trip:{
        type: mongoose.ObjectId,
    },
    NoofBookedSeats:{
        type: Number,
    },
    Date:{
        type: Date,
    },
    fare:{
        type:Number,
    },
    PaymentMethod:{
        type:String,
    },
    rt:{
        type: Number,
    },
    Payment_id:{
        type:String,
    },
    Payment_order_id:{
        type:String,
    },
    Payment_signature:{
        type:String,
    },
    Remark:{
        type:String,
    }
},{timestamps: true});

export default mongoose.model("Booking", bookingSchema);