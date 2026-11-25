const mongoose= require('mongoose');

const {Schema, model}= mongoose;
const validator= require('validator');
const jwt= require('jsonwebtoken');
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
        required: false,
    },
    company: {
        type: String,
        required: false
    },
    graduation_year: {
        type: Number,
        required: false
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
        required: false,
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

// Instance method: call as user.getJWT() on any user document.
// Must be a regular function (not an arrow function) so `this` is the user.
userSchema.methods.getJWT = async function () {
    const user = this; // `this` = the user document this method was called on
    const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_TOKEN_ENCRYPTION_STRING,
        { expiresIn: "7d" }
    );
    return token;
};

userSchema.methods.validatePassword= async function ( userEnteredPassword ) {
    const user= this;
    const passwordHash= user.password;
    const isPasswordValid= await bcrypt.compareSync(userEnteredPassword, passwordHash);

    return isPasswordValid
}

const UserModal= mongoose.model('User', userSchema);

module.exports= UserModal;