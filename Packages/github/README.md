# SSE Auth React Github Login

[![NPM Downloads](https://img.shields.io/npm/dm/%40sse-auth%2Fgithub?style=flat)](https://www.npmjs.com/package/@sse-auth/github)
[![NPM Downloads](https://img.shields.io/npm/dt/%40sse-auth%2Fgithub?style=flat)](https://www.npmjs.com/package/@sse-auth/github)
[![npm version](https://badge.fury.io/js/@sse-auth%2Fgithub.svg)](https://badge.fury.io/js/@sse-auth%2Fgithub)

React component for [GitHub login](https://developer.github.com/v3/oauth/).

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import GitHubLogin from '@sse-auth/github';

const onSuccess = response => console.log(response)
const onFailure = response => console.error(response)

ReactDOM.render(
    <GitHubLogin clientId="ac56fad434a3a3c1561e" onSuccess={onSuccess} onFailure={onFailure}  />,
     document.getElementById('example')
)
```

### Props

#### `clientId`

`{string}` _required_

Client ID for GitHub OAuth application.

#### `redirectUri`

`{string}`

Registered redirect URI for GitHub OAuth application.

#### `scope`

`{string}`

Scope for GitHub OAuth application. Defaults to `user:email`.

#### `className`

`{string}`

CSS class for the login button.

#### `buttonText`

`{string}`

Text content for the login button.

#### `onRequest`

`{function}`

Callback for every request.

#### `onSuccess`

`{function}`

Callback for successful login. An object will be passed as an argument to the callback, e.g. `{ "code": "..." }`.

#### `onFailure`

`{function}`

Callback for errors raised during login.


## Development

```sh
$ npm start
```

Webpack development server starts at [http://localhost:8080](http://localhost:8080).
