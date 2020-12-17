import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabeController from '../controllers/ProviderMonthAvailabeController';
import ProviderDayAvailabeController from '../controllers/ProviderDayAvailableController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvailableController = new ProviderMonthAvailabeController();
const providerDayAvailableController = new ProviderDayAvailabeController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailableController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailableController.index,
);

export default providersRouter;
