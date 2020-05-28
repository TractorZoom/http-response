const { BAD_REQUEST, INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED, OK, NOT_FOUND } = require('http-status-codes');
import Chance from 'chance';
import * as httpResponse from '../src/http-response';

const chance = new Chance();

jest.mock('http-status-codes');

describe('http response', () => {
    it('should create a response with provided body and status', () => {
        // given
        const body = { key: chance.hash() };
        const status = chance.pickone([BAD_REQUEST, INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED, OK]);

        // when
        const response = httpResponse.createResponse(body, status);

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            isBase64Encoded: false,
            statusCode: status,
        });
    });

    it('should create a response with the defaults', () => {
        // given
        const body = {};
        const status = OK;

        // when
        const response = httpResponse.createResponse();

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            isBase64Encoded: false,
            statusCode: status,
        });
    });

    it.each`
        body                      | expectedStatus           | httpReponseFunc
        ${{ key: chance.hash() }} | ${BAD_REQUEST}           | ${httpResponse.badRequest}
        ${{ key: chance.hash() }} | ${INTERNAL_SERVER_ERROR} | ${httpResponse.internalServerError}
        ${{ key: chance.hash() }} | ${METHOD_NOT_ALLOWED}    | ${httpResponse.methodNotAllowed}
        ${{ key: chance.hash() }} | ${NOT_FOUND}             | ${httpResponse.notFound}
        ${{ key: chance.hash() }} | ${OK}                    | ${httpResponse.ok}
    `('should create a response when $httpReponseFunc is called', ({ body, expectedStatus, httpReponseFunc }) => {
        // when
        const response = httpReponseFunc(body);

        // then
        expect(response).toEqual({
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            isBase64Encoded: false,
            statusCode: expectedStatus,
        });
    });

    it.each`
        expectedBody                            | expectedStatus           | httpReponseFunc
        ${{ message: 'Bad Request' }}           | ${BAD_REQUEST}           | ${httpResponse.badRequest}
        ${{ message: 'Internal Server Error' }} | ${INTERNAL_SERVER_ERROR} | ${httpResponse.internalServerError}
        ${{ message: 'Method Not Allowed' }}    | ${METHOD_NOT_ALLOWED}    | ${httpResponse.methodNotAllowed}
        ${{ message: 'Not Found' }}             | ${NOT_FOUND}             | ${httpResponse.notFound}
        ${{ message: 'OK' }}                    | ${OK}                    | ${httpResponse.ok}
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
                },
                isBase64Encoded: false,
                statusCode: expectedStatus,
            });
        }
    );
});
