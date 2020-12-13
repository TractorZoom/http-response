const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    MULTI_STATUS,
    NOT_FOUND,
    OK,
} = require('http-status-codes');

export const createResponse = (body = {}, status = OK) => ({
    body: JSON.stringify(body),
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    isBase64Encoded: false,
    statusCode: status,
});

export const badRequest = (body = { message: 'Bad Request' }) => createResponse(body, BAD_REQUEST);

export const internalServerError = (body = { message: 'Internal Server Error' }) =>
    createResponse(body, INTERNAL_SERVER_ERROR);

export const methodNotAllowed = (body = { message: 'Method Not Allowed' }) => createResponse(body, METHOD_NOT_ALLOWED);

export const multiStatus = (responseObject = { success: [], error: [] }) => {
    let body = { responses: [] };
    responseObject.success.forEach((element) => {
        body.responses.push(createResponse({ message: element }, OK));
    });
    responseObject.error.forEach((element) => {
        body.responses.push(createResponse({ message: element }, INTERNAL_SERVER_ERROR));
    });
    return createResponse(body, MULTI_STATUS);
};

export const notFound = (body = { message: 'Not Found' }) => createResponse(body, NOT_FOUND);

export const ok = (body = { message: 'OK' }) => createResponse(body, OK);