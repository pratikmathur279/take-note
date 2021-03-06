import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
var compareSync = bcryptjs.compareSync;
var hashSync = bcryptjs.hashSync;

import { signUp } from '../validations/user.js';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: username => User.doesNotExist({ username }),
            message: "Username already exists"
        }
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: email => User.doesNotExist({ email }),
            message: "Email already exists"
        }
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    primaryPhoto: {
        type: String
    },
    home_phone: {
        type: String
    },
    cell_phone: {
        type: String
    }
}, { timestamps: true });


UserSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
});
UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};
UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;