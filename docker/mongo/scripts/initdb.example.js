db = db.getSiblingDB("<MONGO_DB>");

db.createCollection('currencyPairTickerAlerts');

db.createUser({
  user: "<MONGO_USER>",
  pwd: "<MONGO_PWD>",
  roles: [
    { role: "readWrite", db: "<MONGO_DB>" }
  ],
});
