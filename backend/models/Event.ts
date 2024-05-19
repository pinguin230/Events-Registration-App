import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    organizer: string;
}

const EventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: String, required: true },
}, {collection: 'eventsCollection'});

export default model<IEvent>('Event', EventSchema);
