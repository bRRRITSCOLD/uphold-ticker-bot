const { MongoClient, Db } = require('mongodb');

class MongoClients {
  /**
   *
   *
   * @memberof MongoClients
   * @type {{ [key: string]: { database: Db; client: MongoClient; }; }}
   */
  clients = {};

  /**
   *
   *
   * @param {{ name: string; host: string; port: number; user: string; password: string; database: string; pool: { min: number; max: number; }; }[]} configs
   * @memberof PostgresClients
   */
  async init(configs) {
    const tasks = [];

    for (const config of configs) {
      const connect = async () => {
        const client = new MongoClient(`mongodb://${config.host}:${config.port}/${config.database}`, {
          auth: {
            username: config.user,
            password: config.password,
          },  
          minPoolSize: config.pool.min,
          maxPoolSize: config.pool.max
        });

        const connectedClient = await client.connect();

        const connectedDb = connectedClient.db(config.database);

        this.clients[config.name] = { database: connectedDb, client: connectedClient };
      };

      tasks.push(connect());
    }
    
    await Promise.all(tasks);
  }

  /**
   *
   *
   * @return {boolean} 
   * @memberof MongoClients
   */
  async shutdown() {
    const tasks = [];

    for (const name in this.clients) {
      const disconnect = async () => {
        const client = this.clients[name];

        await client.client.close();

        delete this.clients[name];
      };

      tasks.push(disconnect());
    }

    await Promise.all(tasks);

    return true;
  }

  /**
   *
   *
   * @param {*} name
   * @return {Db}
   * @memberof MongoClients
   */
  getClient(name) {
    const client = this.clients[name];

    if (!client) {
      return null;
    }

    return client.database;
  }
}

const mongoClients = new MongoClients();

module.exports = {
  MongoClients,
  mongoClients
};
