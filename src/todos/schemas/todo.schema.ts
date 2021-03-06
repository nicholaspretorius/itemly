import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    id: String,
    userId: String,
    description: String,
    done: Boolean,
});

export const Todo = mongoose.model('Todos', TodoSchema);