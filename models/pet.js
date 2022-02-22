const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);

const schema = {
    name: { type: String, required: true },
    id: { type: String, required: true },
    created_at: { type: Date, required: true },
    deleted_at: { type: Date, required: false },
    type:{type:String,required:true},
    age:{type:Number,required:true}    
}


const pet_schema = new mongoose.Schema(schema);
const Pet = mongoose.model('pet', pet_schema);
module.exports = Pet;