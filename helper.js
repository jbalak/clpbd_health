const { DIGEST_KEY, HASH_ALGORITHM } = require("./config");

const isDef = (data) => {
  if (data == undefined || data == null) {
    return false;
  } else return true;
};

const getString = (value) => {
  if (isDef(value)) {
    return JSON.stringify(value);
  } else return null;
};

const getHash = (data) => {
  let hash = null;
  if (isDef(data)) {
    let stringData = getString(data);

    if (isDef(stringData)) {
      hash = crypto
        .createHash(HASH_ALGORITHM)
        .update(stringData)
        .digest(DIGEST_KEY);
    }
  }
  return hash;
};

module.exports = {
  getHash,
  getString,
  isDef,
};
