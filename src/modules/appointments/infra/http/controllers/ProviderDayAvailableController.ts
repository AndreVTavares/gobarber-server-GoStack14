import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailableService from '@modules/appointments/services/ListProviderDayAvailableService';

export default class ProviderMonthAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const ListProviderDayAvailable = container.resolve(
      ListProviderDayAvailableService,
    );

    const availability = await ListProviderDayAvailable.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(availability);
  }
}
