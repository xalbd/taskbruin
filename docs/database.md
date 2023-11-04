# Database Management

## Architecture and Setup

Our Postgres QL database is hosted on [Neon](https://console.neon.tech). The data is accessed through the [Drizzle](https://orm.drizzle.team/docs/overview) ORM.

Before you try doing anything, make sure you're connected to eduroam, and not UCLA_WEB or UCLA_WIFI. Neon will not let you connect to a database if you're not a secured network.

## Frontend

Front-end development should just use the data in the production database. To develop, you just need to set up your environment variables.

To do this, make a copy of `.env.TEMPLATE` and name it `.env`. Navigate to the Neon dashboard and select the main branch and main-db database. Reveal the password by clicking the static rectangle, enable "Pooled connection", and update your `.env`'s `DATABASE_URL` with the given psql string. **Then, importantly, append `?sslmode=require` at the end of the DATABASE_URL.**

If back-end development pushes any changes to main, pull them to ensure API functionality.

## Backend

**❗️Branch the database in Neon before doing any back-end development!❗️** Name it whatever you'd like.

Once the database is branched, go back to the dashboard. Select the correct branch, reveal the password by clicking the static rectangle, enable "Pooled connection" and update your `.env` file with the new branch's `DATABASE_URL`. **Then, importantly, append `?sslmode=require` at the end of the DATABASE_URL.**

To edit the database schema, edit the `db/schema.ts` file.

To push edited schema changes to the database but not persist them to a migration, run

> npx drizzle-kit push:pg

Once you're satisfied with the changes to the schema, to automatically generate a SQL migration, run

> npm run generate
