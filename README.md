# BruinTask

## Setup

Clone this repository:

```
git clone https://github.com/xalbd/taskbruin
cd taskbruin
```

Install [Node.js](https://nodejs.org/en/download) LTS (at the time of writing, 20.9.0). With Homebrew:

```
brew install node@20
```

Set up a [Postgres](https://www.postgresql.org/download/) database. Locally, this is possible with a Docker image or through Homebrew. As an example:

```
brew install postgresql
createdb main-db
```

Alternatively, create a Postgres database with one of many cloud-based serverless options or through a Docker image. For information on how to access/develop using the production database solution, [Neon](https://neon.tech/docs/introduction), refer to [the document here](/docs/database.md).

Set up your environment variables:

```
cp .env.TEMPLATE .env
```

[Prisma](https://www.prisma.io/docs) connects to the Postgres database through a pooled connection, so fill in `DATABASE_URL` with a pooled connection link. If you want to develop on this repository, also fill in `DIRECT_URL` with a non-pooled link so Prisma can run migrations.

## Run Locally

First, make sure your database image is running/online and make sure your environment variables properly point to the correct database. Then, run the provided shell script. This pulls pending changes from main, makes sure your npm packages are up to date, and starts a development server.

```
./start.sh
```

Connect at the localhost address given in the terminal.

## Deployment

The project runs on [Next.js](https://nextjs.org/docs), meaning Vercel takes care of deployment!

Instead of manually hosting a database instance, our database is hosted on a serverless platform, [Neon](https://neon.tech/docs/introduction).
