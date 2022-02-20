/**
 * Determines is a given item is null
 *
 * @param {*} item
 * @return {boolean} 
 */
const isNull = item => {
  return item === null;
}

/**
 * Determines is a given item is undefined
 *
 * @param {*} item
 * @return {boolean} 
 */
const isUndefined = item => {
  return item === undefined;
}

module.exports = {
  isNull,
  isUndefined,
};
