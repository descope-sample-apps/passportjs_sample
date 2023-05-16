# todos-react-express-descope

This app illustrates how to use [Passport](https://www.passportjs.org/) with
[React](https://reactjs.org/) and [Express](https://expressjs.com/) to sign
users in with Descope strategy. Use this example as a starting point for
your own web applications.

## Overview

This app illustrates how to build a todo app with sign in functionality using
React, Express, Passport, and the [`passport-descope`](https://www.passportjs.org/packages/passport-descope/)
strategy.

This app is a JavaScript application with a backend, in which the UI executes in
the browser while data management and persistence is handled by the server.

This app is built using React for the UI and [React Router](https://reactrouter.com/)
for routing.  The backend is built using the Express web framework.  Data is
persisted to a [SQLite](https://www.sqlite.org/) database.

When a user first arrives at this app, they are prompted to sign in.  The React
app uses Descope flows to display the relevant flow (sign-in / sign-up) and the flow
takes care of the authentication to generate the JWT for the backend.
For demo purposes, the session and refresh tokens are kept in cookies and localstorage.
WARNING: to be secure, you must configure Descope with your own custom domain and keep the
refresh token in an http-only cookie.

After signing in, the user can view, create, and edit todo items.  Once again,
interaction occurs via the React app, which makes API calls to fetch and modify
data.  The browser automatically includes the JWT cookie set during login with each
of these requests.

When the server receives a request, it validates the JWT cookie thus authenticating the user. 
It then accesses or stores records in the database associated with the authenticated user.

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
