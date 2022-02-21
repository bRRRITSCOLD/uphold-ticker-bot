\connect <VALUE_DB>

CREATE TABLE IF NOT EXISTS currency_pair_ticker_alerts (
	alert_id serial PRIMARY KEY,
	pair VARCHAR (10) NOT NULL,
	currency VARCHAR (5) NOT NULL,
	ask DECIMAL NOT NULL,
	bid DECIMAL NOT NULL,
	spread DECIMAL NOT NULL,
	price DECIMAL NOT NULL,
	difference DECIMAL NOT NULL,
  config JSON NOT NULL,
  timestmp TIMESTAMP NOT NULL,
);