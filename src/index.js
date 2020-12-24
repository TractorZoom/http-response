const httpResponse = require('./http-response');

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
