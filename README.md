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

Alternatively, create a Postgres database with one of many cloud-based serverless options or through a Docker image. For information on how to access/develop using our selected database provider, [Neon](https://neon.tech/docs/introduction), refer to [the document here](/docs/database.md).

Set up your environment variables:

```
cp .env.TEMPLATE .env
```

[Drizzle](https://orm.drizzle.team/docs/overviews) is used to interface with the database, so fill in `DATABASE_URL` with a connection link.

## Run Locally

Make sure your database image is running and your `.env` file points to it. Then, run the provided shell script.

```
./start.sh
```

## Deployment

The project runs on [Next.js](https://nextjs.org/docs), meaning Vercel takes care of deployment!
