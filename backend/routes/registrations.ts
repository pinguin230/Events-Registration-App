import { Router } from 'express';
import { createRegistration, getRegistrations, getRegistrationsByEvent, updateRegistration, deleteRegistration } from '../controllers/registrationController';

const router = Router();

router.post('/', createRegistration);
router.get('/', getRegistrations);
router.get('/event/:eventId', getRegistrationsByEvent);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

export default router;
