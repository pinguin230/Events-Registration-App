import mongoose, { Document, Schema } from 'mongoose';

interface IRegistration extends Document {
    name: string;
    email: string;
    birthDate: Date;
    source: string;
    eventId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: Date, required: true },
    source: { type: String, required: true },
    eventId: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    createdAt: { type: Date, default: Date.now }
}, {collection: 'registrationsCollection'});

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);
