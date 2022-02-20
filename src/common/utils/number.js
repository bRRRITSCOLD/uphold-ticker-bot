const percentageDifference = (a, b) => {
  return 100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )
}

module.exports = {
  percentageDifference
};
