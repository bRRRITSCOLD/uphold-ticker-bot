# uphold-ticker-bot

## Setup
1. install needed packages
    ```bash
    $ npm install
    ```
2. Create a config file `config/default.json` (we do this because we allow too many options for arguments to be passed via cli). Use `config/example.json` as an example and replace every `"<VALUE>"` entry with the correct values that match your setup/env/desires.
    * Example default.json (remove the `// comments`)
    ```json
    {
      "currencyPairs": [
        {
          "currencyPair": "BTC-USD",
          // miliseconds
          "fetchIntervalMs": 5000,
          // 0 - 100
          "oscillationPercentage": 0.01
        },
        {
          "currencyPair": "USD-ETH",
          // miliseconds
          "fetchIntervalMs": 3000,
          // 0 - 100
          "oscillationPercentage": 0.05
        }
      ],
      // only include if you are using step 3 below (under setup)
      "postgresClients": [
        {
          "host": "postgres://postgres",
          "user": "testUser",
          "password": "test123"
        }
      ],
      // only include if you are using step 3 below (under setup)
      "mongoClients": [

      ]
    }
    ```
3. If you will be using the database(s) you will need to create a `docker/<type>/database.env` file for each (i.e. `docker/postgres/database.env`, `docker/mongo/database.env`)

## Test
```bash
$ npm run test
```

## Run
1. Local (no databases)
    * Via npm/package.json
      ```bash
      $ npm run start
      ```
    * Via terminal/command-line
      ```bash
      $ node src/index
      ```
2. Local (with databases)
    * Via npm/package.json
      ```bash
      $ docker-compose -f docker/postgres/docker-compose.yml up
      ```
      ```bash
      $ npm run start
      ```
    * Via terminal/command-line
      ```bash
      $ docker-compose -f
      ```
      ```bash
      $ node src/index
      ```
    * Teardown
      ```bash
      $ docker-compose -f docker/postgres/docker-compose.yml down
      ```
3. Docker (no databases)
    ```bash
    $ docker-compose -f
    ```
4. Docker (with databases)
    ```bash
    $ docker-compose -f
    ```

## Optimizations (Todos/Future)
1. 