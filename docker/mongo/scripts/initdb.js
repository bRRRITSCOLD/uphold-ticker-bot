db = db.getSiblingDB('dev');

db.createCollection('currencyPairTickerAlerts');

db.createUser({
  user: "devUser",
  pwd: "dev123",
  roles: [
    { role: "readWrite", db: "dev" }
  ],
});
