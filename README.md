# uphold-ticker-bot

## Setup (Local)
1. install needed packages:
    ```bash
    $ npm install
    ```

2. Docker databases:
    * Mongo:
      * Duplicate `/docker/mongo/scripts/initdb.example.js` to `/docker/mongo/scripts/initdb.js`. Once duplicated replace all values like `<MONGO_*>` with whatever you please (i.e. `foo`, `bar`, `ftw`, etc.)
    * Postgres:
      * Duplicate `/docker/postgres/database.example.env` to `/docker/postgres/scripts/database.env`. Once duplicated replace all values like `<POSTGRES_*>` with whatever you please (i.e. `foo`, `bar`, `ftw`, etc.)
      * Duplicate `/docker/postgres/scripts/initdb.example.sql` to `/docker/postgres/scripts/initdb.sql`. Once duplicated replace `<POSTGRES_DB>` with the value from `/docker/postgres/scripts/database.env` in the above step 

3. Duplicate `/config/example.local.json` to `/config/defualt.json`. Replace all `<POSTGRES_*>` and `<MONGO_*>` values with the corresponding values you used in step ***2.*** above. Also feel free to remove or add values to the `currencyPairs` property of the config to track whatever curency pairs you desire (make sure the intervals all added together only equal 500 requests per 5 min as this is the throttle limit on the uphold api)


## Setup (Dockerized)
1. Docker databases:
    * Mongo:
      * Duplicate `/docker/mongo/scripts/initdb.example.js` to `/docker/mongo/scripts/initdb.js`. Once duplicated replace all values like `<MONGO_*>` with whatever you please (i.e. `foo`, `bar`, `ftw`, etc.)
    * Postgres:
      * Duplicate `/docker/postgres/database.example.env` to `/docker/postgres/scripts/database.env`. Once duplicated replace all values like `<POSTGRES_*>` with whatever you please (i.e. `foo`, `bar`, `ftw`, etc.)
      * Duplicate `/docker/postgres/scripts/initdb.example.sql` to `/docker/postgres/scripts/initdb.sql`. Once duplicated replace `<POSTGRES_DB>` with the value from `/docker/postgres/scripts/database.env` in the above step 

2. Duplicate `/config/example.dockerized.json` to `/config/defualt.json`. Replace all `<POSTGRES_*>` and `<MONGO_*>` values with the corresponding values you used in step ***2.*** above. Also feel free to remove or add values to the `currencyPairs` property of the config to track whatever curency pairs you desire (make sure the intervals all added together only equal 500 requests per 5 min as this is the throttle limit on the uphold api)

## Test
```bash
$ npm run test
```

## Run (Local)
1. Start
    * In one terminal window launch docker-compose and the databases
      ```bash
      $ docker-compose -f docker/docker-compose.local.yml up
      ```
    * Once the above command has completed with no additional input run the below in another terminal
      ```bash
      $ npm run start
      ```
2. Stop
    * Press `ctrl + c` in the window the node app is running in to stop it
    * Press `ctrl + c` in the window docker-compose is running in to stop it
    * Once docker-compose is stopped run the following command in the same window (remove `-v` if you choose to persist/keep the data stored in the databases for the next time it is launched)
      ```bash
      $ docker-compose -f docker/docker-compose.local.yml down -v
      ```

## Run (Dockerized)
1. Start
    * In a terminal window run the below to start the full dockerized version of the whole suite
      ```bash
      $ docker-compose -f docker/docker-compose.dockerized.yml up
      ```
2. Stop
    * Press `ctrl + c` in the window docker-compose is running in to stop it
    * Once docker-compose is stopped run the following command in the same window (remove `-v` if you choose to persist/keep the data stored in the databases for the next time it is launched)
      ```bash
      $ docker-compose -f docker/docker-compose.dockerized.yml down -v
      ```

## Optimizations (Todos/Future)
1. Use `.dockerignore` and `gulp` to build to a `dist` folder and only dockerize files that are needed to run
2. A full E2E test that runs `src/index.js` as a child process and interrogates the stdout from the child process and the databases.
3. Try to use `https://api.uphold.com/v0/ticker/USD` with keeping track of of intervals internally in order to batch requests more and help with the 500 requests per 5 min throttle limit