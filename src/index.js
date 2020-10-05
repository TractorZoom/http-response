const httpResponse = require('./http-response');

module.exports = {
    badRequest: httpResponse.badRequest,
    createResponse: httpResponse.createResponse,
    internalServerError: httpResponse.internalServerError,
    methodNotAllowed: httpResponse.methodNotAllowed,
    notFound: httpResponse.notFound,
    ok: httpResponse.ok,
};