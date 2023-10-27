# Database Management

## Architecture and Setup

Our Postgres QL database is hosted on [Neon](https://console.neon.tech). The data is accessed through the [Prisma](https://www.prisma.io/docs) ORM.

Before you try doing anything, make sure you're connected to eduroam, and not UCLA_WEB or UCLA_WIFI. Neon will not let you connect to a database if you're not a secured network.

## Frontend

For simplicity's sake, front-end development should always simply use the data in the production database. Thus, once set up, there is no need to edit environment variables again or the Prisma schema again.

To do this, make a copy of `.env.TEMPLATE` and name it `.env`. Navigate to the Neon dashboard and select the main branch and main-db database. Reveal the password by clicking the static rectangle, then switch the connection type from psql to Prisma. Update your `.env` file with the new main branch's `DATABASE_URL` and `DIRECT_URL`.

If back-end development pushes any changes to main, pull them to ensure API functionality as back-end pushes will automatically run database migrations on the main database branch through a Github Action.

## Backend

Importantly, **❗️branch the database in Neon before doing any back-end development!❗️** Preferably, name it the same thing as your Github branch for simplicity.

Once the database is branched, go back to the dashboard. Select the correct branch, reveal the password by clicking the static rectangle, and switch the connection type from psql to Prisma. Update your `.env` file with the new branch's `DATABASE_URL` and `DIRECT_URL`. This allows Prisma to connect with the correct, development branch of the database.

Refer to the [Prisma Schema API](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#string) documentation to see how Prisma maps to Postgres.

To edit the database schema, first edit the `prisma/schema.prisma` file.

To make changes but not persist them to a migration, run

> npx prisma db push

To reset any changes caused by `db push`, do

> npx prisma migrate reset

Once you're satisfied with the changes to the schema, to automatically generate a SQL migration, run

> npx prisma migrate dev --create-only

Enter a name for the migration when prompted. Edit the generated SQL file if necessary, i.e. to potentially add constraints that Prisma does not define. To apply this migration once you're done with it, run

> npx prisma migrate dev
