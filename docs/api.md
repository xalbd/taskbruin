# API Documentation

## Status Codes

Check for success by verifying that `response.ok` is true.
If it is false, the error is reported in the body of the response.

- 200: success
- 401: unauthenticated
- 500: failure

## /api/tasks

### GET

No request body necessary. Returns all tasks in database.

### POST

Requires authentication.
Request body should provide `title`, `description`, and `price` of task to be added. Returns assigned `id` if insert was successful.
