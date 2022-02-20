const { isNull, isUndefined } = require("./any");

/**
 * Determines is a given item is a string
 *
 * @param {string} str
 * @return {boolean} 
 */
const isString = str => {
  return !isNull(str) &&
    !isUndefined(str) &&
    typeof str === 'string';
}   

module.exports = {
  isString
};
