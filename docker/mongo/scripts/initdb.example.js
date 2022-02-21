db = db.getSiblingDB("<VALUE_DB>");

db.createCollection('currencyPairTickerAlerts');

db.createUser({
  user: "<VALUE_USER>",
  pwd: "<VALUE_PWD>",
  roles: [
    { role: "<VALUE_ROLE>", db: "<VALUE_DB>" }
  ],
});
