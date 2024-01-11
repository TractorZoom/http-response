import Chance from 'chance';
import { StatusCodes } from 'http-status-codes';
import * as httpResponse from '../src/http-response';

const chance = new Chance();

jest.mock('http-status-codes');

describe('http response', () => {
    it('should create a response with provided body and status', () => {
        // given
        const body = { key: chance.hash() };
        const status = chance.pickone([
            StatusCodes.BAD_REQUEST,
            StatusCodes.INTERNAL_SERVER_ERROR,
            StatusCodes.METHOD_NOT_ALLOWED,
            StatusCodes.OK,
        ]);

        // when
        const response = httpResponse.createResponse(body, status);

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Document-Policy': 'js-profiling',
            },
            isBase64Encoded: false,
            statusCode: status,
        });
    });

    it('should create a response with the defaults', () => {
        // given
        const body = {};
        const status = StatusCodes.OK;

        // when
        const response = httpResponse.createResponse();

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Document-Policy': 'js-profiling',
            },
            isBase64Encoded: false,
            statusCode: status,
        });
    });

    it('should create multi status response with correct body', () => {
        // given
        const success = chance.word();
        const error1 = chance.word();
        const error2 = chance.word();
        const requestObject = { success: [success], error: [error1, error2] };

        //when
        const response = httpResponse.multiStatus(requestObject);

        //then
        const expectedBody = {
            responses: [
                {
                    body: JSON.stringify({ message: success }),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Document-Policy': 'js-profiling',
                    },
                    isBase64Encoded: false,
                    statusCode: StatusCodes.OK,
                },
                {
                    body: JSON.stringify({ message: error1 }),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Document-Policy': 'js-profiling',
                    },
                    isBase64Encoded: false,
                    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                },
                {
                    body: JSON.stringify({ message: error2 }),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Document-Policy': 'js-profiling',
                    },
                    isBase64Encoded: false,
                    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                },
            ],
        };

        expect(response).toEqual({
            body: JSON.stringify(expectedBody),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Document-Policy': 'js-profiling',
            },
            isBase64Encoded: false,
            statusCode: StatusCodes.MULTI_STATUS,
        });
    });

    it.each`
        body                      | expectedStatus                       | httpReponseFunc
        ${{ key: chance.hash() }} | ${StatusCodes.BAD_REQUEST}           | ${httpResponse.badRequest}
        ${{ key: chance.hash() }} | ${StatusCodes.FORBIDDEN}             | ${httpResponse.forbidden}
        ${{ key: chance.hash() }} | ${StatusCodes.INTERNAL_SERVER_ERROR} | ${httpResponse.internalServerError}
        ${{ key: chance.hash() }} | ${StatusCodes.METHOD_NOT_ALLOWED}    | ${httpResponse.methodNotAllowed}
        ${{ key: chance.hash() }} | ${StatusCodes.NOT_FOUND}             | ${httpResponse.notFound}
        ${{ key: chance.hash() }} | ${StatusCodes.OK}                    | ${httpResponse.ok}
    `('should create a response when $httpReponseFunc is called', ({ body, expectedStatus, httpReponseFunc }) => {
        // when
        const response = httpReponseFunc(body);

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Document-Policy': 'js-profiling',
            },
            isBase64Encoded: false,
            statusCode: expectedStatus,
        });
    });

    it.each`
        expectedBody                            | expectedStatus                       | httpReponseFunc
        ${{ message: 'Bad Request' }}           | ${StatusCodes.BAD_REQUEST}           | ${httpResponse.badRequest}
        ${{ message: 'Forbidden' }}             | ${StatusCodes.FORBIDDEN}             | ${httpResponse.forbidden}
        ${{ message: 'Internal Server Error' }} | ${StatusCodes.INTERNAL_SERVER_ERROR} | ${httpResponse.internalServerError}
        ${{ message: 'Method Not Allowed' }}    | ${StatusCodes.METHOD_NOT_ALLOWED}    | ${httpResponse.methodNotAllowed}
        ${{ responses: [] }}                    | ${StatusCodes.MULTI_STATUS}          | ${httpResponse.multiStatus}
        ${{ message: 'Not Found' }}             | ${StatusCodes.NOT_FOUND}             | ${httpResponse.notFound}
        ${{ message: 'OK' }}                    | ${StatusCodes.OK}                    | ${httpResponse.ok}
    `(
        'should create a response with the default body  $httpReponseFunc is called',
        ({ expectedBody, expectedStatus, httpReponseFunc }) => {
            // when
            const response = httpReponseFunc();

            // then
            expect(response).toEqual({
                body: JSON.stringify(expectedBody),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Document-Policy': 'js-profiling',
                },
                isBase64Encoded: false,
                statusCode: expectedStatus,
            });
        }
    );
});
