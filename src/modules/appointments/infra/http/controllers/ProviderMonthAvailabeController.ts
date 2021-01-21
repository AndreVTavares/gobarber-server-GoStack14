import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailableService from '@modules/appointments/services/ListProviderMonthAvailableService';

export default class ProviderMonthAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailabe = container.resolve(
      ListProviderMonthAvailableService,
    );

    const availability = await listProviderMonthAvailabe.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
