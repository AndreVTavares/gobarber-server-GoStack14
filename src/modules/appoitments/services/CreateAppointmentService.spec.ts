import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '2312313213',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('2312313213');
  });

  it('should not be able to create two appointments on same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '2312313213',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '2312313213',
      }),
    ).rejects.toBeInstanceOf(AppError);

    return appointment;
  });
});
