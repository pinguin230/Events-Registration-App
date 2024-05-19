import { Schema, model, Document } from 'mongoose';

interface IRegistration extends Document {
    name: string;
    email: string;
    birthDate: Date;
    source: string;
    eventId: Schema.Types.ObjectId;
}

const RegistrationSchema = new Schema<IRegistration>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: Date, required: true },
    source: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
}, {collection: 'registrationsCollection'});

export default model<IRegistration>('Registration', RegistrationSchema);
