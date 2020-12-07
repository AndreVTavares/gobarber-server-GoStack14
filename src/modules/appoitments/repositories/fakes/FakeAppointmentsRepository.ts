import { v4 as uuid } from 'uuid';
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppoitmentDTO from '@modules/appoitments/dtos/ICreateAppoitmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppoitment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppoitment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppoitmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
