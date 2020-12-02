import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appoitments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appoitments = await appointmentsRepository.find();

//   return response.json(appoitments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
