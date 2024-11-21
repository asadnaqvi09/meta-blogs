import mongoose from 'mongoose'; // Changed to import

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, 'Name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password should be at least 6 characters long']
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "student", "admin"],
        default: "admin"
    },
    education: {
        type: String,
        required: true,
        enum: ["Intermediate", "Bachelors", "Masters", "PHD"],
        default: "Intermediate"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const User = mongoose.model("User", UserSchema)