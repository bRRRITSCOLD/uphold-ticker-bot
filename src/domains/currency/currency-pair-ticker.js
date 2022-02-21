// libs
const { isArrayLike } = require("../../common/utils/array");
const { isString } = require("../../common/utils/string");

// domains
const { CurrencyPair } = require("./currency-pair");

/**
 *
 *
 * @class CurrencyPairTicker
 */
class CurrencyPairTicker extends CurrencyPair {
  /**
   * internal class property to house the bid price (as string)
   * for a given currency in a currency pair
   *
   * @memberof CurrencyPairTicker
   * @property
   * @type {string}
   */
  bid = null;

  /**
   * internal class property to house the ask price (as string)
   * for a given currency in a currency pair
   *
   * @memberof CurrencyPairTicker
   * @property
   * @type {string}
   */
  ask = null;

  /**
   * Creates an instance of CurrencyPairTicker.
   *
   * @param {object} initParams
   * @param {string} initParams.ask
   * @param {string} initParams.bid
   * @param {string} initParams.pair
   * @memberof CurrencyPairTicker
   */
  constructor(initParams) {
    if (!isString(initParams.bid) || !isArrayLike(initParams.bid)) {
      throw new Error('provide a bid amount');
    }

    if (!isString(initParams.ask) || !isArrayLike(initParams.ask)) {
      throw new Error('provide an ask amount');
    }

    super(initParams);

    Object.assign(this, {
      ask: initParams.ask,
      bid: initParams.bid
    })
  }

  /**
   *
   *
   * @readonly
   * @memberof CurrencyPairTicker
   * @returns {string}
   */
  get spread() {
    return `${+this.ask - +this.bid}`;
  }

  /**
   *
   *
   * @readonly
   * @memberof CurrencyPairTicker
   * @returns {string}
   */
  get price() {
    return `${((+this.ask) + (+this.bid)) / 2}`
  }
}

module.exports = {
  CurrencyPairTicker
};
