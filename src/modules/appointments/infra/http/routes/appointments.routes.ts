import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsContoller from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsContoller();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appoitments = await appointmentsRepository.find();

//   return response.json(appoitments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
