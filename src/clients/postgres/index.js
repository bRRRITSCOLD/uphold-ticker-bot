class PostgresClient {
  name = null;
  connection = null;

  constructor(initParams) {

  }
}

class PostgresClients {
  clients = [];

  init() {

  }

  getClient(name) {
    return this.clients.find(c => c.name === name)
  }
}

const postgresClients = new PostgresClients();

module.exports = {
  PostgresClient,
  PostgresClients,
  postgresClients
}