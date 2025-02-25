const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    assigned_to:{
        type:[String],
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:false
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
});

module.exports = mongoose.model('Task',TaskSchema);