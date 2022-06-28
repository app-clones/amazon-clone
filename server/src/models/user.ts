import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re =
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Invalid email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 6;
            },
            message: "Password must be at least 7 characters"
        }
    },
    address: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("user", userSchema);

export default User;
