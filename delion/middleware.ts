import { stackMiddlewares, withValidateOAuthState } from 'server/middlewares';

const middlewares = [withValidateOAuthState];

export const middleware = stackMiddlewares(middlewares);
