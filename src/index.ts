import { HttpResponse } from './http-response';
import * as httpResponse from './http-response';

export { HttpResponse };

module.exports = {
    badRequest: httpResponse.badRequest,
    createResponse: httpResponse.createResponse,
    forbidden: httpResponse.forbidden,
    internalServerError: httpResponse.internalServerError,
    methodNotAllowed: httpResponse.methodNotAllowed,
    multiStatus: httpResponse.multiStatus,
    notFound: httpResponse.notFound,
    ok: httpResponse.ok,
};
