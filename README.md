# @tractorzoom/http-response

Library to build http responses for use in serverless projects

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) [![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![pull_request_verify](https://github.com/TractorZoom/http-response/workflows/pull_request_verify/badge.svg) ![publish](https://github.com/TractorZoom/http-response/workflows/publish/badge.svg)

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
import { executeQuery } from '@tractorzoom/serverless-mysql-utils';
import { ok, internalServerError } from '@tractorzoom/http-response';

export const handler = async () => {
    const queryString = `SELECT * FROM MyTable WHERE id = "some-guid"`;

    const response = await executeQuery(queryString);

    if (response.error) {
        return internalServerError(response);
    }

    return ok(response);
};
```
