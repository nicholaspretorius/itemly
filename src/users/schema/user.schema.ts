import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roles: [String],
});

export const User = mongoose.model('Users', UserSchema);
