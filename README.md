# accounts

## Installation

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
