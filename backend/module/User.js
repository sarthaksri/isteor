import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    emailid: { type: String, required: true },
    phoneno: { type: String, required: true },
    branch: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User; // This exports User as the default export
