// server.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// routes/events.ts
import { Router } from "express";

// models/Event.ts
import { Schema, model } from "mongoose";
var EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: String, required: true }
}, { collection: "eventsCollection" });
var Event_default = model("Event", EventSchema);

// controllers/eventController.ts
var createEvent = async (req, res) => {
  const { title, description, date, organizer } = req.body;
  const event = new Event_default({ title, description, date, organizer });
  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getEvents = async (req, res) => {
  const { page = 1, limit = 10, sortBy = "date" } = req.query;
  try {
    const events = await Event_default.find().sort({ [sortBy]: 1 }).skip((+page - 1) * +limit).limit(+limit);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event_default.findById(id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, organizer } = req.body;
  try {
    const event = await Event_default.findByIdAndUpdate(id, { title, description, date, organizer }, { new: true });
    if (!event)
      return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event_default.findByIdAndDelete(id);
    if (!event)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// routes/events.ts
var router = Router();
router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
var events_default = router;

// routes/registrations.ts
import { Router as Router2 } from "express";

// models/Registration.ts
import { Schema as Schema2, model as model2 } from "mongoose";
var RegistrationSchema = new Schema2({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  source: { type: String, required: true },
  eventId: { type: Schema2.Types.ObjectId, ref: "Event", required: true }
}, { collection: "registrationsCollection" });
var Registration_default = model2("Registration", RegistrationSchema);

// controllers/registrationController.ts
var createRegistration = async (req, res) => {
  const { name, email, birthDate, source, eventId } = req.body;
  const registration = new Registration_default({ name, email, birthDate, source, eventId });
  try {
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration_default.find().populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getRegistrationsByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const registrations = await Registration_default.find({ eventId }).populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { name, email, birthDate, source, eventId } = req.body;
  try {
    const registration = await Registration_default.findByIdAndUpdate(id, { name, email, birthDate, source, eventId }, { new: true });
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration_default.findByIdAndDelete(id);
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json({ message: "Registration deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// routes/registrations.ts
var router2 = Router2();
router2.post("/", createRegistration);
router2.get("/", getRegistrations);
router2.get("/event/:eventId", getRegistrationsByEvent);
router2.put("/:id", updateRegistration);
router2.delete("/:id", deleteRegistration);
var registrations_default = router2;

// server.ts
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://admin:GdGlPlqXGhEuM1234!@events-registration-app.ai1eojj.mongodb.net/?retryWrites=true&w=majority&appName=Events-Registration-App").then(() => console.log("MongoDB connected...")).catch((err) => console.error("MongoDB connection error:", err));
app.use("/events", events_default);
app.use("/registrations", registrations_default);
var PORT = process.env.PORT || 5e3;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
