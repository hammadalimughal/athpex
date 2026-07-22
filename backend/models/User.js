const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    // --- Role Management ---
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Terminated'],
        default: 'Active',
    },

    // --- Health & Fitness Metrics (Specific to 'User' Role) ---
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'], default: 'Prefer not to say' },
    // --- Security ---
    resetPasswordOTP: { type: String, default: null },
    resetPasswordOTPExpires: { type: Date, default: null },
    
}, { timestamps: true });

const User = model('User', userSchema);
module.exports = User;