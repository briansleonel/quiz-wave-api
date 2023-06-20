import mongoose from "mongoose";

export function isValidId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
}
