import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appoitmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await appoitmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appoitmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appoitmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
