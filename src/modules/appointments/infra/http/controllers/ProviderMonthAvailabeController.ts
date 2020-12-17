import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailableService from '@modules/appointments/services/ListProviderMonthAvailableService';

export default class ProviderMonthAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailabe = container.resolve(
      ListProviderMonthAvailableService,
    );

    const availability = await listProviderMonthAvailabe.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
