const mongoose= require('mongoose');

const {Schema, model}= mongoose;
const validator= require('validator');
const userSchema= new Schema({
    first_name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    graduation_year: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        required: false,
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
        validate(value) {
            if(!['male', 'female', 'other'].includes(value)){
                throw new Error('Invalid gender value');
            }
        }
    },
    photoURL: {
        type: String,
        required: false,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error('Invalid URL');
            }
        }
    },
    about: {
        type: String,
        required: false,
        maxlength: 500,
        default: 'This user has not provided any information about themselves yet.'
    }
}, {timestamps: true});

const UserModal= mongoose.model('User', userSchema);

module.exports= UserModal;