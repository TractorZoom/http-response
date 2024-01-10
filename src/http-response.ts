import { APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export interface HttpResponse<T> extends APIGatewayProxyResult {
    type?: T;
}

export function createResponse<T>(body?: T, status = StatusCodes.OK): HttpResponse<T> {
    return {
        body: body === undefined ? '{}' : JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Document-Policy': 'js-profiling',
        },
        isBase64Encoded: false,
        statusCode: status,
    };
}

export const badRequest = (body): HttpResponse<any> => {
    if (body === undefined) {
        body = { message: 'Bad Request' };
    }

    return createResponse(body, StatusCodes.BAD_REQUEST);
};

export const forbidden = (body): HttpResponse<any> => {
    if (body === undefined) {
        body = { message: 'Forbidden' };
    }

    return createResponse(body, StatusCodes.FORBIDDEN);
};

export const internalServerError = (body): HttpResponse<any> => {
    if (body === undefined) {
        body = { message: 'Internal Server Error' };
    }

    return createResponse(body, StatusCodes.INTERNAL_SERVER_ERROR);
};

export const methodNotAllowed = (body): HttpResponse<any> => {
    if (body === undefined) {
        body = { message: 'Method Not Allowed' };
    }

    return createResponse(body, StatusCodes.METHOD_NOT_ALLOWED);
};

type Responses = { responses: HttpResponse<{ message: any }>[] };

export function multiStatus(responseObject = { error: [], success: [] }): HttpResponse<Responses> {
    const body: Responses = { responses: [] };

    responseObject.success.forEach((element) => {
        body.responses.push(createResponse({ message: element }, StatusCodes.OK));
    });
    responseObject.error.forEach((element) => {
        body.responses.push(createResponse({ message: element }, StatusCodes.INTERNAL_SERVER_ERROR));
    });

    return createResponse<Responses>(body, StatusCodes.MULTI_STATUS);
}

export function notFound(body): HttpResponse<any> {
    if (body === undefined) {
        body = { message: 'Not Found' };
    }

    return createResponse(body, StatusCodes.NOT_FOUND);
}

export function ok<T>(body: T): HttpResponse<T> {
    if (body === undefined) {
        body = { message: 'OK' } as unknown as T;
    }

    return createResponse(body, StatusCodes.OK);
}
