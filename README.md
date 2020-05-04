# @tractorzoom/http-response

## Available Methods

##### Method: `createResponse(body, status)`

| parameter | type   | required | description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| body      | any    | no       | the body to be stringified and sent with the response |
| status    | number | no       | status code of the response                           |

##### Method: `badRequest(body = {message: 'Bad Request'})`

| parameter | type | required | description                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| body      | any  | no       | the body to be stringified and sent with the response, default above in method signature |

##### Method: `internalServerError(body = {message: 'Internal Server Error'})`

| parameter | type | required | description                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| body      | any  | no       | the body to be stringified and sent with the response, default above in method signature |

##### Method: `methodNotAllowed(body = {message: 'Method Not Allowed'})`

| parameter | type | required | description                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| body      | any  | no       | the body to be stringified and sent with the response, default above in method signature |

##### Method: `notFound(body = {message: 'Not Found'})`

| parameter | type | required | description                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| body      | any  | no       | the body to be stringified and sent with the response, default above in method signature |

##### Method: `ok(body = {message: 'OK'})`

| parameter | type | required | description                                                                              |
| --------- | ---- | -------- | ---------------------------------------------------------------------------------------- |
| body      | any  | no       | the body to be stringified and sent with the response, default above in method signature |

## How do I use? :thinking:

##### Installation:

```bash
npm i @tractorzoom/http-response@latest
```

##### Usage:

```js
import {executeQuery} from '@tractorzoom/serverless-mysql-utils';
import {ok, internalServerError} from '@tractorzoom/http-response';

export const handler = async () => {
    const queryString = `SELECT * FROM MyTable WHERE id = "some-guid"`;

    const response = await executeQuery(queryString);

    if (response.error) {
        return internalServerError(response);
    }

    return ok(response);
};
```
