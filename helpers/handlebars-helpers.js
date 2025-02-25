module.exports = {
  // currentYear: () => dayjs().year()
  ifCond: function (a, b, options) {
    // console.log('a:', a)
    // console.log('b:', b)
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
