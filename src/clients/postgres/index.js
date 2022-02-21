// node_modules
const { Pool } = require("postgresql-client");

class PostgresClients {
  /**
   *
   *
   * @memberof PostgresClients
   * @type {{ [key: string]: Pool; }}
   */
  clients = {};

  /**
   *
   *
   * @param {{ name: string; host: string; port: number; user: string; password: string; database: string; pool: { min: number; max: number; idleTimeoutMillis: number; }; }[]} configs
   * @memberof PostgresClients
   */
  async init(configs) {
    const tasks = [];

    for (const config of configs) {
      const connect = async () => {
        const poolConfig = {
          host: config.host,
          port: config.port,
          user: config.user,
          password: config.password,
          database: config.database,
          min: config.pool && config.pool.min ? config.pool.min : 1,
          max: config.pool && config.pool.max ? config.pool.max : 10,
          idleTimeoutMillis: config.pool && config.pool.idleTimeoutMillis ? config.pool.idleTimeoutMillis : 5000
        };

        const pool = new Pool(poolConfig);
  
        const connection = await pool.acquire();
        await pool.release(connection);
  
        this.clients[config.name] = pool;
      }

      tasks.push(connect());
    }

    await Promise.all(tasks)
  }

  /**
   *
   *
   * @return {boolean} 
   * @memberof PostgresClients
   */
  async shutdown() {
    const tasks = [];

    for (const client in this.clients) {
      tasks.push(client.pool.close());
    }

    await Promise.all(tasks);

    return true;
  }

  /**
   *
   *
   * @param {*} name
   * @return {Pool} 
   * @memberof PostgresClients
   */
  getClient(name) {
    const client = this.clients[name];

    if (!client) {
      return null;
    }

    return client;
  }
}

const postgresClients = new PostgresClients();

module.exports = {
  PostgresClients,
  postgresClients
}