module.exports = {
  createToken: () => {
    return new Date().getMilliseconds();
  },
};
