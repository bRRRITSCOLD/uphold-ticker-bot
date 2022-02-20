const { isUndefined, isNull } = require("./any");

/**
 * Determines that an item is not a function and has a length
 *
 * @param {*} item
 * @return {*} 
 */
const isArrayLike = item => {
  return !isUndefined(item) &&
    !isNull(item) &&
    typeof item !== 'function' && item.length
}

module.exports = {
  isArrayLike
};
