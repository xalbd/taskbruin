# API Documentation

## Status Codes

Check for success by verifying that `response.ok` is true.
If it is false, the error is reported in the body of the response.

- 200: success
- 400: bad request
- 401: unauthenticated
- 500: error occured server-side

## /api/task

### GET

No request body necessary.
Returns all tasks in database.

Status 200 for success, 500 for error.

### POST

Requires authentication.
Request body should provide `title`, `description`, and `price` of task to be added.
Returns assigned `id` if insert was successful.

Note: no server-side validation of body: will just error out if the database does not like the input.

Status 200 for success, 401 for unauthenticated, and 500 for error server-side.

## /api/task/[id]

### DELETE

Requires authentication.
Attempts to delete task with provided `id`.
Returns same `id` back if deletion was successful.

Status 200 for success, 401 for unauthenticated, 400 when no deletion occured, and 500 for error server-side.

## /api/me

### GET

Requires authentication.
No request body necessary.
Returns a json object with the key `created` corresponding to an array of all tasks the user created and the key `accepted` corresponding to an array of all tasks the user has accepted.

Status 200 for success, 401 for unauthenticated, and 500 for error server-side.

## /api/accept

### POST

Requires authentication.
Request body should provide `id` of task to be accepted.
Returns same `id` back if successful acceptance occured.

Status 200 for success, 401 for unauthenticated, 400 when no task was successfully accepted, and 500 for error server-side.

### DELETE

Requires authentication.
Request body should provide `id` of task to be un-accepted.
Returns same `id` back if task was successfully un-accepted.

Status 200 for success, 401 for unauthenticated, 400 when no task was successfully accepted, and 500 for error server-side.

## /api/user -- /api/user/[id]

### GET

Requires authentication.
Returns the user information of the provided ID. Not providing an ID returns the information of the user that is signed in.

Status 200 for success, 401 for unauthenticated, 400 when no user was found with the requested ID, and 500 for error server-side.
