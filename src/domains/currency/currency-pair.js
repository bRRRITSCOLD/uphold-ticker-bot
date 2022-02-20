// libs
const { isArrayLike } = require("../../common/utils/array");
const { isString } = require("../../common/utils/string");

/**
 *
 *
 * @class CurrencyPair
 */
class CurrencyPair {
  /**
   * internal class property to house the specified currency pair
   *
   * @memberof CurrencyPair
   * @property
   * @type {string}
   */
  pair = null;

  /**
   * Creates an instance of CurrencyPair.
   *
   * @param {object} initParams
   * @param {string} initParams.pair
   * @memberof CurrencyPair
   */
  constructor(initParams) {
    if (!isString(initParams.pair) || !isArrayLike(initParams.pair)) {
        throw new Error('provide a currency pair');
    }

    Object.assign(this, {
      pair: initParams.pair,
    })
  }

  /**
   *
   *
   * @readonly
   * @memberof CurrencyPair
   * @returns {boolean}
   */
  get currency() {
    return this.pair.split('-').pop();
  }
}

module.exports = {
  CurrencyPair
};
