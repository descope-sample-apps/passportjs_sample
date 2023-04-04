# todos-react-express-password

This app illustrates how to use [Passport](https://www.passportjs.org/) with
[React](https://reactjs.org/) and [Express](https://expressjs.com/) to sign
users in with a username and password.  Use this example as a starting point for
your own web applications.

## Overview

This app illustrates how to build a todo app with sign in functionality using
React, Express, Passport, and the [`passport-local`](https://www.passportjs.org/packages/passport-local/)
strategy.

This app is a JavaScript application with a backend, in which the UI executes in
the browser while data management and persistence is handled by the server.

This app is built using React for the UI and [React Router](https://reactrouter.com/)
for routing.  The backend is built using the Express web framework.  Data is
persisted to a [SQLite](https://www.sqlite.org/) database.

When a user first arrives at this app, they are prompted to sign in.  The React
app prompts the user for their username and password and makes an API call to
authenticate with the backend.  Once authenticated, a login session is
established and maintained between the server and the user's browser with a
cookie.

After signing in, the user can view, create, and edit todo items.  Once again,
interaction occurs via the React app, which makes API calls to fetch and modify
data.  The browser automatically includes the cookie set during login with each
of these requests.

When the server receives a request, it authenticates the cookie and restores the
login session, thus authenticating the user.  It then accesses or stores records
in the database associated with the authenticated user.

## Implementation

This app conforms with the [TodoMVC](https://todomvc.com/) [specification](https://github.com/tastejs/todomvc/blob/master/app-spec.md),
with two notable exceptions.  First, it adds a user login and registration
system to the app.  Second, it persists data remotely rather than in
`localStorage`.  Remote storage is accessed via an API that conforms with
[Todo-Backend](https://todobackend.com/), which is also extended to support
authentication.

## License

[The Unlicense](https://opensource.org/licenses/unlicense)

## Credit

Created by [Jared Hanson](https://www.jaredhanson.me/)
