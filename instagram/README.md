# SSE Instagram Login
[![NPM Downloads](https://img.shields.io/npm/dm/%40sse-auth%2Finstagram?style=flat)](https://www.npmjs.com/package/@sse-auth/instagram)
[![NPM Downloads](https://img.shields.io/npm/dt/%40sse-auth%2Finstagram?style=flat)](https://www.npmjs.com/package/@sse-auth/instagram)
[![npm version](https://badge.fury.io/js/@sse-auth%2Finstagram.svg)](https://badge.fury.io/js/@sse-auth%2Finstagram)

> An Instagram oAUth Sign-in / Log-in Component for React

## Install
```
npm install @sse-auth/instagram

```
## How to use
```js
import React from 'react';
import ReactDOM from 'react-dom';
import InstagramLogin from '@sse-auth/instagram';

const responseInstagram = (response) => {
  console.log(response);
}

ReactDOM.render(
  <InstagramLogin
    clientId="5fd2f11482844c5eba963747a5f34556"
    buttonText="Login"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  />,
  document.getElementById('instagramButton')
);
```
## onSuccess callback

Callback will return a code for use on your server to get a full access_token.

If ```implicitAuth``` is set to ```true``` it will return the full access_token directly.

## onFailure callback

Callback will return an error object.

| property name       |  value   |
|:-------------------:|:--------:|
|       error         |  string  |
|    error_reason     |  string  |
|  error_description  |  string  |

## Parameters

|    params    |   value  |             default value            |
|:------------:|:--------:|:------------------------------------:|
|    clientId  |  string  |               REQUIRED               |
|     scope    |  string  |                 basic                |
|   onSuccess  | function |               REQUIRED               |
|   onFailure  | function |               REQUIRED               |
|   buttonText |  string  |            Login with Instagram      |
|   cssClass   |  string  |                   -                  |
|     tag      |  string  |                button                |
|     type     |  string  |                button                |
| implicitAuth | boolean  |                false                 |


Instagram API Docs: https://www.instagram.com/developer/

You can now also pass child components such as icons into the button component.
```js
  <InstagramLogin
    clientId="5fd2f11482844c5eba963747a5f34556"
    onSuccess={responseInstagram}
    onFailure={responseInstagram}
  >
    <FontAwesome
      name="instagram"
    />
    <span> Login with Instagram</span>
  </InstagramLogin>

```
## Dev Server
```
npm run start

```
## Run Tests
```
npm run test:watch

```

## Production Bundle
```
npm run bundle
```
