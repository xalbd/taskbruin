# API Documentation

## Status Codes

Check for success by verifying that `response.ok` is true.
If it is false, the error is reported in the body of the response.

- 200: success
- 400: bad request
- 401: unauthenticated
- 500: error occured server-side

## /api/tasks

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

### DELETE

Requires authentication.
Request body should provide `id` of task to be deleted.
Returns same `id` back if deletion was successful.

Status 200 for success, 401 for unauthenticated, 400 when no deletion occured, and 500 for error server-side.

## /api/me

### GET

Requires authentication.
No request body necessary.
Returns all tasks that the current user has created.

Status 200 for success, 401 for unauthenticated, and 500 for error server-side.

## /api/accept

### PATCH

Requires authentication.
Request body should provide `id` of task to be accepted.
Returns same `id` back if successful acceptance occured.

Status 200 for success, 401 for unauthenticated, 400 when no task was successfully accepted, and 500 for error server-side.
