import {
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    METHOD_NOT_ALLOWED,
    MULTI_STATUS,
    NOT_FOUND,
    OK,
} from 'http-status-codes';
import { APIGatewayProxyResult } from 'aws-lambda';

export interface HttpResponse<T> extends APIGatewayProxyResult {
    type?: T;
}

export function createResponse<T>(body: T, status = OK): HttpResponse<T> {
    return {
        body: body === undefined ? '{}' : JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        isBase64Encoded: false,
        statusCode: status,
    };
}

export const badRequest = (body): HttpResponse<any> => {
    if (body === undefined) {
        return createResponse({ message: 'Bad Request' }, BAD_REQUEST);
    }

    return createResponse(body, BAD_REQUEST);
};

export const forbidden = (body): HttpResponse<any> => {
    if (body === undefined) {
        return createResponse({ message: 'Forbidden' }, FORBIDDEN);
    }

    return createResponse(body, FORBIDDEN);
};

export const internalServerError = (body): HttpResponse<any> => {
    if (body === undefined) {
        return createResponse({ message: 'Internal Server Error' }, INTERNAL_SERVER_ERROR);
    }

    return createResponse(body, INTERNAL_SERVER_ERROR);
};

export const methodNotAllowed = (body): HttpResponse<any> => {
    if (body === undefined) {
        return createResponse({ message: 'Method Not Allowed' }, METHOD_NOT_ALLOWED);
    }

    return createResponse(body, METHOD_NOT_ALLOWED);
};

type Responses = { responses: HttpResponse<{ message: any }>[] };

export function multiStatus(responseObject = { error: [], success: [] }): HttpResponse<Responses> {
    const body: Responses = { responses: [] };

    responseObject.success.forEach((element) => {
        body.responses.push(createResponse({ message: element }, OK));
    });
    responseObject.error.forEach((element) => {
        body.responses.push(createResponse({ message: element }, INTERNAL_SERVER_ERROR));
    });

    return createResponse<Responses>(body, MULTI_STATUS);
}

export function notFound(body): HttpResponse<any> {
    if (body === undefined) {
        return createResponse({ message: 'Not Found' }, NOT_FOUND);
    }

    return createResponse(body, NOT_FOUND);
}

export function ok<T>(body: T): HttpResponse<T> {
    if (body === undefined) {
        return createResponse(({ message: 'OK' } as unknown) as T, OK);
    }

    return createResponse(body, OK);
}
