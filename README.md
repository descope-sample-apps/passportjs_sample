# Todo App Sample App

This todo app showcases sign in functionality with the Descope [Passport](https://www.passportjs.org/) Strategy, [Express](https://expressjs.com/), and[React](https://reactjs.org/). This example can be used to help you implement the Descope strategy in your own projects.

## Overview 💡

This app is a JS app with a backend, with the UI executing in
the browser while data management and persistence is handled by the server.

The login page uses Descope Flows to handle user authentication and create the JWT for the backend session validation. 
For demo purposes, the session and refresh tokens are kept in cookies and localstorage.

After signing in, the user can view, create, and edit todo items.

> **Note**: to be secure, you must configure Descope with your own custom domain and keep the
refresh token in an http-only cookie.

## Getting Started

Running this sample app is super easy. Just go through the following steps:

1. Run the following command to install the necessary packages and the `Descope Strategy` from npm.

```
npm install
```

2. Run this command to start the todo application

```
npm run start
```

## Implementation

This app conforms with the [TodoMVC](https://todomvc.com/) [specification](https://github.com/tastejs/todomvc/blob/master/app-spec.md),
with two notable exceptions.  First, it adds a user login and registration
system to the app via flows.  Second, it persists data remotely rather than in
`localStorage`.  Remote storage is accessed via an API that conforms with
[Todo-Backend](https://todobackend.com/), which is also extended to support
authentication.

## License

[The Unlicense](https://opensource.org/licenses/unlicense)

## Credit

Based on example created by [Jared Hanson](https://www.jaredhanson.me/)
