import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage : {
        type: String,
        default: "https://res.cloudinary.com/dqyjz9z5w/image/upload/v1695123206/ProfileImage/DefaultProfileImage_gqo8xw.jpg"
    } ,
    clerkId : {
        type: String,
        required: true,
        unique: true,
    }
}, 
    {timestamps: true,}
)

const user = mongoose.model("User", userSchema);

export default user