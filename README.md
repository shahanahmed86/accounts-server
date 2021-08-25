![AccountsApp](assets/logo.png 'AccountsApp')

AccountsApp fullstack GraphQL app with React and Node.js.

## Features

- **Scalable GraphQL server:** The server uses [`apollo-server-express`](https://www.npmjs.com/package/apollo-server-express) which is based on Apollo Server & Express.
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client.
- **Prisma**: Develop your database with [Prisma-v2](https://www.prisma.io/client).
- **Tooling**: Out-of-the-box support for [Adminer](https://adminer.org) to view database.
- **Extensible**: Simple and flexible [data model](./prisma/schema.prisma) – easy to adjust and extend.
- **Docker**: Develop your application in containerized format. Write once, run anywhere.

A full-fledged **React, Node and Apollo app**

## Requirements

```sh
Ensure you have node and docker installed on your machine.
```

## Getting Started

```sh
# Clone (or fork) the repo
git clone https://github.com/shahanahmed86/accounts-server.git && cd accounts-server

# Fill out .env file with secrets (development only)
cp .env.example .env

# Install the deps
npm install

# dockerize your system then Run this command
npm run up

# run the server
npm run dev
```

## postgresql

```sh
# docker to open bash
docker exec -it accounts-server_postgres-db_1 bas

# docker to open plsql
docker exec -it accounts-server_postgres-db_1 psql -U prisma -W dev
# flags
-it # for interactive
-U # for username
-W # database

# postgresql terminal commands list
```

## redis commands

```sh
docker exec -it accounts-server_cache_1 redis-cli -a secret

# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password

# redis commands
scan 0
get "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
ttl "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
del "sess:lHoGnDimxq3Lz5j0cRWuEp3wivXtgSBB"
```

## curl

```sh
curl localhost:4000/admin/logged-in \
  --cookie 'sid=s%3AhRKn3B_AOJjMsNkl8HnRQhC34LYwdwE2.ZHfP%2FXbh%2FNxJUqJSCr%2FUhAlE8JJ9jtgbQauGXLm7T78'

curl -X POST localhost:4000/admin/sign-in -H 'Content-Type: application/json' -v -d \
  '{"username":"admin","password":"admin"}'

curl -X POST localhost:4000/admin/sign-out \
  --cookie 'sid=s%3AhRKn3B_AOJjMsNkl8HnRQhC34LYwdwE2.ZHfP%2FXbh%2FNxJUqJSCr%2FUhAlE8JJ9jtgbQauGXLm7T78'

# flags
-v # verbose response
-d # body in JSON format
-X # method like put, post, get, delete
--cookie # obviously
-H # headers
```

## github

```sh
# git cli for commit
git commit -m "test" --no-verify

# flags
-m # for message
--no-verify # will not perform tests
```
