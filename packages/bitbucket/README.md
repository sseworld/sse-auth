# SSE Bitbucket Passport

[![NPM Downloads](https://img.shields.io/npm/dm/%40sse-auth%2Fbitbucket?style=flat)](https://www.npmjs.com/package/@sse-auth/bitbucket)
[![NPM Downloads](https://img.shields.io/npm/dt/%40sse-auth%2Fbitbucket?style=flat)](https://www.npmjs.com/package/@sse-auth/bitbucket)
[![NPM License](https://img.shields.io/npm/l/%40sse-auth%2Fbitbucket)](https://www.npmjs.com/package/@sse-auth/bitbucket)
[![npm version](https://badge.fury.io/js/@sse-auth%2Fbitbucket.svg)](https://badge.fury.io/js/@sse-auth%2Fbitbucket)

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Bitbucket](https://bitbucket.org/) using the OAuth 2.0 API.

This module lets you authenticate using Bitbucket in your Node.js applications.
By plugging into Passport, Bitbucket authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install @sse-auth/bitbucket

## Usage

#### Configure Strategy

The Bitbucket authentication strategy authenticates users using a Bitbucket
account and OAuth tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a consumer key, consumer secret, and callback URL.

    passport.use(new BitbucketStrategy({
        clientID: BITBUCKET_CLIENT_ID,
        clientSecret: BITBUCKET_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/bitbucket/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ bitbucketId: profile.username }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'bitbucket'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/bitbucket',
      passport.authenticate('bitbucket'));

    app.get('/auth/bitbucket/callback', 
      passport.authenticate('bitbucket', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Tests

    $ npm install --dev
    $ make test

## Credits

  - [SSE World](http://github.com/sseworld)
  - [SSE Official](http://github.com/ssewofficial)

## License

[The MIT License](./LICENSE)

Copyright (c) 2024 - 2030 SSE World